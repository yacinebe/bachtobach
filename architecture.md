# Bach to Bach — Solution Architecture

## Current State

```mermaid
graph TB
    subgraph Browser["🌐 Browser (Client Only)"]
        LP[Landing Page<br/>index.html]
        GP[Game Page<br/>game.html]
        GE[Game Engine<br/>game.js]
        GD[Game Data<br/>gamedata.js]
        PK[Piano Keyboard<br/>Dynamic DOM]
    end

    subgraph Assets["📦 Static Assets (Served from disk / GitHub Pages)"]
        CSS[CSS Files<br/>piano.css · landing.css]
        SAMPLES[Audio Samples<br/>./samples/piano/*.mp3<br/>88 notes]
        IMG[Images<br/>./images/]
    end

    subgraph CDN["☁️ CDN"]
        TONE[Tone.js v13<br/>cdnjs.cloudflare.com]
        GFONTS[Google Fonts]
    end

    LP -- "Play Now" --> GP
    GP --> GE
    GE --> GD
    GE --> PK
    GE -- "Tone.Sampler" --> TONE
    TONE -- "playback" --> SAMPLES
    GP --> CSS
    LP --> GFONTS

    style Browser fill:#1a1a2e,color:#fff,stroke:#7c3aed
    style Assets fill:#0f3460,color:#fff,stroke:#0ea5e9
    style CDN fill:#16213e,color:#fff,stroke:#0ea5e9
```

---

## Proposed: With Sheet Music Upload

```mermaid
graph TB
    subgraph Client["🌐 Browser"]
        direction TB
        LP[Landing Page]
        GP[Game Page]
        UP["Upload Page<br/>(new)"]
        GE[Game Engine]
    end

    subgraph API["⚙️ Backend API (Node.js / Express)"]
        direction TB
        UE["POST /upload<br/>detect file type"]
        JE["GET /job/:id<br/>poll status"]
        LE["GET /levels<br/>list generated levels"]
    end

    subgraph Queue["📬 Job Queue (SQS)"]
        SQS[Sheet Music<br/>Processing Jobs]
    end

    subgraph Worker["🔧 Async Worker"]
        direction TB
        DET[File Type<br/>Detector]
        XMLP[MusicXML<br/>Parser]
        MIDIP[MIDI<br/>Parser]
        LG[Level<br/>Generator]
        DIFF[Difficulty<br/>Rating Engine]
    end

    subgraph OMR["🎼 OMR Service (PDF / Image)"]
        AUD[Audiveris<br/>Java Container]
        VIS["Claude Vision API<br/>Image fallback"]
    end

    subgraph Storage["🗄️ Storage"]
        S3U[S3: Raw Uploads<br/>.xml · .mid · .pdf · .jpg]
        S3P[S3: Processed<br/>MusicXML cache]
        DB[(Levels DB<br/>Generated levels JSON)]
    end

    subgraph AI["🤖 Anthropic"]
        CLAUDE[claude-opus-4-6<br/>Vision API]
    end

    %% User flows
    LP -- "Play Now" --> GP
    LP -- "Upload Score" --> UP
    UP -- "upload file" --> UE
    UP -- "poll" --> JE
    GP -- "load level" --> LE

    %% API → Queue
    UE -- "store" --> S3U
    UE -- "enqueue job" --> SQS
    UE -- "return jobId" --> UP

    %% Worker
    SQS -- "dequeue" --> DET
    DET -- ".xml / .musicxml" --> XMLP
    DET -- ".mid / .midi" --> MIDIP
    DET -- ".pdf / .jpg / .png" --> OMR

    %% OMR
    AUD -- "MusicXML" --> XMLP
    VIS -- "note array" --> LG
    CLAUDE -. "Vision API" .-> VIS

    %% Level generation
    XMLP --> LG
    MIDIP --> LG
    LG --> DIFF
    DIFF -- "save level" --> DB
    XMLP -- "cache" --> S3P

    %% Result
    DB -- "query" --> LE
    DB -- "job done" --> JE

    style Client fill:#1a1a2e,color:#fff,stroke:#7c3aed
    style API fill:#0f3460,color:#fff,stroke:#0ea5e9
    style Queue fill:#16213e,color:#fff,stroke:#f59e0b
    style Worker fill:#0d1117,color:#fff,stroke:#22c55e
    style OMR fill:#1a0a2e,color:#fff,stroke:#a855f7
    style Storage fill:#0a1628,color:#fff,stroke:#0ea5e9
    style AI fill:#1a0f0a,color:#fff,stroke:#f97316
```

---

## Data Flow: Sheet Music → Level

```mermaid
sequenceDiagram
    actor User
    participant Upload UI
    participant API
    participant S3
    participant Queue
    participant Worker
    participant OMR
    participant DB

    User->>Upload UI: Drop file (XML / MID / PDF / IMG)
    Upload UI->>API: POST /upload
    API->>S3: Store raw file
    API->>Queue: Enqueue job { fileKey, type, userId }
    API-->>Upload UI: { jobId }

    loop Poll every 2s
        Upload UI->>API: GET /job/:jobId
        API-->>Upload UI: { status: "processing" }
    end

    Queue->>Worker: Dequeue job
    alt MusicXML or MIDI
        Worker->>S3: Fetch file
        Worker->>Worker: Parse notes directly
    else PDF or Image
        Worker->>OMR: Send file
        OMR->>OMR: Run Audiveris / Claude Vision
        OMR-->>Worker: note array / MusicXML
    end

    Worker->>Worker: Generate level JSON
    Worker->>Worker: Compute difficulty rating
    Worker->>DB: Save level
    Worker->>Queue: Mark job complete

    Upload UI->>API: GET /job/:jobId
    API-->>Upload UI: { status: "done", levelId }
    Upload UI-->>User: "Level ready! ▶ Play now"
```

---

## Level Generator Logic

```mermaid
flowchart LR
    NOTES["Note Array\n{name, octave,\nduration, time}"]

    subgraph Validate["Validate & Normalize"]
        RANGE[Clamp to\nC2–B6 range]
        TRANS[Auto-transpose\nif out of range]
        DEDUP[Remove\nsilences / rests]
    end

    subgraph Analyze["Analyze Difficulty"]
        SPAN[Note span\n÷ octaves]
        SPEED[Fastest\nduration]
        DENSITY[Notes\nper second]
        BLACKS[Black key\nratio]
    end

    subgraph Output["Level JSON"]
        LVL["{\n  levelNumber,\n  title,\n  bpm,\n  difficulty: 1–5,\n  piece: [...notes],\n  counter: seconds\n}"]
    end

    NOTES --> RANGE --> TRANS --> DEDUP
    DEDUP --> SPAN & SPEED & DENSITY & BLACKS
    SPAN & SPEED & DENSITY & BLACKS --> LVL
```

---

## File Type Support

| Format | Parser | Reliability | Notes |
|---|---|---|---|
| `.xml` / `.musicxml` | `musicxml-interfaces` (Node) | ★★★★★ | Export from MuseScore (free) |
| `.mid` / `.midi` | `@tonejs/midi` (Node) | ★★★★★ | Widely available |
| `.pdf` | Audiveris (Java container) | ★★★★☆ | Best for printed scores |
| `.jpg` / `.png` | Claude Vision API | ★★★☆☆ | Fallback for photos |

---

## Implementation Phases

```mermaid
gantt
    title Sheet Music Feature Roadmap
    dateFormat  YYYY-MM-DD
    section Phase 1 · Core Parsing
    MusicXML parser           :p1a, 2026-03-07, 3d
    MIDI parser               :p1b, after p1a, 2d
    Level generator           :p1c, after p1b, 3d
    Upload UI                 :p1d, after p1a, 4d

    section Phase 2 · Backend
    Express API + S3 upload   :p2a, after p1c, 3d
    SQS queue + worker        :p2b, after p2a, 3d
    Levels DB + API endpoints :p2c, after p2b, 2d

    section Phase 3 · OMR
    Audiveris Docker container :p3a, after p2c, 4d
    Claude Vision fallback     :p3b, after p3a, 2d
    Difficulty auto-rating     :p3c, after p3b, 2d

    section Phase 4 · Polish
    Transpose / range clamping :p4a, after p3c, 2d
    Preview before saving      :p4b, after p4a, 2d
    Share levels               :p4c, after p4b, 3d
```

# Bach to Bach — Solution Architecture

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Frontend (Web)** | React, Vanilla JS (current) |
| **Frontend (Mobile)** | React Native (iOS + Android) |
| **Audio engine** | Tone.js |
| **Audio samples** | 88-key piano samples (MP3 / OGG) |
| **Backend API** | Node.js · Fastify |
| **Database** | PostgreSQL |
| **Cache / Sessions** | Redis |
| **File storage** | S3 + CloudFront |
| **Auth** | JWT + Refresh Tokens · Apple Sign-In · Google Sign-In |
| **Monorepo tooling** | Turborepo |
| **Shared types** | TypeScript |
| **Sheet music parsing** | MusicXML · MIDI · Audiveris (OMR) · Claude Vision API |
| **Job queue** | AWS SQS |

---

## Target Architecture

```mermaid
graph TB
    subgraph Clients["📱  Clients"]
        direction LR
        IOS["iOS App\nReact Native"]
        AND["Android App\nReact Native"]
        WEB["Web App\nReact"]
    end

    subgraph Shared["📦  Shared Packages (monorepo)"]
        direction LR
        GE["game-engine\ncore loop · scoring · timing"]
        AC["api-client\nhooks · queries · auth"]
        TY["types\nLevel · Note · User · Score"]
    end

    subgraph Gateway["⚙️  API (Node.js · Fastify)"]
        direction TB
        AUTH["Auth\nPOST /auth/register\nPOST /auth/login\nPOST /auth/refresh"]
        LEVELS["Levels\nGET  /levels\nGET  /levels/:id"]
        PROGRESS["Progress\nPOST /progress\nGET  /me/progress"]
        SCORES["Scores\nPOST /scores\nGET  /leaderboard"]
    end

    subgraph Storage["🗄️  Storage"]
        PG[("PostgreSQL\nusers · levels\nscores · progress")]
        REDIS[("Redis\nsessions · cache")]
        S3["S3 + CloudFront\naudio samples\nlevel images"]
    end

    subgraph Auth["🔐  Auth Providers"]
        APPLE["Apple Sign-In"]
        GOOGLE["Google Sign-In"]
        JWT["JWT\n+ Refresh Tokens"]
    end

    %% Clients → Shared
    IOS & AND & WEB --> GE
    IOS & AND & WEB --> AC
    IOS & AND & WEB --> TY

    %% Clients → API
    AC --> Gateway

    %% API → Storage
    AUTH --> PG
    AUTH --> JWT
    LEVELS --> PG
    PROGRESS --> PG
    SCORES --> PG
    Gateway --> REDIS
    Gateway --> S3

    %% Auth providers
    APPLE -. "OAuth token" .-> AUTH
    GOOGLE -. "OAuth token" .-> AUTH

    style Clients fill:#1a1a2e,color:#fff,stroke:#7c3aed
    style Shared fill:#0d1117,color:#fff,stroke:#22c55e
    style Gateway fill:#0f3460,color:#fff,stroke:#0ea5e9
    style Storage fill:#0a1628,color:#fff,stroke:#0ea5e9
    style Auth fill:#16213e,color:#fff,stroke:#f59e0b
```

---

## Monorepo Structure

```
bachtobach/
├── apps/
│   ├── mobile/                  ← React Native (iOS + Android)
│   │   ├── ios/
│   │   ├── android/
│   │   └── src/
│   │       ├── screens/         Landing · Game · Leaderboard · Profile
│   │       ├── components/      Piano · NoteBar · ScoreDisplay
│   │       └── navigation/
│   │
│   ├── web/                     ← React (browser)
│   │   └── src/
│   │       ├── pages/           Landing · Game · Leaderboard
│   │       └── components/      Piano · NoteBar · ScoreDisplay
│   │
│   └── api/                     ← Node.js · Fastify
│       └── src/
│           ├── routes/          auth · levels · progress · scores
│           ├── db/              migrations · queries (Postgres)
│           └── middleware/      auth guard · rate limit
│
└── packages/
    ├── game-engine/             ← platform-agnostic game logic
    │   ├── scheduler.ts         note timing via Tone.js / Native Audio
    │   ├── comparator.ts        note comparison · scoring
    │   └── difficulty.ts        difficulty rating
    ├── api-client/              ← React Query hooks for all endpoints
    └── types/                   ← shared TypeScript types
```

---

## Database Schema

```mermaid
erDiagram
    USER {
        uuid id PK
        string email
        string display_name
        string avatar_url
        string provider
        string provider_id
        timestamp created_at
    }

    LEVEL {
        uuid id PK
        int level_number
        string title
        string composer
        string image_url
        int bpm
        int difficulty
        int time_limit_seconds
        jsonb piece
        string source
        timestamp created_at
    }

    PROGRESS {
        uuid id PK
        uuid user_id FK
        uuid level_id FK
        bool completed
        bool perfect
        int best_score
        int attempts
        timestamp last_played_at
    }

    SCORE {
        uuid id PK
        uuid user_id FK
        uuid level_id FK
        int score
        int combo_max
        float accuracy
        timestamp played_at
    }

    USER ||--o{ PROGRESS : "tracks"
    USER ||--o{ SCORE : "posts"
    LEVEL ||--o{ PROGRESS : "has"
    LEVEL ||--o{ SCORE : "receives"
```

---

## API Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | — | Email + password signup |
| `POST` | `/auth/login` | — | Returns JWT + refresh token |
| `POST` | `/auth/oauth` | — | Apple / Google Sign-In |
| `POST` | `/auth/refresh` | — | Rotate tokens |
| `GET` | `/levels` | ✓ | List all levels (with user progress) |
| `GET` | `/levels/:id` | ✓ | Level detail + note sequence |
| `POST` | `/progress` | ✓ | Save level completion |
| `GET` | `/me/progress` | ✓ | All user progress |
| `POST` | `/scores` | ✓ | Submit score after level |
| `GET` | `/leaderboard` | ✓ | Top scores per level |
| `GET` | `/me` | ✓ | User profile |

---

## Current State (what exists today)

```mermaid
graph LR
    subgraph Now["Vanilla JS SPA — no backend"]
        LP[index.html] --> GP[game.html]
        GP --> GE_OLD[game.js]
        GE_OLD --> GD[gamedata.js\n5 hardcoded levels]
        GE_OLD --> TONE[Tone.js CDN]
        TONE --> SAMPLES[./samples/piano/\n88 mp3 files]
    end

    style Now fill:#1a1a2e,color:#fff,stroke:#ef4444
```

**Gaps to close during rearchitecture:**
- No user accounts or progress persistence
- Levels hardcoded in JS — no content management
- No leaderboard or social features
- Web-only — no iOS or Android
- Audio samples served as static files (no CDN)

---

## Implementation Roadmap

```mermaid
gantt
    title Bach to Bach — Phased Roadmap
    dateFormat  YYYY-MM-DD

    section Phase 1 · Rearchitecture
    Monorepo setup (Turborepo)       :p1a, 2026-03-07, 2d
    PostgreSQL schema + migrations   :p1b, after p1a, 2d
    Fastify API (auth + levels)      :p1c, after p1b, 4d
    Extract game-engine package      :p1d, after p1a, 3d
    React web app (replaces vanilla) :p1e, after p1d, 5d
    Deploy API + web (fly.io / AWS)  :p1f, after p1c, 2d

    section Phase 2 · Mobile
    React Native scaffold + nav      :p2a, after p1f, 3d
    Piano component (RN)             :p2b, after p2a, 4d
    Game screen (iOS + Android)      :p2c, after p2b, 4d
    Auth screens + Apple/Google SSO  :p2d, after p2a, 3d
    Progress + leaderboard screens   :p2e, after p2c, 3d
    App Store + Play Store submit    :p2f, after p2e, 3d

    section Phase 3 · Sheet Music Parser
    MusicXML + MIDI parsers          :p3a, after p2f, 4d
    Level generator + difficulty     :p3b, after p3a, 3d
    Upload UI (web + mobile)         :p3c, after p3b, 3d
    Async job queue (SQS)            :p3d, after p3c, 2d
    OMR (Audiveris + Claude Vision)  :p3e, after p3d, 5d
```

---

## Sheet Music Pipeline (Phase 3, detail)

```mermaid
graph TB
    subgraph Input["Upload (iOS · Android · Web)"]
        F1[".musicxml / .xml"]
        F2[".mid / .midi"]
        F3[".pdf"]
        F4[".jpg / .png"]
    end

    subgraph Queue["Async Processing"]
        SQS[Job Queue]
        W[Worker]
    end

    subgraph OMR["OMR Service"]
        AUD["Audiveris\n(PDF → MusicXML)"]
        VIS["Claude Vision API\n(image fallback)"]
    end

    subgraph Generate["Level Generator"]
        PARSE[Parse notes]
        NORM[Normalize + transpose]
        DIFF[Rate difficulty 1–5]
        SAVE[Save to DB]
    end

    F1 & F2 --> SQS
    F3 --> AUD --> SQS
    F4 --> VIS --> SQS
    SQS --> W --> PARSE --> NORM --> DIFF --> SAVE

    style Input fill:#1a1a2e,color:#fff,stroke:#7c3aed
    style Queue fill:#16213e,color:#fff,stroke:#f59e0b
    style OMR fill:#1a0a2e,color:#fff,stroke:#a855f7
    style Generate fill:#0d1117,color:#fff,stroke:#22c55e
```

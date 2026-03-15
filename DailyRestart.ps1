# DailyRestart.ps1
# Schedules a daily restart at 11:00 PM with a confirmation prompt.

# Name used to identify the task in Windows Task Scheduler
$taskName = "DailyRestartAt2300"

# Human-readable description stored with the task in Task Scheduler
$taskDescription = "Restarts the computer every day at 11:00 PM after user confirmation."

# --- Confirmation prompt script (runs at trigger time) ---
# @'...'@ is a PowerShell "here-string": stores a multi-line string as-is.
# This whole block is the script that will run at 11:00 PM every day.
$actionScript = @'

# Load the WPF assembly so we can show a graphical message box
Add-Type -AssemblyName PresentationFramework

# Show a Yes/No popup and store the button the user clicked in $result
$result = [System.Windows.MessageBox]::Show(
    "The computer is scheduled to restart now (11:00 PM).`nDo you want to restart?", # Message text (`n = newline)
    "Daily Restart",                              # Window title
    [System.Windows.MessageBoxButton]::YesNo,     # Show Yes and No buttons
    [System.Windows.MessageBoxImage]::Warning     # Show a warning icon
)

# Only restart if the user clicked Yes
if ($result -eq [System.Windows.MessageBoxResult]::Yes) {
    Restart-Computer -Force   # Force-restart immediately (closes open apps)
}
'@

# --- Register the Scheduled Task ---

# Get the security principal for the currently running process
# IsInRole checks whether that principal has Administrator rights
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
        [Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "This script must be run as Administrator to register a scheduled task."  # Print error in red
    exit 1   # Stop the script with a non-zero exit code (signals failure)
}

# Get the folder where THIS script lives (so the helper file is saved next to it)
$scriptDir  = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Build the full path for the helper script that will run at 11:00 PM
$helperPath = Join-Path $scriptDir "DailyRestart_Action.ps1"

# Write the $actionScript string to disk as a .ps1 file (UTF-8 encoding)
$actionScript | Set-Content -Path $helperPath -Encoding UTF8

# Create a trigger that fires every day at 23:00 (11:00 PM)
$trigger = New-ScheduledTaskTrigger -Daily -At "23:00"

# Define what the task will run: powershell.exe executing the helper script
$action  = New-ScheduledTaskAction `
    -Execute  "powershell.exe" `                                    # Program to launch
    -Argument "-NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$helperPath`""
    # -NonInteractive  : don't wait for user input in the console
    # -WindowStyle Hidden : hide the console window (only the popup is visible)
    # -ExecutionPolicy Bypass : allow the script to run without signing
    # -File : path to the helper script to execute

# Define WHO runs the task: the current user, logged-in interactively
# This is required so the message box appears on the user's desktop
$principal = New-ScheduledTaskPrincipal `
    -UserId ([System.Security.Principal.WindowsIdentity]::GetCurrent().Name) ` # Current username
    -LogonType Interactive `   # Only run when the user is logged in
    -RunLevel Highest          # Request elevated (admin) privileges at run time

# Configure optional task behaviour settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `       # Run even if the PC is on battery power
    -DontStopIfGoingOnBatteries `    # Don't cancel the task if battery kicks in mid-run
    -ExecutionTimeLimit (New-TimeSpan -Minutes 2)  # Kill the task if it runs longer than 2 minutes

# If a task with the same name already exists, remove it before re-registering
# -ErrorAction SilentlyContinue prevents an error if the task doesn't exist yet
if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false  # Delete without asking
    Write-Host "Removed existing task '$taskName'."               # Inform the user
}

# Register (create) the scheduled task with all the pieces defined above
Register-ScheduledTask `
    -TaskName    $taskName `        # The name shown in Task Scheduler
    -Description $taskDescription ` # The description shown in Task Scheduler
    -Trigger     $trigger `         # When to run (daily at 23:00)
    -Action      $action `          # What to run (powershell + helper script)
    -Principal   $principal `       # Who runs it (current user, interactive)
    -Settings    $settings |        # Extra settings (battery, time limit)
    Out-Null                        # Suppress the verbose object output

# Confirm success to the user
Write-Host "Scheduled task '$taskName' registered successfully."
Write-Host "The computer will prompt for confirmation every day at 11:00 PM."
Write-Host ""
Write-Host "To remove the task later, run:"
Write-Host "  Unregister-ScheduledTask -TaskName '$taskName' -Confirm:`$false"  # `$ escapes the $ so it prints literally

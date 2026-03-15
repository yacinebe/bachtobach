# DailyRestart.ps1
# Schedules a daily restart at 11:00 PM with a confirmation prompt.

$taskName = "DailyRestartAt2300"
$taskDescription = "Restarts the computer every day at 11:00 PM after user confirmation."

# --- Confirmation prompt script (runs at trigger time) ---
# This block is embedded as a string and registered as the scheduled task action.
$actionScript = @'
Add-Type -AssemblyName PresentationFramework

$result = [System.Windows.MessageBox]::Show(
    "The computer is scheduled to restart now (11:00 PM).`nDo you want to restart?",
    "Daily Restart",
    [System.Windows.MessageBoxButton]::YesNo,
    [System.Windows.MessageBoxImage]::Warning
)

if ($result -eq [System.Windows.MessageBoxResult]::Yes) {
    Restart-Computer -Force
}
'@

# --- Register the Scheduled Task ---

# Check for admin privileges
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
        [Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "This script must be run as Administrator to register a scheduled task."
    exit 1
}

# Save the action script to a helper file alongside this script
$scriptDir  = Split-Path -Parent $MyInvocation.MyCommand.Definition
$helperPath = Join-Path $scriptDir "DailyRestart_Action.ps1"
$actionScript | Set-Content -Path $helperPath -Encoding UTF8

# Build the task components
$trigger = New-ScheduledTaskTrigger -Daily -At "23:00"

$action  = New-ScheduledTaskAction `
    -Execute "powershell.exe" `
    -Argument "-NonInteractive -WindowStyle Hidden -ExecutionPolicy Bypass -File `"$helperPath`""

# Run as the current logged-on user so the message box is visible on their desktop
$principal = New-ScheduledTaskPrincipal `
    -UserId ([System.Security.Principal.WindowsIdentity]::GetCurrent().Name) `
    -LogonType Interactive `
    -RunLevel Highest

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 2)

# Remove any previous version of the task
if (Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "Removed existing task '$taskName'."
}

Register-ScheduledTask `
    -TaskName    $taskName `
    -Description $taskDescription `
    -Trigger     $trigger `
    -Action      $action `
    -Principal   $principal `
    -Settings    $settings | Out-Null

Write-Host "Scheduled task '$taskName' registered successfully."
Write-Host "The computer will prompt for confirmation every day at 11:00 PM."
Write-Host ""
Write-Host "To remove the task later, run:"
Write-Host "  Unregister-ScheduledTask -TaskName '$taskName' -Confirm:`$false"

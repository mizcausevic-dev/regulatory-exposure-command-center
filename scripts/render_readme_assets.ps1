$ErrorActionPreference = "Stop"

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null

Add-Type -AssemblyName System.Drawing

function New-ProofImage {
    param(
        [string]$Path,
        [string]$Title,
        [string]$Subtitle,
        [string[]]$Bullets
    )

    $bitmap = New-Object System.Drawing.Bitmap 1600, 1000
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.Clear([System.Drawing.Color]::FromArgb(7, 10, 15))

    $panelBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(11, 18, 32))
    $accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(55, 255, 139))
    $altAccentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 199, 255))
    $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(233, 243, 255))
    $mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(171, 186, 201))
    $borderPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(42, 111, 88), 2)

    $graphics.FillRectangle($panelBrush, 48, 48, 1504, 904)
    $graphics.DrawRectangle($borderPen, 48, 48, 1504, 904)

    $eyebrowFont = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Bold)
    $titleFont = New-Object System.Drawing.Font("Georgia", 34, [System.Drawing.FontStyle]::Bold)
    $bodyFont = New-Object System.Drawing.Font("Segoe UI", 18)
    $graphics.DrawString("Regulatory Exposure Command Center", $eyebrowFont, $accentBrush, 92, 92)
    $graphics.DrawString($Title, $titleFont, $textBrush, 92, 142)
    $graphics.DrawString($Subtitle, $bodyFont, $mutedBrush, 92, 214)

    $y = 320
    foreach ($bullet in $Bullets) {
        $graphics.FillEllipse($altAccentBrush, 114, $y + 12, 10, 10)
        $graphics.DrawString($bullet, $bodyFont, $textBrush, 138, $y + 2)
        $y += 82
    }

    $graphics.DrawString("Synthetic proof render for README packaging.", $bodyFont, $mutedBrush, 92, 880)
    $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $bitmap.Dispose()
}

New-ProofImage -Path (Join-Path $screenshots "01-overview-proof.png") `
    -Title "Overview proof" `
    -Subtitle "Board-ready regulatory exposure, evidence quality, and brief posture in one executive control surface." `
    -Bullets @(
        "Filing gaps, disclosure drift, retention weakness, and transfer commitments stay visible together.",
        "Penalty posture and impacted programs roll up into one board-facing score before the story drifts.",
        "Every lane stays tied to an operator-safe board brief packet."
    )

New-ProofImage -Path (Join-Path $screenshots "02-regulatory-lane-proof.png") `
    -Title "Regulatory lane" `
    -Subtitle "Each lane keeps owner, exposure focus, status, and next action visible." `
    -Bullets @(
        "Disclosure, retention, vendor, and board-reporting lanes stay separated cleanly.",
        "Current posture remains readable at a glance.",
        "Next actions stay executive-safe and audit-readable."
    )

New-ProofImage -Path (Join-Path $screenshots "03-exposure-findings-proof.png") `
    -Title "Exposure findings" `
    -Subtitle "Findings tie severity, evidence family, owner, and executive impact into one scoring view." `
    -Bullets @(
        "High-severity regulatory findings surface first.",
        "Leaders can tie risk back to filings, disclosures, retention, and transfer commitments quickly.",
        "The scorecard is grounded in real executive-intelligence and compliance-governance primitives."
    )

New-ProofImage -Path (Join-Path $screenshots "04-board-brief-proof.png") `
    -Title "Board brief" `
    -Subtitle "Packets tie score, blocker, owner, and board-story timing together." `
    -Bullets @(
        "Top blockers, next control call, and executive timing stay visible.",
        "Red and yellow posture remains easy to scan.",
        "The system is shaped for board-ready exposure, diligence, and investor proof."
    )

# GitHub Pages Deployment Script
Write-Host "🚀 Deploying Dashboard to GitHub Pages..." -ForegroundColor Cyan

# Add all changes
git add .

# Show status
git status

# Get commit message
$message = Read-Host "Enter commit message (press Enter for 'Updated dashboard')"
if ([string]::IsNullOrWhiteSpace($message)) {
    $message = "Updated dashboard"
}

# Commit and push
try {
    git commit -m $message
    git push origin main
    
    Write-Host ""
    Write-Host "✅ Dashboard deployed successfully!" -ForegroundColor Green
    Write-Host "🌐 Live URL: https://mtechmind.github.io/management-dashboard/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "⏱️  Changes will be live in 1-2 minutes" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
}

Read-Host "Press Enter to continue"
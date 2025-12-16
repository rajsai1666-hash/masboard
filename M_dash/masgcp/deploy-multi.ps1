# Multi-Environment Firebase Deployment Script
# Management Dashboard - Multiple Hosting Environments

Write-Host "🚀 Management Dashboard Multi-Environment Deployment" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green

# Function to deploy to specific environment
function Deploy-Environment {
    param(
        [string]$Environment,
        [string]$Project,
        [string]$Target,
        [string]$URL
    )
    
    Write-Host "`n📦 Deploying to $Environment Environment..." -ForegroundColor Yellow
    
    # Switch to project
    firebase use $Project
    
    # Deploy
    firebase deploy --only hosting:$Target
    
    Write-Host "✅ $Environment deployment complete!" -ForegroundColor Green
    Write-Host "🌐 URL: $URL" -ForegroundColor Cyan
}

# Menu for deployment options
Write-Host "`nSelect deployment option:" -ForegroundColor White
Write-Host "1. Deploy to Production (GCP-NG)" -ForegroundColor White
Write-Host "2. Deploy to Staging (Secure)" -ForegroundColor White
Write-Host "3. Deploy to Both Environments" -ForegroundColor White
Write-Host "4. Show Current Status" -ForegroundColor White

$choice = Read-Host "`nEnter your choice (1-4)"

switch ($choice) {
    "1" {
        Deploy-Environment "Production" "masgcp" "product" "https://dashboard-gcp-ng.web.app"
    }
    "2" {
        Deploy-Environment "Staging" "dashboard-secure-2025" "staging" "https://dashboard--2025.web.app"
    }
    "3" {
        Write-Host "`n🚀 Deploying to ALL environments..." -ForegroundColor Magenta
        Deploy-Environment "Production" "masgcp" "product" "https://dashboard-gcp-ng.web.app"
        Deploy-Environment "Staging" "dashboard-secure-2025" "staging" "https://dashboard--2025.web.app"
        Write-Host "`n🎉 All deployments completed!" -ForegroundColor Green
    }
    "4" {
        Write-Host "`n📊 Current Hosting Status:" -ForegroundColor Yellow
        Write-Host "🔷 Production: https://dashboard-gcp-ng.web.app (GCP-NG Project)" -ForegroundColor Cyan
        Write-Host "🔶 Staging: https://dashboard--2025.web.app (Secure Project)" -ForegroundColor Cyan
        
        Write-Host "`n📋 Available Projects:" -ForegroundColor Yellow
        firebase projects:list
        
        Write-Host "`n🎯 Current Project:" -ForegroundColor Yellow
        firebase use
    }
    default {
        Write-Host "❌ Invalid choice. Please run the script again." -ForegroundColor Red
    }
}

Write-Host "`n✨ Deployment script completed!" -ForegroundColor Green
@echo off
echo 🚀 Deploying Dashboard to GitHub Pages...
git add .
git status
echo.
set /p message="Enter commit message (or press Enter for 'Updated dashboard'): "
if "%message%"=="" set message=Updated dashboard
git commit -m "%message%"
git push origin main
echo.
echo ✅ Dashboard deployed successfully!
echo 🌐 Live URL: https://mtechmind.github.io/management-dashboard/
echo.
pause
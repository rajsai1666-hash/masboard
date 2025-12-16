# Management Dashboard - Hosting Environments

## 🌐 Live URLs

### Production Environment
- **URL**: https://dashboard-gcp-ng.web.app
- **Project**: dashboard-gcpng-2025 (masgcp alias)
- **Target**: product
- **Features**: Production-ready with caching headers

### Staging Environment  
- **URL**: https://dashboard--2025.web.app
- **Project**: dashboard-secure-2025
- **Target**: staging
- **Features**: Testing environment

## 🚀 Quick Deployment Commands

### Deploy to Production
```powershell
firebase use masgcp
firebase deploy --only hosting:product
```

### Deploy to Staging
```powershell
firebase use dashboard-secure-2025
firebase deploy --only hosting:staging
```

### Deploy to Both
```powershell
# Run the deployment script
.\deploy-multi.ps1
```

## 📋 Project Management

### List all projects
```powershell
firebase projects:list
```

### Switch between projects
```powershell
firebase use masgcp              # Production
firebase use dashboard-secure-2025  # Staging
```

### Check current project
```powershell
firebase use
```

## 🔧 Configuration

The `firebase.json` file is configured for multi-site hosting with:
- **Product target**: Production hosting with caching headers
- **Staging target**: Development/testing hosting

## 📊 Features Added

✅ **Multiple hosting environments**  
✅ **Production-ready caching headers**  
✅ **Easy project switching**  
✅ **Automated deployment script**  
✅ **Environment isolation**

## 🎯 Usage

1. **Development**: Use staging environment for testing
2. **Production**: Deploy stable versions to production
3. **Quick Deploy**: Use `deploy-multi.ps1` script for easy deployment
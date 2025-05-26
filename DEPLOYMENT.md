# Hexachem Website Deployment Guide

## For Coolify Deployment

### Step 1: Repository Setup
1. Copy all these files to your Git repository (GitHub, GitLab, etc.):
   - All project folders: `client/`, `server/`, `shared/`
   - Root files: `package.json`, `Dockerfile`, `.dockerignore`, etc.
   - Keep the exact folder structure as-is

### Step 2: Required Environment Variables
Set these in your Coolify deployment:
```
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=production
PORT=5000
```

### Step 3: Coolify Configuration
1. **Create New Application** in Coolify
2. **Source**: Public Repository
3. **Repository URL**: Your Git repository URL
4. **Build Settings**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Port: `5000`
5. **Add Environment Variables** from Step 2
6. **Deploy**

### Step 4: Domain Setup
- Add your custom domain in Coolify
- SSL certificates will be handled automatically

## Project Structure
```
hexachem-website/
├── client/          # Frontend React app
├── server/          # Backend Express server
├── shared/          # Shared schemas and types
├── package.json     # Dependencies and scripts
├── Dockerfile       # Container configuration
├── .dockerignore    # Files to ignore in Docker
└── other config files
```

## Important Notes
- The website includes a multilingual chatbot (requires OPENAI_API_KEY)
- All images and assets are included in the build
- The app runs on port 5000 in production
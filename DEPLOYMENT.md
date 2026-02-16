# Vercel Deployment Guide

## Prerequisites

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Deploy from the project root**:
   ```bash
   cd /Users/bhargavteja/Desktop/BA-project1/ai-requirement-generator
   vercel
   ```

2. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? (Select your account)
   - Link to existing project? `N`
   - What's your project's name? `ai-requirement-generator`
   - In which directory is your code located? `./`

3. **Add environment variable**:
   ```bash
   vercel env add GEMINI_API_KEY
   ```
   Then paste your Gemini API key when prompted.

4. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new

2. Import your GitHub repository:
   - Click "Import Git Repository"
   - Select: `Bhargavsayampu7/Ai-Requirement-generator`

3. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install --prefix backend && npm install --prefix frontend`

4. Add Environment Variables:
   - Key: `GEMINI_API_KEY`
   - Value: (Your Gemini API key)

5. Click "Deploy"

## Important Notes

### Backend API Routes

The backend will be accessible at `/api/*` routes:
- Health check: `https://your-app.vercel.app/api/health`
- Generate: `https://your-app.vercel.app/api/generate`

### Frontend Configuration

After deployment, you need to update the frontend `.env` file:

```env
VITE_API_URL=/api
```

This tells the frontend to use relative API paths instead of `http://localhost:3001`.

### Update Frontend API URL

Edit `frontend/.env`:
```bash
VITE_API_URL=/api
```

Then commit and push:
```bash
git add frontend/.env
git commit -m "Update API URL for Vercel deployment"
git push origin main
```

Vercel will automatically redeploy.

## Troubleshooting

### Issue: API not working
- Check environment variables in Vercel dashboard
- Verify GEMINI_API_KEY is set correctly

### Issue: Build fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json

### Issue: 404 on routes
- Verify vercel.json routing configuration
- Check that frontend build completed successfully

## Post-Deployment

Your app will be live at:
- Production: `https://ai-requirement-generator.vercel.app`
- Or your custom domain

Test the deployment:
1. Visit the URL
2. Enter a startup idea
3. Click "Generate Requirements"
4. Verify all 8 sections appear

## Continuous Deployment

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

Every push to GitHub triggers a new deployment!

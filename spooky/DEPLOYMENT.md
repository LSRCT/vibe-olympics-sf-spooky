# 🚀 Deployment Instructions

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Fastest)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. From the `spooky` directory, run:
```bash
vercel
```

3. Follow the prompts:
   - Link to existing project or create new
   - Set project name: `haunted-sf-tours` (or your choice)
   - Build settings are automatically detected from `vercel.json`

4. Deploy to production:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**:
```bash
cd ..
git add spooky/
git commit -m "Add Haunted SF Walking Tours app"
git push origin main
```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Set root directory to: `spooky`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variables** (for future phases):
   - Go to Project Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at: `https://your-project.vercel.app`

## Pre-Deployment Checklist

- [x] Build passes locally (`npm run build`)
- [x] No TypeScript errors
- [x] Tailwind CSS configured correctly
- [x] All components render properly
- [x] vercel.json configuration exists
- [ ] Environment variables configured (if needed)
- [ ] Custom domain configured (optional)

## Post-Deployment

### Test Your Deployment
1. Visit your Vercel URL
2. Test the user flow:
   - Landing page loads
   - "Begin Your Haunted Journey" button works
   - Tour input form accepts text
   - "Generate Haunted Tour" creates tour
   - Tour displays 5 spooky stops
   - Navigation works (Back, Start Over buttons)

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Monitoring
- Vercel automatically provides:
  - Analytics
  - Error tracking
  - Performance monitoring
  - Deployment logs

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild locally
rm -rf node_modules dist
npm install
npm run build
```

### Deployment Errors
- Check Vercel logs in the dashboard
- Verify root directory is set to `spooky`
- Ensure all dependencies are in package.json

### Environment Variables Not Working
- Prefix all Vite env vars with `VITE_`
- Redeploy after adding env vars

## Performance Tips

The current build is optimized:
- Minified JavaScript
- CSS purging via Tailwind
- Vite optimizations enabled
- Lazy loading ready

Target metrics:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90

## Next Steps After Deployment

1. Share the URL with testers
2. Gather feedback
3. Implement Phase 2 features:
   - Supabase authentication
   - Database persistence
   - AI-generated tours

---

Built with 💀 for the Vibe Coding Olympics

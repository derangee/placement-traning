# Deployment Guide

Complete guide for deploying CIMS to production.

## Prerequisites

- MongoDB Atlas account (for database)
- Cloudinary account (for image storage)
- Backend: Heroku/Railway/Render account
- Frontend: Netlify/Vercel/GitHub Pages

## Step 1: MongoDB Atlas Setup

### Create Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (free tier available)
3. Create a database user
4. Whitelist IP address (or allow all)
5. Get connection string

Example connection string:

```
mongodb+srv://username:password@cluster.mongodb.net/cims?retryWrites=true&w=majority
```

## Step 2: Cloudinary Setup

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Create folder for country flags

## Step 3: Backend Deployment

### Option A: Deploy to Railway

1. Push code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Create new project → Deploy from GitHub
4. Select your repository
5. Add environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=generate_secure_random_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
6. Deploy

### Option B: Deploy to Heroku

1. Install Heroku CLI
2. Create Procfile:
   ```
   web: node server.js
   ```
3. Create app:
   ```bash
   heroku create your-app-name
   ```
4. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_uri"
   heroku config:set JWT_SECRET="secure_random_string"
   heroku config:set CLOUDINARY_CLOUD_NAME="your_cloud_name"
   heroku config:set CLOUDINARY_API_KEY="your_api_key"
   heroku config:set CLOUDINARY_API_SECRET="your_api_secret"
   ```
5. Deploy:
   ```bash
   git push heroku main
   ```

### Option C: Deploy to Render

1. Push to GitHub
2. Go to [Render.com](https://render.com)
3. Create new Web Service
4. Select your GitHub repository
5. Configure:
   - Build Command: `npm install`
   - Start Command: `node server.js`
6. Add environment variables
7. Deploy

### Verify Backend

```bash
curl https://your-backend-url.com/api/health
```

Should return:

```json
{ "message": "Server is running" }
```

## Step 4: Frontend Deployment

### Option A: Deploy to Netlify

1. Push code to GitHub (frontend folder)
2. Go to [Netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select repository
5. Configure:
   - Base directory: `frontend`
   - Build command: (leave empty)
   - Publish directory: `frontend`
6. Deploy
7. Update `API_BASE_URL` in `frontend/js/api.js`:
   ```javascript
   const API_BASE_URL = "https://your-backend-url.com/api";
   ```
8. Redeploy

### Option B: Deploy to Vercel

1. Push to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Import project
4. Select `frontend` as root directory
5. Deploy
6. Update API base URL after deployment

### Option C: GitHub Pages

1. Create GitHub repository for frontend
2. Push frontend code
3. Go to Settings → Pages
4. Select `main` branch and `/frontend` folder
5. GitHub will deploy at `username.github.io/repo-name`
6. Update API base URL

### Option D: Traditional Hosting

Upload files via FTP:

1. Upload all files from `frontend/` folder
2. Update `API_BASE_URL` in `js/api.js`
3. Ensure web server supports static files

## Step 5: Configure CORS

Update backend `server.js` for production:

```javascript
app.use(
  cors({
    origin: "https://your-frontend-url.com",
    credentials: true,
  }),
);
```

## Step 6: Update Frontend API URL

In `frontend/js/api.js`:

```javascript
// Production
const API_BASE_URL = "https://your-backend-url.com/api";

// Development
// const API_BASE_URL = 'http://localhost:5000/api';
```

## Production Environment Variables

### Backend (.env)

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cims
JWT_SECRET=your_very_long_secure_random_string_min_32_chars
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Generate Secure JWT_SECRET

Using Node.js:

```javascript
require("crypto").randomBytes(32).toString("hex");
```

Output example:

```
a7f3k9m2l5n8p1q4r7s0t3u6v9w2x5y8z1a4b7c0d3e6f9g2h5i8j1k4l7m0
```

## Testing Deployment

### 1. Test Backend API

```bash
# Health check
curl https://your-backend-url.com/api/health

# Register user
curl -X POST https://your-backend-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123"
  }'

# Get countries
curl https://your-backend-url.com/api/countries
```

### 2. Test Frontend

1. Visit your frontend URL
2. Test login/register
3. Add a country with flag image
4. Test search functionality
5. Test edit/delete

### 3. Check Browser Console

Look for errors:

- Open DevTools (F12)
- Go to Console tab
- No red errors should appear

### 4. Network Requests

- Open Network tab in DevTools
- Perform an action
- Verify API calls succeed (200 status)

## Production Monitoring

### Monitor Backend

```bash
# Check logs
heroku logs -t          # Heroku
railway logs -t         # Railway
render logs -t          # Render
```

### Monitor Frontend

- Use Sentry for error tracking
- Google Analytics for usage
- Lighthouse for performance

## Security Checklist

- [ ] HTTPS enabled on both frontend and backend
- [ ] JWT_SECRET is long and random (32+ characters)
- [ ] MongoDB IP whitelist configured
- [ ] CORS allows only your frontend domain
- [ ] Environment variables not exposed in code
- [ ] Sensitive data stored in .env only
- [ ] Regular backups of MongoDB
- [ ] Monitor API rate limits
- [ ] Enable logging and monitoring

## Performance Optimization

### Backend

```javascript
// Enable compression
const compression = require("compression");
app.use(compression());

// Add caching headers
app.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=300");
  next();
});
```

### Frontend

- Minify CSS and JS
- Optimize images
- Enable browser caching
- Use CDN for static files

## Troubleshooting Deployment

### Backend Won't Start

```
Check logs for errors
heroku logs -t
Verify environment variables are set
Test database connection
```

### Frontend Can't Connect to Backend

```
Check API_BASE_URL is correct
Verify CORS is enabled on backend
Check firewall/network settings
Use browser DevTools Network tab
```

### Image Upload Fails

```
Verify Cloudinary credentials
Check file size limit
Test on different file formats
Check browser console for errors
```

### Slow Performance

```
Enable caching headers
Optimize database indexes
Compress responses
Use CDN for images
```

## Scaling Considerations

### When to Scale

- Database: >1GB data
- API: >1000 concurrent users
- Storage: >1000 images

### Scaling Options

1. **Database Scaling**
   - MongoDB Atlas sharding
   - Read replicas

2. **API Scaling**
   - Load balancer
   - Multiple server instances
   - Caching layer (Redis)

3. **Storage Scaling**
   - Cloudinary handles this automatically

## Rollback Procedure

### If Deployment Fails

**Heroku:**

```bash
heroku releases
heroku rollback v<number>
```

**Railway/Render:**

- Use dashboard to rollback
- Redeploy previous commit

**Netlify/Vercel:**

- Deployment history in UI
- Click to redeploy previous version

## Support & Help

- Backend Issues: Check server logs
- Frontend Issues: Check browser console
- Database Issues: MongoDB Atlas support
- Image Issues: Cloudinary dashboard

---

**Deployment Complete!** 🚀

Your application is now live. Share the URLs:

- Frontend: `https://your-frontend-url.com`
- Backend API: `https://your-backend-url.com/api`

For issues, check the troubleshooting section or contact support.

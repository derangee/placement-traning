# Quick Start Guide

Get your CIMS running in 5 minutes!

## 🚀 Quick Setup

### Step 1: Backend Setup (Terminal 1)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB and Cloudinary credentials
npm run dev
```

Backend runs on `http://localhost:5000`

### Step 2: Frontend Setup (Terminal 2)

```bash
cd frontend
# Use any of these:
python -m http.server 8000
# OR
npx http-server
# OR
npx live-server
```

Frontend runs on `http://localhost:8000` (or as shown in terminal)

### Step 3: Open in Browser

Go to: `http://localhost:8000`

## 📝 Quick Test

1. Click "Register" → Create account
2. Click "Add Country" → Fill form → Add flag image
3. View all countries on home page
4. Search countries
5. Edit/Delete your countries

## 🔐 Get Credentials

### MongoDB Atlas

1. Sign up: https://www.mongodb.com/cloud/atlas
2. Create cluster (free)
3. Create user
4. Get connection string: `mongodb+srv://...`
5. Add to `.env`

### Cloudinary

1. Sign up: https://cloudinary.com/
2. Get cloud name, API key, secret
3. Add to `.env`

## 📁 File Structure

```
.
├── backend/
│   ├── server.js           ← Start here
│   ├── package.json
│   ├── .env.example
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   └── middleware/
│
└── frontend/
    ├── index.html          ← Open here
    ├── css/style.css
    ├── js/
    │   ├── api.js
    │   ├── auth.js
    │   └── page scripts
    └── Other pages
```

## 🔧 Environment Setup

### Backend `.env`

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/cims
JWT_SECRET=supersecretkeyhere

CLOUDINARY_CLOUD_NAME=xxxxxx
CLOUDINARY_API_KEY=xxxxxx
CLOUDINARY_API_SECRET=xxxxxx
```

## 🧪 Test Endpoints

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'

# Get countries
curl http://localhost:5000/api/countries
```

## ⚡ Common Issues

| Issue                    | Solution                     |
| ------------------------ | ---------------------------- |
| Can't connect to MongoDB | Check MONGODB_URI in .env    |
| Port 5000 already in use | Change PORT in .env          |
| Images not uploading     | Check Cloudinary credentials |
| "API not reachable"      | Ensure backend is running    |
| Login not working        | Check token in localStorage  |

## 📚 Documentation

- Full docs: [README.md](./README.md)
- Backend API: [backend/README.md](./backend/README.md)
- Frontend: [frontend/README.md](./frontend/README.md)
- Deployment: [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🚀 Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:

- Deploy to Heroku/Railway/Render
- Deploy to Netlify/Vercel
- Production setup
- Custom domain

## 💡 Next Steps

After setup:

1. ✅ Test registration and login
2. ✅ Add 3-5 test countries
3. ✅ Test search functionality
4. ✅ Test edit and delete
5. ✅ Test on mobile browser
6. ✅ Deploy to production!

## 📞 Need Help?

1. Check documentation files
2. Look at console errors (F12)
3. Check server logs
4. Try troubleshooting section in README

## 🎉 You're All Set!

Your CIMS is ready to use. Start managing countries! 🌍

---

**Pro Tips:**

- Use Postman for testing APIs
- Check DevTools (F12) for errors
- Monitor backend logs while testing
- Test on mobile for responsive design

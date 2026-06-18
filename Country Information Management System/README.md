# Country Information Management System (CIMS)

A full-stack web application for managing country information with authentication, image uploads, and CRUD operations.

## Features

- 🔐 **User Authentication** - JWT-based login and registration
- 🌍 **Country Management** - Create, Read, Update, and Delete country information
- 🖼️ **Image Upload** - Upload and store country flag images using Cloudinary
- 🔍 **Search Functionality** - Search countries by name, capital, or continent
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight** - Vanilla HTML/CSS/JavaScript frontend (no framework overhead)

## Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Image Storage**: Cloudinary
- **File Upload**: express-fileupload

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Responsive styling
- **Vanilla JavaScript** - No dependencies, pure ES6+
- **Fetch API** - For API calls

## Project Structure

```
Country Information Management System/
├── backend/
│   ├── config/
│   │   ├── database.js          # MongoDB connection
│   │   └── cloudinary.js        # Cloudinary configuration
│   ├── controllers/
│   │   ├── authController.js    # Auth logic (register, login)
│   │   └── countryController.js # Country CRUD operations
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Country.js           # Country schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── countryRoutes.js     # Country endpoints
│   ├── server.js                # Express app setup
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── css/
    │   └── style.css            # All styling
    ├── js/
    │   ├── api.js               # API calls
    │   ├── auth.js              # Authentication logic
    │   ├── login.js             # Login page logic
    │   ├── register.js          # Register page logic
    │   ├── index.js             # Home page logic
    │   ├── country-detail.js    # Country detail page
    │   └── country-form.js      # Add/Edit country form
    ├── index.html               # Home page
    ├── login.html               # Login page
    ├── register.html            # Registration page
    ├── add-country.html         # Add country form
    ├── edit-country.html        # Edit country form
    └── country-detail.html      # Country details page
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB account (MongoDB Atlas)
- Cloudinary account

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

4. Configure environment variables:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cims
JWT_SECRET=your_jwt_secret_key_here

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. Start the backend server:

```bash
npm run dev    # Development mode with nodemon
npm start      # Production mode
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Open `index.html` in a web browser or use a local server:

**Using Python:**

```bash
python -m http.server 8000
```

**Using Node.js (http-server):**

```bash
npx http-server
```

Then visit `http://localhost:8000` or the specified port.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Countries

- `GET /api/countries` - Get all countries
- `GET /api/countries/search?query=...` - Search countries
- `GET /api/countries/:id` - Get country by ID
- `POST /api/countries` - Create country (Protected)
- `PUT /api/countries/:id` - Update country (Protected)
- `DELETE /api/countries/:id` - Delete country (Protected)

## Usage

### Register/Login

1. Click "Register" button
2. Fill in your name, email, and password
3. Or click "Login" if you already have an account

### Add Country

1. Login to your account
2. Click "Add Country" in the navigation
3. Fill in all required fields
4. Upload a flag image (optional)
5. Click "Add Country"

### Search Countries

1. Use the search bar on the home page
2. Search by country name, capital, or continent

### Edit/Delete Countries

1. View all countries on the home page
2. Click "Edit" or "Delete" button on cards you created
3. For edit, update information and click "Update Country"

## Security

- JWT tokens stored in localStorage with 7-day expiration
- Passwords hashed using bcryptjs (10 salt rounds)
- Protected routes require valid JWT token
- Only country creators can edit/delete their entries
- CORS enabled for frontend-backend communication

## Deployment

### Backend Deployment (Heroku/Railway/Render)

```bash
# Add Procfile
echo "web: node server.js" > Procfile

# Push to deployment platform
git push
```

### Frontend Deployment (Netlify/Vercel/GitHub Pages)

- Push frontend folder to repository
- Connect repository to Netlify/Vercel
- Set build command: (not needed for static HTML)
- Set publish directory: `frontend/`

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Troubleshooting

### CORS Issues

Ensure backend CORS is configured to accept your frontend URL.

### MongoDB Connection Errors

- Verify connection string in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure username and password are correct

### Image Upload Issues

- Verify Cloudinary credentials
- Check file size (max 5MB recommended)
- Ensure supported image format (JPG, PNG, etc.)

### JWT Token Expiration

- Tokens expire after 7 days
- User needs to login again
- Refresh token implementation can be added

## Future Enhancements

- [ ] Refresh token implementation
- [ ] Password reset functionality
- [ ] User profile management
- [ ] Country ratings and reviews
- [ ] Advanced filtering options
- [ ] Export data as CSV/PDF
- [ ] Bulk upload functionality
- [ ] Admin dashboard
- [ ] Real-time notifications
- [ ] Dark mode theme

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository or contact the development team.

---

Built with ❤️ by [Your Name]

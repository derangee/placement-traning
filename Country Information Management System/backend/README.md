# Backend API Documentation

## Overview

The CIMS Backend is a RESTful API built with Express.js that manages user authentication and country data with MongoDB and Cloudinary integration.

## Installation & Setup

### Requirements

- Node.js v14+
- MongoDB Atlas account
- Cloudinary account

### Setup Steps

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cims
JWT_SECRET=your_secret_key_min_32_chars

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

3. Run the server:

```bash
npm run dev    # Development with hot reload
npm start      # Production
```

## API Authentication

### JWT Token

- Tokens are returned upon login/registration
- Include in Authorization header: `Bearer <token>`
- Token expires in 7 days
- Stored in localStorage on client

### Example Request

```javascript
const token = localStorage.getItem("token");
fetch("http://localhost:5000/api/countries", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## Endpoints

### Authentication

#### Register User

```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 201
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login User

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}

Response: 200
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Current User

```
GET /api/auth/me
Authorization: Bearer <token>

Response: 200
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Countries

#### Get All Countries

```
GET /api/countries

Response: 200
{
  "message": "Countries fetched successfully",
  "count": 50,
  "countries": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "India",
      "capital": "New Delhi",
      "continent": "Asia",
      "population": 1380004385,
      "area": 3287263,
      "currency": "Indian Rupee",
      "language": "Hindi",
      "flag": {
        "public_id": "country-flags/india_flag",
        "url": "https://res.cloudinary.com/.../india_flag.jpg"
      },
      "description": "India is a country...",
      "createdBy": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe"
      },
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### Search Countries

```
GET /api/countries/search?query=india

Response: 200
{
  "message": "Search results",
  "count": 5,
  "countries": [...]
}
```

#### Get Country by ID

```
GET /api/countries/:id

Response: 200
{
  "message": "Country fetched successfully",
  "country": {...}
}
```

#### Create Country

```
POST /api/countries
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data:
- name: "India"
- capital: "New Delhi"
- continent: "Asia"
- population: 1380004385
- area: 3287263
- currency: "Indian Rupee"
- language: "Hindi"
- description: "India is a country..."
- flag: <image file>

Response: 201
{
  "message": "Country created successfully",
  "country": {...}
}
```

#### Update Country

```
PUT /api/countries/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form Data: (same as create, any field can be omitted)

Response: 200
{
  "message": "Country updated successfully",
  "country": {...}
}
```

#### Delete Country

```
DELETE /api/countries/:id
Authorization: Bearer <token>

Response: 200
{
  "message": "Country deleted successfully"
}
```

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Country Model

```javascript
{
  _id: ObjectId,
  name: String (unique),
  capital: String,
  continent: String,
  population: Number,
  area: Number,
  currency: String,
  language: String,
  flag: {
    public_id: String,
    url: String
  },
  description: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## Error Responses

### 400 Bad Request

```json
{
  "message": "Please provide all fields"
}
```

### 401 Unauthorized

```json
{
  "message": "Invalid token"
}
```

### 403 Forbidden

```json
{
  "message": "Not authorized to delete this country"
}
```

### 404 Not Found

```json
{
  "message": "Country not found"
}
```

### 500 Server Error

```json
{
  "message": "Server error",
  "error": "Error details"
}
```

## Deployment

### Environment Setup for Production

1. Set NODE_ENV=production
2. Use a process manager (PM2, forever)
3. Configure MongoDB Atlas for production
4. Set secure JWT_SECRET
5. Enable CORS for your frontend domain
6. Use HTTPS

### Deploy to Heroku

```bash
# Create Procfile
echo "web: node server.js" > Procfile

# Push to Heroku
git push heroku main
```

### Deploy to Railway/Render

1. Connect GitHub repository
2. Set environment variables in dashboard
3. Auto-deploy on push

## Performance Tips

- Use MongoDB indexes on frequently searched fields
- Implement pagination for large datasets
- Cache country data on frontend
- Use CDN for flag images (Cloudinary does this)
- Monitor API response times

## Security Considerations

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens expire after 7 days
- CORS configured for frontend communication
- Input validation on all endpoints
- Only creators can edit/delete their entries
- File upload validation and size limits

## Troubleshooting

### MongoDB Connection Error

```
MongooseError: Cannot connect to MongoDB
```

- Check MONGODB_URI in .env
- Verify IP whitelist in MongoDB Atlas
- Check username/password credentials

### Cloudinary Upload Failed

```
Error: Invalid Cloudinary credentials
```

- Verify CLOUDINARY_CLOUD_NAME
- Check API key and secret
- Ensure file size < 100MB

### JWT Token Invalid

```
Error: Invalid token
```

- Token might have expired (login again)
- Check Authorization header format
- Verify JWT_SECRET matches backend

---

For more details, see the main README.md

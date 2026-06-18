# Passport.js Integration

This project now uses **Passport.js** for authentication alongside JWT tokens. Passport.js provides a flexible and modular authentication middleware that makes it easy to support various authentication strategies.

## Installed Packages

- `passport` - Authentication middleware
- `passport-jwt` - JWT strategy for validating tokens
- `passport-local` - Local strategy for email/password authentication

## Configuration

### Passport Strategies

**1. Local Strategy** (`config/passport.js`)

- Used for email/password login
- Verifies email and password credentials
- Returns authenticated user object

**2. JWT Strategy** (`config/passport.js`)

- Validates Bearer tokens in Authorization header
- Extracts token from `Authorization: Bearer <token>`
- Returns authenticated user object

## How It Works

### 1. User Registration

```javascript
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

- User is created and password is hashed with bcryptjs
- JWT token is generated and returned

### 2. User Login (Two Methods)

**Method 1: Standard JWT Login (Existing)**

```javascript
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Method 2: Passport Local Login (New)**

```javascript
POST /api/auth/passport-login
{
  "email": "john@example.com",
  "password": "password123"
}
```

Both methods return:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 3. Protected Routes (Two Methods)

**Method 1: Custom JWT Middleware**

```javascript
GET /api/auth/me
Authorization: Bearer <token>
```

**Method 2: Passport JWT Middleware**

```javascript
GET /api/auth/me-passport
Authorization: Bearer <token>
```

## Middleware

### Custom Authentication Middleware

- Located in `middleware/auth.js`
- Original implementation for backward compatibility
- Manually extracts and verifies JWT tokens

### Passport Authentication Middleware

- Located in `middleware/auth.js`
- `passportJwtAuth` - Direct Passport JWT authentication
- `passportAuthMiddleware` - Passport JWT with userId attachment

## Usage Examples

### In Routes

```javascript
// Using custom middleware
router.get("/me", authMiddleware, getCurrentUser);

// Using Passport JWT middleware
router.get("/me-passport", passportAuthMiddleware, getCurrentUser);

// Using Passport Local strategy
router.post("/passport-login", passportLogin);
```

### In Controllers

```javascript
// Passport Local authentication
const passportLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      return res.status(401).json({ message: info?.message });
    }
    // Generate JWT token after authentication
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, user });
  })(req, res, next);
};
```

## Benefits of Passport.js

1. **Modular Design** - Easy to add multiple strategies (OAuth, SAML, etc.)
2. **Clean Code** - Separates authentication logic from routes
3. **Security** - Built-in best practices for authentication
4. **Flexibility** - Can use with sessions, JWT, or other token mechanisms
5. **Extensibility** - Easily add more strategies without changing existing code

## Adding More Strategies

To add more authentication strategies (e.g., Google, GitHub):

1. Install the strategy package:

   ```bash
   npm install passport-google-oauth20
   ```

2. Add strategy configuration to `config/passport.js`:

   ```javascript
   const GoogleStrategy = require("passport-google-oauth20").Strategy;

   passport.use(
     new GoogleStrategy(
       {
         clientID: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
       },
       (accessToken, refreshToken, profile, done) => {
         // Verify and create/update user
       },
     ),
   );
   ```

3. Add routes for OAuth callback:
   ```javascript
   router.get(
     "/google",
     passport.authenticate("google", { scope: ["profile", "email"] }),
   );
   router.get(
     "/google/callback",
     passport.authenticate("google", { failureRedirect: "/" }),
     (req, res) => {
       // Successful authentication
     },
   );
   ```

## Environment Variables

Ensure these are in your `.env` file:

```
JWT_SECRET=your_secret_key_here
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Testing

### Test Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Test Passport Login

```bash
curl -X POST http://localhost:5000/api/auth/passport-login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Protected Route

```bash
curl -X GET http://localhost:5000/api/auth/me-passport \
  -H "Authorization: Bearer <token_from_login>"
```

## Security Notes

- Tokens expire in 7 days (configured in `authController.js`)
- Passwords are hashed with bcryptjs (10 salt rounds)
- JWT secret should be a long, random string
- Always use HTTPS in production
- Consider implementing refresh tokens for better security

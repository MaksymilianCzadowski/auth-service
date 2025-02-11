# Authentication Microservice

A robust authentication microservice built with Express.js and TypeScript, featuring Google OAuth2.0 integration.

## Features

- Google OAuth2.0 Authentication
- JWT Token Management
- Rate Limiting
- Error Handling
- Logging System
- TypeScript Support
- Security Best Practices

## Prerequisites

- Node.js >= 14
- MongoDB
- Google OAuth2.0 Credentials

## Google OAuth2.0 Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Configure OAuth consent screen:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in the application name and developer contact information
   - Add the following scopes: `email`, `profile`
5. Create OAuth credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     ```
     http://localhost:3000
     ```
   - Add authorized redirect URIs:
     ```
     http://localhost:3000/auth/google/callback
     ```
6. Copy your Client ID and Client Secret

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/auth-service
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
FRONTEND_URL=http://localhost:3001
```

## Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server
npm run dev

# Start production server
npm start
```

## API Endpoints

### Google Authentication

- `GET /auth/google`: Initiates Google OAuth2.0 authentication
- `GET /auth/google/callback`: Google OAuth2.0 callback URL
- `GET /auth/verify`: Verifies JWT token

### Authentication Flow

1. User initiates authentication via `/auth/google`
2. After successful Google authentication, receives JWT token
3. Use JWT token in Authorization header for protected routes

## Security Features

- Helmet.js for HTTP security headers
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- JWT token authentication
- Input validation
- Error handling middleware

## Error Handling

The service includes a comprehensive error handling system with:
- Custom error classes
- Structured error responses
- Detailed logging

## Logging

Winston logger configured for:
- Console output in development
- File-based logging in production
- Error tracking
- Request logging

## Development

```bash
# Run linter
npm run lint

# Run tests
npm test
```

## Production Deployment

1. Set appropriate environment variables
2. Build the project: `npm run build`
3. Start the server: `npm start`

## License

ISC 
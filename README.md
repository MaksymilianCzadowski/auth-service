# Authentication Microservice

A robust authentication microservice built with Express.js and TypeScript, featuring Google OAuth2.0, GitHub OAuth, and OpenID Connect (Keycloak) integration.

## Features

- Google OAuth2.0 Authentication
- GitHub OAuth Authentication
- OpenID Connect Authentication with Keycloak
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
- GitHub OAuth Credentials
- Keycloak Server (for OpenID Connect)

## Authentication Setup

### Google OAuth2.0 Setup

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

### GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click on "New OAuth App"
3. Fill in the application details:
   - Application name: Your app name
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/auth/github/callback`
4. Click "Register application"
5. Copy your Client ID
6. Generate a new Client Secret and copy it

### Keycloak Setup (OpenID Connect)

1. Download and Install Keycloak:
   ```bash
   # Using Docker
   docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev
   ```

2. Access Keycloak Admin Console:
   - Go to `http://localhost:8080/admin`
   - Login with the admin credentials (default: admin/admin)

3. Create a New Realm:
   - Click "Create Realm"
   - Name it (e.g., "auth-service")
   - Click "Create"

4. Create a New Client:
   - Go to "Clients" > "Create client"
   - Set Client ID (e.g., "auth-service-client")
   - Enable "Client authentication"
   - Set Access Type to "confidential"
   - Set Valid Redirect URIs:
     ```
     http://localhost:3000/auth/openid/callback
     ```
   - Save the client

5. Get Client Credentials:
   - Go to the "Credentials" tab of your client
   - Copy the Client ID and Client Secret

6. Configure User Federation (Optional):
   - Go to "User Federation"
   - Configure LDAP or other user providers if needed

7. Create Test Users (Optional):
   - Go to "Users" > "Add user"
   - Create test users for development

## Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/auth-service
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# OpenID Connect Configuration
OPENID_ISSUER=http://localhost:8080/realms/auth-service
OPENID_CLIENT_ID=auth-service-client
OPENID_CLIENT_SECRET=your-client-secret
OPENID_CALLBACK_URL=http://localhost:3000/auth/openid/callback

# Frontend Configuration
FRONTEND_URL=http://localhost:3001

# Cookie Configuration
COOKIE_SECRET=your-cookie-secret
COOKIE_MAX_AGE=86400000
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

### Authentication

- `GET /auth/google`: Initiate Google OAuth2.0 authentication
- `GET /auth/google/callback`: Google OAuth2.0 callback URL
- `GET /auth/github`: Initiate GitHub OAuth authentication
- `GET /auth/github/callback`: GitHub OAuth callback URL
- `GET /auth/openid`: Initiate OpenID Connect authentication
- `GET /auth/openid/callback`: OpenID Connect callback URL
- `GET /auth/verify`: Verifies JWT token
- `POST /auth/logout`: Logout user

### Authentication Flow

1. User initiates authentication via `/auth/google`, `/auth/github`, or `/auth/openid`
2. After successful authentication, receives JWT token
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
2. Configure Keycloak for production:
   - Use HTTPS
   - Set proper security settings
   - Configure user federation if needed
3. Build the project: `npm run build`
4. Start the server: `npm start`

## License

ISC 
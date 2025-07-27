# Task Manager API Setup

## Environment Configuration

### 1. Copy Environment Template
```bash
cp .env.example .env
```

### 2. Configure Your .env File
Edit the `.env` file with your actual credentials:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-that-is-at-least-32-characters-long
JWT_ISSUER=TaskManagerAPI
JWT_AUDIENCE=TaskManagerClient

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here

# Microsoft OAuth
MICROSOFT_CLIENT_ID=your-microsoft-client-id-here
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret-here

# Database
CONNECTION_STRING=Data Source=TaskManager.db
```

## OAuth Setup

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set Application Type to "Web application"
6. Add Authorized Redirect URIs:
   - `https://localhost:7001/api/auth/google-callback`
   - `http://localhost:5000/api/auth/google-callback`
7. Copy the Client ID and Client Secret to your `.env` file

### Microsoft OAuth Setup
1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to "Azure Active Directory" → "App registrations"
3. Click "New registration"
4. Fill in the details:
   - Name: "Task Manager API"
   - Supported account types: "Accounts in this organizational directory only"
   - Redirect URI: Web → `https://localhost:7001/api/auth/microsoft-callback`
5. After creation, go to "Certificates & secrets"
6. Create a new client secret
7. Copy the Application (client) ID and Client Secret to your `.env` file

## Running the Application

### 1. Install Dependencies
```bash
dotnet restore
```

### 2. Run the Application
```bash
dotnet run
```

The API will be available at:
- Swagger UI: `https://localhost:7001/swagger`
- API Base: `https://localhost:7001/api`

## Security Notes

- **Never commit your `.env` file** - it's already in `.gitignore`
- **Generate a strong JWT secret** - use a random string of at least 32 characters
- **Keep OAuth secrets secure** - these should never be shared publicly
- **Use different credentials for development and production**

## Testing OAuth

Once configured, you can test the OAuth endpoints:

- **Google OAuth**: `https://localhost:7001/api/auth/google`
- **Microsoft OAuth**: `https://localhost:7001/api/auth/microsoft`

These will redirect to the respective OAuth providers for authentication. 
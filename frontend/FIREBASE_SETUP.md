# Firebase Authentication Setup

This guide will help you set up Firebase Authentication for the FedHealth application.

## Prerequisites

1. A Google account
2. Access to the [Firebase Console](https://console.firebase.google.com/)

## Setup Steps

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter a project name (e.g., "fedhealth-portal")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project dashboard, click on "Authentication" in the left sidebar
2. Click on the "Get started" button
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

### 3. Get Firebase Configuration

1. In your Firebase project dashboard, click on the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to the "Your apps" section
4. Click on the web icon (`</>`) to add a web app
5. Enter an app nickname (e.g., "FedHealth Web App")
6. Click "Register app"
7. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. In the `frontend` directory, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values with your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-actual-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
   VITE_FIREBASE_APP_ID=your-actual-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-actual-measurement-id
   ```

### 5. Configure Authorized Domains (for production)

1. In Firebase Console, go to Authentication > Settings
2. In the "Authorized domains" section, add your production domain
3. For development, `localhost` should already be included

## Testing Authentication

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the application in your browser
3. Try to download software - you should be prompted to sign in
4. Create a new account or sign in with existing credentials
5. After authentication, you should be able to access the download functionality

## Features Implemented

- ✅ Email/Password authentication
- ✅ User registration with display name
- ✅ Password reset functionality
- ✅ Protected download routes
- ✅ User session persistence
- ✅ Responsive authentication modals
- ✅ Error handling and validation

## Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already included in `.gitignore`
- In production, set environment variables through your hosting platform
- Consider enabling additional security features like email verification

## Troubleshooting

### Common Issues

1. **"Firebase not configured" errors**: Make sure your `.env` file exists and contains valid Firebase configuration values.

2. **Authentication not working**: Check that Email/Password authentication is enabled in your Firebase Console.

3. **CORS errors**: Ensure your domain is listed in the Authorized domains section of Firebase Authentication settings.

4. **Environment variables not loading**: Make sure your `.env` file is in the `frontend` directory and variable names start with `VITE_`.

### Demo Mode

If you don't want to set up Firebase immediately, the application will run in demo mode with placeholder configuration values. However, authentication features will not work until proper Firebase configuration is provided.

# Authentication Setup Guide

## Overview

The notification dashboard has been updated with enhanced authentication support and debugging capabilities. The application now includes:

- **Comprehensive logging** for authentication and API requests
- **Token management** with localStorage persistence
- **Axios interceptors** for automatic Bearer token injection
- **Error handling and debugging** for 401 Unauthorized errors

## Getting Started

### 1. Setting the JWT Token

The application looks for the JWT token in the following order:

1. `window.APP_CONFIG.token` (set before app initialization)
2. localStorage under key `"token"`
3. Query parameter `?token=YOUR_TOKEN`

#### Option A: Set Token Before App Loads (Recommended for Testing)

Create a test HTML file or open browser console and run:

```javascript
// In browser console BEFORE navigating to the app
localStorage.setItem("token", "YOUR_JWT_TOKEN_HERE");
```

Then refresh the page or navigate to `http://localhost:5176`

#### Option B: Set Token via Query Parameter

Navigate to:

```
http://localhost:5176/?token=YOUR_JWT_TOKEN_HERE
```

#### Option C: Set Token via Window Config

In index.html, before the app loads, set:

```javascript
window.APP_CONFIG = {
  token: "YOUR_JWT_TOKEN_HERE",
};
```

### 2. JWT Token Format

Your JWT token should be in the format:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.{PAYLOAD}.{SIGNATURE}
```

**Example JWT provided for evaluation:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJlMjNjc2V1MTIwMkBiZW5uZXR0LmVkdS5pbiIsImV4cCI6MTc3ODQ3OTk2NywiaWF0IjoxNzc4NDc5MDY3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiM2U3YWRiMzUtMmIzYS00ZTE0LTkxZWQtMTIyM2E4ZmJhZWM0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic3VkZWVwdGkgZ3VwdGEiLCJzdWIiOiI2ZTIxMTdhNS01Yjk0LTQwMjMtOWEzZC01ZWRlZGUzZWI2OGMifSwiZW1haWwiOiJlMjNjc2V1MTIwMkBiZW5uZXR0LmVkdS5pbiIsIm5hbWUiOiJzdWRlZXB0aSBndXB0YSIsInJvbGxObyI6ImUyM2NzZXUxMjAyIiwiYWNjZXNzQ29kZSI6IlRmRHhnciIsImNsaWVudElEIjoiNmUyMTE3YTUtNWI5NC00MDIzLTlhM2QtNWVkZWRlM2ViNjhjIiwiY2xpZW50U2VjcmV0IjoiZFhFYUpNWE55RkhLZlBZQSJ9.jT1z_G48WTlYy83qt65iiVH-bQpBxOUGKT5nsD9K-6Y
```

## Debugging

### Console Logs

The application now includes debug console logs for authentication and API requests. Open the browser DevTools (F12) and look for logs starting with:

- **[AUTH]** - Authentication initialization
- **[AXIOS]** - Axios request/response details
- **[LOGGER]** - Logging middleware operations
- **[NOTIFICATIONS API]** - Notification API calls
- **[APP]** - Application initialization

### Key Debug Information

1. **Token Existence**: Look for logs like:

   ```
   [AXIOS] Request interceptor - Token exists: true
   [AXIOS] Setting Authorization header with token length: 445
   ```

2. **Authorization Header**: Should show:

   ```
   [AXIOS] Authorization header set: Bearer ****
   ```

3. **API Requests**: Should log:

   ```
   [NOTIFICATIONS API] Fetching notifications with params: {limit: 10, page: 1}
   ```

4. **Responses**: Success logs show:
   ```
   [AXIOS] Response received: {status: 200, url: "/notifications"}
   ```

### Troubleshooting 401 Errors

If you receive 401 Unauthorized errors:

1. **Check token in localStorage**:

   ```javascript
   console.log(localStorage.getItem("token"));
   ```

2. **Verify token length** - Should be > 100 characters

3. **Check Authorization header** - Look for `[AXIOS] Authorization header set: Bearer ****`

4. **Verify API endpoint** - Should be `http://4.224.186.213/evaluation-service/notifications`

5. **Clear cache** - Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)

## API Endpoints

### Base URL

```
http://4.224.186.213/evaluation-service
```

### Endpoints

1. **Get Notifications**

   ```
   GET /notifications
   Query params: limit, page, notification_type
   Auth: Bearer TOKEN
   ```

2. **Logs**
   ```
   POST /logs
   Auth: Bearer TOKEN
   Body: {stack, level, packageName, message}
   ```

## Authentication Flow

1. **App Initialization** (`src/App.tsx`)
   - Calls `initializeAuth()` on mount
   - Checks localStorage for existing token
   - Logs token status to console

2. **Axios Interceptor** (`src/api/axios.ts`)
   - Request interceptor adds Authorization header
   - Includes "Bearer " prefix
   - Logs token existence and header setup

3. **Logger Middleware** (`src/middleware/logger.ts`)
   - Also uses Bearer token for log requests
   - Validates token before sending

4. **Error Handling**
   - 401 errors are logged to console
   - No console.log in production (can be removed after debugging)

## Files Modified

- `src/utils/auth.ts` - New authentication utilities
- `src/api/axios.ts` - Enhanced interceptors with debugging
- `src/middleware/logger.ts` - Better token handling and logging
- `src/api/notifications.ts` - Request logging
- `src/App.tsx` - Token initialization
- `index.html` - Token initialization script
- Build: ✅ Successful
- Dev server: ✅ Running

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build

# 3. Start dev server
npm run dev

# 4. In browser console, set the token
localStorage.setItem("token", "YOUR_JWT_TOKEN");

# 5. Refresh the page - app should now authenticate successfully
```

## Security Notes

- **Temporary Debug Logs**: The console.log statements are for debugging only. Remove or disable in production.
- **LocalStorage**: Tokens are stored in localStorage. For production, consider using httpOnly cookies.
- **Bearer Token**: Automatically added by axios interceptor to all requests.
- **Token Validation**: Add token expiration checks for production use.

## Removing Debug Logs

After debugging, remove or comment out console.log statements in:

- `src/utils/auth.ts`
- `src/api/axios.ts`
- `src/middleware/logger.ts`
- `src/api/notifications.ts`
- `src/App.tsx`

This will clean up the production build and improve performance.

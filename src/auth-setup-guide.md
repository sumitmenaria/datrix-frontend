# 🔐 Authentication Setup Guide

## Required Dependencies

Add these to your `package.json` and run `npm install`:

```bash
npm install amazon-cognito-identity-js
```

## Environment Variables

Create a `.env` file in your project root with:

```env
# Amazon Cognito Configuration
REACT_APP_AWS_REGION=us-east-1
REACT_APP_COGNITO_USER_POOL_ID=us-east-1_XXXXXXXXX
REACT_APP_COGNITO_CLIENT_ID=your-client-id-here

# API Configuration
REACT_APP_API_BASE_URL=https://your-api-gateway-url.com/api/v1
```

## Amazon Cognito Information Needed

Please provide these details from your AWS Cognito setup:

### 1. **User Pool Details**
- **Region**: Your AWS region (e.g., `us-east-1`, `eu-west-1`)
- **User Pool ID**: Found in Cognito console (format: `us-east-1_XXXXXXXXX`)
- **App Client ID**: Found under "App clients" in your User Pool

### 2. **User Pool Configuration**
- **Sign-in options**: Email, Username, or both
- **Required attributes**: Email, Name, etc.
- **Password policy**: Minimum requirements
- **MFA settings**: If enabled (currently not implemented in demo)

### 3. **Custom Attributes** (Optional)
If you want role-based access, add these custom attributes:
- `custom:role` (String) - For user roles (admin, user, viewer)
- `custom:department` (String) - For department filtering

## Required APIs

Your backend should implement these endpoints:

### Authentication Endpoints
```
POST /api/v1/auth/refresh - Refresh token validation
POST /api/v1/auth/verify - Verify user session
```

### Dashboard APIs
```
GET /api/v1/dashboard/metrics - Overall metrics
GET /api/v1/dashboard/activities - Recent activities
```

### Compliance APIs
```
GET /api/v1/compliance/frameworks - List frameworks
GET /api/v1/compliance/frameworks/:id - Get framework details
PUT /api/v1/compliance/frameworks/:id - Update framework
GET /api/v1/compliance/assessments - List assessments
POST /api/v1/compliance/assessments - Create assessment
```

### Policy APIs
```
GET /api/v1/policies - List policies (with filters)
GET /api/v1/policies/:id - Get policy details
POST /api/v1/policies - Create policy
PUT /api/v1/policies/:id - Update policy
DELETE /api/v1/policies/:id - Delete policy
GET /api/v1/policies/categories - Get categories
```

### Risk Management APIs
```
GET /api/v1/risks - List risks (with filters)
GET /api/v1/risks/:id - Get risk details
POST /api/v1/risks - Create risk
PUT /api/v1/risks/:id - Update risk
DELETE /api/v1/risks/:id - Delete risk
GET /api/v1/risks/assessments - List assessments
POST /api/v1/risks/assessments - Create assessment
```

### Security APIs
```
GET /api/v1/security/controls - List security controls
GET /api/v1/security/controls/:id - Get control details
PUT /api/v1/security/controls/:id - Update control
GET /api/v1/security/incidents - List incidents
POST /api/v1/security/incidents - Create incident
GET /api/v1/security/vulnerabilities - List vulnerabilities
GET /api/v1/security/metrics - Security metrics
```

### Training APIs
```
GET /api/v1/training/programs - List training programs
GET /api/v1/training/programs/:id - Get program details
POST /api/v1/training/programs - Create program
PUT /api/v1/training/programs/:id - Update program
DELETE /api/v1/training/programs/:id - Delete program
GET /api/v1/training/progress - Training progress
PUT /api/v1/training/progress/:programId/:userId - Update progress
GET /api/v1/training/metrics - Training metrics
```

### User Management APIs
```
GET /api/v1/users - List users
GET /api/v1/users/:id - Get user details
PUT /api/v1/users/:id - Update user
GET /api/v1/users/:id/permissions - User permissions
```

### Audit & Reporting APIs
```
GET /api/v1/audit/logs - Audit trail
POST /api/v1/reports/generate - Generate report
GET /api/v1/reports - List reports
GET /api/v1/reports/:id - Get report
GET /api/v1/reports/:id/download - Download report
```

## API Response Format

All APIs should return this format:

```typescript
{
  "success": true,
  "data": { /* your data */ },
  "message": "Success message",
  "errors": [] // Only if success is false
}
```

## API Security

- All protected endpoints should validate JWT tokens from Cognito
- Include user context in API responses when needed
- Implement proper error handling and logging
- Use CORS headers for web client access

## Testing Authentication

1. Update the environment variables with your Cognito details
2. Install the dependencies
3. Try logging in with a test user from your Cognito User Pool
4. The app will show a loading screen while checking authentication
5. On successful login, you'll see the main GRC dashboard

## Features Included

✅ **Login Form** - Modern glassmorphism design with validation
✅ **Authentication Context** - Global auth state management  
✅ **Protected Routes** - Automatic redirect to login
✅ **Token Management** - Auto-refresh before expiry
✅ **User Profile** - Display user info in header
✅ **Logout** - Secure session termination
✅ **Loading States** - Beautiful loading screens
✅ **Error Handling** - User-friendly error messages
✅ **Role-based Access** - Support for user roles

## Next Steps

1. Provide your Cognito configuration details
2. Install the required dependencies
3. Update the environment variables
4. Implement the backend APIs
5. Test the authentication flow
6. Customize user roles and permissions as needed
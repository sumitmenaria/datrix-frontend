# DatrixOne - Compliance Management Platform

A modern React-based compliance management platform designed for enterprise governance, risk management, and regulatory compliance.

## 🚀 Project Status

### ✅ **Completed Features**

#### **Authentication System**
- ✅ AWS Cognito integration with custom user pool..
- ✅ Role-based access control (Admin/User)
- ✅ NEW_PASSWORD_REQUIRED flow handling
- ✅ Beautiful animated login screen with glassmorphism effects
- ✅ Custom email templates for user creation

#### **User Management** 
- ✅ Complete CRUD operations for users
- ✅ Organization-based user filtering
- ✅ Role assignment and management
- ✅ Admin-only access to user management

#### **Dashboard & Analytics**
- ✅ Real-time compliance metrics
- ✅ Interactive charts with ApexCharts
- ✅ Risk distribution visualization
- ✅ Training progress tracking
- ✅ API integration for live data

#### **Policy Management**
- ✅ AI-powered policy generation using Claude 3.5 Sonnet
- ✅ Policy lifecycle management (Draft → Review → Published)
- ✅ Version control system
- ✅ Saudi compliance templates (PDPL, NCA-ECC, SAMA)
- ✅ Policy viewer with drawer interface

#### **Backend Infrastructure**
- ✅ Unified Datrix API (replaces multiple endpoints)
- ✅ AWS SAM serverless architecture
- ✅ DynamoDB for data storage
- ✅ Lambda functions for business logic

#### **UI/UX Design**
- ✅ Modern glassmorphism design system
- ✅ Purple-blue gradient color scheme
- ✅ Responsive layout with Tailwind CSS
- ✅ Animated components with Framer Motion
- ✅ DatrixOne branding throughout

### 🔄 **In Progress**

#### **Deployment**
- 🔄 AWS Amplify deployment configuration
- 🔄 MIME type issues resolution
- 🔄 Build optimization for production

### 📋 **Pending Features**

#### **Core Functionality**
- ⏳ Risk Management module implementation
- ⏳ Security scanning integration
- ⏳ Training module with progress tracking
- ⏳ Audit trail and logging system

#### **Advanced Features**
- ⏳ Real-time notifications system
- ⏳ Advanced search and filtering
- ⏳ Document management system
- ⏳ Reporting and export functionality

#### **Integrations**
- ⏳ Third-party compliance tools
- ⏳ SSO integration (Google, Microsoft)
- ⏳ API webhooks for external systems
- ⏳ Mobile app development

#### **Security & Compliance**
- ⏳ SOC 2 compliance implementation
- ⏳ Data encryption at rest
- ⏳ Audit logging enhancement
- ⏳ Multi-factor authentication

## 🛠 **Technology Stack**

### **Frontend**
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **UI Components**: Ant Design + Custom components
- **Charts**: ApexCharts
- **Animation**: Framer Motion
- **Build Tool**: Vite

### **Backend**
- **Architecture**: AWS SAM (Serverless)
- **Runtime**: Python 3.9
- **Database**: DynamoDB
- **API**: AWS API Gateway + Lambda
- **AI**: AWS Bedrock (Claude 3.5 Sonnet)

### **Authentication**
- **Service**: AWS Cognito
- **User Pool**: Custom configuration
- **Flows**: SRP, NEW_PASSWORD_REQUIRED
- **Authorization**: JWT tokens

### **Deployment**
- **Frontend**: AWS Amplify
- **Backend**: AWS SAM CLI
- **Domain**: app.datrixone.com
- **CI/CD**: GitHub integration

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+
- AWS CLI configured
- AWS SAM CLI installed

### **Installation**
```bash
# Clone repository
git clone <repository-url>
cd frontend_new

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Environment Setup**
```bash
# Copy environment template
cp .env.example .env.local

# Configure API endpoints
VITE_API_BASE_URL=https://your-api-gateway-url
VITE_COGNITO_USER_POOL_ID=your-user-pool-id
VITE_COGNITO_CLIENT_ID=your-client-id
```

## 📁 **Project Structure**

```
frontend_new/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   ├── ui/             # Base UI components
│   │   └── *.tsx           # Page components
│   ├── contexts/           # React contexts
│   ├── services/           # API services
│   ├── config/             # Configuration files
│   └── styles/             # Global styles
├── public/                 # Static assets
└── package.json
```

## 🔗 **API Endpoints**

### **User Management**
- `POST /get-user` - Fetch users by organization
- `POST /add-user` - Create new user
- `POST /update-user` - Update user details
- `POST /set-password` - Set user password
- `POST /delete-user` - Delete user

### **Policy Management**
- `GET /policies` - Get organization policies
- `POST /policy` - Create/update policy
- `POST /generate-policy` - AI policy generation
- `GET /policy-templates` - Get available templates

## 🎨 **Design System**

### **Colors**
- **Primary**: `#667eea` → `#764ba2` (Blue to Purple gradient)
- **Background**: Glassmorphism with blur effects
- **Text**: Dynamic based on theme
- **Status**: Green (success), Red (error), Orange (warning)

### **Typography**
- **Headings**: Inter font family
- **Body**: Poppins for readability
- **Code**: JetBrains Mono

## 🔐 **Security Features**

- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Secure API endpoints
- ✅ Input validation and sanitization
- ✅ HTTPS enforcement
- ✅ CORS configuration

## 📊 **Performance**

- ✅ Code splitting with React.lazy
- ✅ Optimized bundle size
- ✅ Lazy loading for components
- ✅ Efficient state management
- ✅ Caching strategies

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 **License**

This project is proprietary software developed for DatrixOne compliance management.

---

**Last Updated**: January 2025  
**Version**: 1.0.0  
**Status**: Active Development
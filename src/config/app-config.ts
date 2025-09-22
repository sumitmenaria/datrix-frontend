// Application Configuration
// AWS Amplify Configuration for SPA

export const AppConfig = {
  // AWS Amplify Auth Configuration
  amplify: {
    Auth: {
      Cognito: {
        userPoolId: 'me-central-1_jfZ6VBR1I',
        userPoolClientId: 'gc5f4mle2515nqpqlvnlhpd0k',
        region: 'me-central-1',
        // No client secret needed for SPA (following AWS best practices)
        signUpVerificationMethod: 'code', // 'code' | 'link'
        loginWith: {
          email: true,
          username: true,
        },
        passwordFormat: {
          minLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialCharacters: true,
        },
        userAttributes: {
          email: {
            required: true,
          },
          name: {
            required: false,
          },
          'custom:department': {
            required: false,
          },
        },
      },
    },
  },

  // API Configuration - Microservices Architecture
  // Each service has its own API Gateway endpoint
  api: {
    // Policy Management Service
    policy: 'https://fmjcbyl26k.execute-api.us-west-2.amazonaws.com/Prod',
    
    // People/User Management Service
    users: 'https://yq9mrwns80.execute-api.me-central-1.amazonaws.com/prod',
    
    // Audit Management Service
    audit: 'https://b71fh4z288.execute-api.me-central-1.amazonaws.com/prod',
    
    // Assessment Service
    assessment: 'https://brkepehdx3.execute-api.me-central-1.amazonaws.com/prod',
    
    // Vulnerability Management Service
    vulnerability: 'https://28xfdt1d0b.execute-api.me-central-1.amazonaws.com/prod',
    
    // Vulnerability Scanning Service
    scanning: 'https://36xpidz4oh.execute-api.me-central-1.amazonaws.com/prod',
    
    // Training Data Service
    training: 'https://o16swiekjj.execute-api.me-central-1.amazonaws.com/prod',
    
    // Training Enrollment Service
    enrollment: 'https://ttj1grk9gf.execute-api.me-central-1.amazonaws.com/prod',
  },

  // App Settings
  app: {
    name: 'GRC Platform',
    version: '1.0.0',
    environment: 'production', // development | staging | production
  },
} as const;

// Helper function to check if configuration is properly set
export const isConfigurationValid = () => {
  const { amplify, api } = AppConfig;
  
  return (
    amplify.Auth.Cognito.userPoolId !== 'us-east-1_XXXXXXXXX' &&
    amplify.Auth.Cognito.userPoolClientId !== 'your-client-id-here' &&
    api.policy !== 'https://your-api-gateway-url.com/api/v1'
  );
};

// Helper to get configuration status
export const getConfigurationStatus = () => {
  const isValid = isConfigurationValid();
  
  return {
    isValid,
    message: isValid 
      ? 'Amplify configuration is properly set' 
      : 'Please update the configuration in /config/app-config.ts with your actual service details',
    needsUpdate: [
      ...(AppConfig.amplify.Auth.Cognito.userPoolId === 'us-east-1_XXXXXXXXX' ? ['Cognito User Pool ID'] : []),
      ...(AppConfig.amplify.Auth.Cognito.userPoolClientId === 'your-client-id-here' ? ['Cognito Client ID'] : []),
      ...(AppConfig.api.policy === 'https://your-api-gateway-url.com/api/v1' ? ['API Base URL'] : []),
    ],
  };
};
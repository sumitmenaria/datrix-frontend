// AWS Cognito Authentication Service
// Configured for your Cognito User Pool

import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { cognitoConfig } from '../config/cognito';

// Initialize Cognito User Pool
const userPool = new CognitoUserPool({
  UserPoolId: cognitoConfig.userPoolId,
  ClientId: cognitoConfig.userPoolWebClientId
});

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  organizationId?: string;
  organizationName?: string;
  department?: string;
  accessToken: string;
  refreshToken?: string;
}

export type AuthState = 
  | 'loading'
  | 'signedOut'
  | 'signIn'
  | 'signUp'
  | 'confirmSignUp'
  | 'confirmSignIn'
  | 'resetPassword'
  | 'confirmResetPassword'
  | 'signedIn'
  | 'error';

interface SignInParams {
  username: string;
  password: string;
}

interface SignUpParams {
  username: string;
  password: string;
  email: string;
  name?: string;
  department?: string;
}

interface AuthResult {
  success: boolean;
  error?: string;
  user?: AuthUser;
  challengeName?: string;
  destination?: string;
}

export const Auth = {
  async getCurrentUser(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      const cognitoUser = userPool.getCurrentUser();
      
      if (!cognitoUser) {
        resolve(null);
        return;
      }

      cognitoUser.getSession((err: any, session: any) => {
        if (err || !session.isValid()) {
          resolve(null);
          return;
        }

        cognitoUser.getUserAttributes((err: any, attributes: any) => {
          if (err) {
            resolve(null);
            return;
          }

          const userAttributes: any = {};
          attributes.forEach((attr: any) => {
            userAttributes[attr.getName()] = attr.getValue();
          });

          resolve({
            id: cognitoUser.getUsername(),
            username: cognitoUser.getUsername(),
            email: userAttributes.email || '',
            name: userAttributes.name || `${userAttributes['custom:FirstName'] || ''} ${userAttributes['custom:LastName'] || ''}`.trim(),
            firstName: userAttributes['custom:FirstName'] || '',
            lastName: userAttributes['custom:LastName'] || '',
            role: userAttributes['custom:Role'] || '',
            organizationId: userAttributes['custom:organization_ID'] || '',
            organizationName: userAttributes['custom:Organization_Name'] || '',
            department: userAttributes['custom:department'] || '',
            accessToken: session.getAccessToken().getJwtToken(),
            refreshToken: session.getRefreshToken().getToken()
          });
        });
      });
    });
  },

  async signIn({ username, password }: SignInParams): Promise<AuthResult> {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
      });

      // No SECRET_HASH needed for this app client

      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          cognitoUser.getUserAttributes((err, attributes) => {
            if (err) {
              resolve({ success: false, error: err.message });
              return;
            }

            const userAttributes: any = {};
            attributes?.forEach((attr) => {
              userAttributes[attr.getName()] = attr.getValue();
            });

            resolve({
              success: true,
              user: {
                id: cognitoUser.getUsername(),
                username: cognitoUser.getUsername(),
                email: userAttributes.email || '',
                name: userAttributes.name || `${userAttributes['custom:FirstName'] || ''} ${userAttributes['custom:LastName'] || ''}`.trim(),
                firstName: userAttributes['custom:FirstName'] || '',
                lastName: userAttributes['custom:LastName'] || '',
                role: userAttributes['custom:Role'] || '',
                organizationId: userAttributes['custom:organization_ID'] || '',
                organizationName: userAttributes['custom:Organization_Name'] || '',
                department: userAttributes['custom:department'] || '',
                accessToken: session.getAccessToken().getJwtToken(),
                refreshToken: session.getRefreshToken().getToken()
              }
            });
          });
        },
        onFailure: (err) => {
          resolve({ success: false, error: err.message });
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          // Store the cognitoUser for completing the challenge
          (window as any).cognitoUserForChallenge = cognitoUser;
          resolve({ 
            success: false, 
            challengeName: 'NEW_PASSWORD_REQUIRED',
            error: 'New password required' 
          });
        }
      });
    });
  },

  async confirmSignIn(newPassword: string): Promise<AuthResult> {
    return new Promise((resolve) => {
      const cognitoUser = (window as any).cognitoUserForChallenge;
      
      if (!cognitoUser) {
        resolve({ success: false, error: 'No challenge session found' });
        return;
      }

      cognitoUser.completeNewPasswordChallenge(newPassword, {}, {
        onSuccess: (session: any) => {
          cognitoUser.getUserAttributes((err: any, attributes: any) => {
            if (err) {
              resolve({ success: false, error: err.message });
              return;
            }

            const userAttributes: any = {};
            attributes?.forEach((attr: any) => {
              userAttributes[attr.getName()] = attr.getValue();
            });

            resolve({
              success: true,
              user: {
                id: cognitoUser.getUsername(),
                username: cognitoUser.getUsername(),
                email: userAttributes.email || '',
                name: userAttributes.name || `${userAttributes['custom:FirstName'] || ''} ${userAttributes['custom:LastName'] || ''}`.trim(),
                firstName: userAttributes['custom:FirstName'] || '',
                lastName: userAttributes['custom:LastName'] || '',
                role: userAttributes['custom:Role'] || '',
                organizationId: userAttributes['custom:organization_ID'] || '',
                organizationName: userAttributes['custom:Organization_Name'] || '',
                department: userAttributes['custom:department'] || '',
                accessToken: session.getAccessToken().getJwtToken(),
                refreshToken: session.getRefreshToken().getToken()
              }
            });
          });
        },
        onFailure: (err: any) => {
          resolve({ success: false, error: err.message });
        }
      });
    });
  },

  async signUp({ username, password, email, name, department }: SignUpParams): Promise<AuthResult> {
    return new Promise((resolve) => {
      const attributes = [
        new CognitoUserAttribute({ Name: 'email', Value: email })
      ];
      
      if (name) {
        attributes.push(new CognitoUserAttribute({ Name: 'name', Value: name }));
      }
      
      if (department) {
        attributes.push(new CognitoUserAttribute({ Name: 'custom:department', Value: department }));
      }

      const validationData = [{
        Name: 'SECRET_HASH',
        Value: generateSecretHash(username)
      }];
      
      userPool.signUp(username, password, attributes, validationData, (err, result) => {
        if (err) {
          resolve({ success: false, error: err.message });
          return;
        }
        resolve({ success: true });
      });
    });
  },

  async confirmSignUp(username: string, code: string): Promise<AuthResult> {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
      });

      cognitoUser.confirmRegistration(code, true, (err) => {
        if (err) {
          resolve({ success: false, error: err.message });
          return;
        }
        resolve({ success: true });
      });
    });
  },

  async forgotPassword(username: string): Promise<AuthResult> {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
      });

      cognitoUser.forgotPassword({
        onSuccess: () => {
          resolve({ success: true });
        },
        onFailure: (err) => {
          resolve({ success: false, error: err.message });
        },
        inputVerificationCode: () => {
          resolve({ success: true, destination: 'Email' });
        }
      });
    });
  },

  async confirmForgotPassword(username: string, code: string, newPassword: string): Promise<AuthResult> {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
      });

      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => {
          resolve({ success: true });
        },
        onFailure: (err) => {
          resolve({ success: false, error: err.message });
        }
      });
    });
  },

  async updatePassword(oldPassword: string, newPassword: string): Promise<AuthResult> {
    return new Promise((resolve) => {
      const cognitoUser = userPool.getCurrentUser();
      
      if (!cognitoUser) {
        resolve({ success: false, error: 'No user logged in' });
        return;
      }

      cognitoUser.getSession((err: any, session: any) => {
        if (err || !session.isValid()) {
          resolve({ success: false, error: 'Invalid session' });
          return;
        }

        cognitoUser.changePassword(oldPassword, newPassword, (err) => {
          if (err) {
            resolve({ success: false, error: err.message });
            return;
          }
          resolve({ success: true });
        });
      });
    });
  },

  async signOut(): Promise<void> {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  },

  async resendConfirmationCode(username: string): Promise<AuthResult> {
    return new Promise((resolve) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: userPool
      });

      cognitoUser.resendConfirmationCode((err) => {
        if (err) {
          resolve({ success: false, error: err.message });
          return;
        }
        resolve({ success: true });
      });
    });
  }
};
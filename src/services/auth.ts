import { 
  CognitoUserPool, 
  CognitoUser, 
  AuthenticationDetails,
  CognitoUserSession,
  ISignUpResult,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';
import { AppConfig } from '../config/app-config';

// Helper function to generate SECRET_HASH required when using client secret
async function generateSecretHash(username: string): Promise<string> {
  const clientSecret = AppConfig.cognito.clientSecret;
  const clientId = AppConfig.cognito.userPoolWebClientId;
  
  if (!clientSecret) {
    return '';
  }

  // Use Web Crypto API for HMAC-SHA256
  const encoder = new TextEncoder();
  const keyData = encoder.encode(clientSecret);
  const messageData = encoder.encode(username + clientId);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
  
  return hashBase64;
}

const userPool = new CognitoUserPool({
  UserPoolId: AppConfig.cognito.userPoolId,
  ClientId: AppConfig.cognito.userPoolWebClientId,
});

export interface AuthUser {
  username: string;
  email: string;
  name?: string;
  role?: string;
  department?: string;
  accessToken: string;
  idToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  email: string;
  name?: string;
  department?: string;
}

export class AuthService {
  // Login user
  static async login(credentials: LoginCredentials): Promise<AuthUser> {
    return new Promise(async (resolve, reject) => {
      try {
        const secretHash = await generateSecretHash(credentials.username);
        
        const authenticationData: any = {
          Username: credentials.username,
          Password: credentials.password,
        };

        // Add SECRET_HASH if client secret is configured
        if (secretHash) {
          authenticationData.SECRET_HASH = secretHash;
        }

        const authenticationDetails = new AuthenticationDetails(authenticationData);
        
        const userData = {
          Username: credentials.username,
          Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: (session: CognitoUserSession) => {
            const accessToken = session.getAccessToken().getJwtToken();
            const idToken = session.getIdToken().getJwtToken();
            const refreshToken = session.getRefreshToken().getToken();
            
            // Get user attributes
            cognitoUser.getUserAttributes((err, attributes) => {
              if (err) {
                reject(new Error(`Failed to get user attributes: ${err.message}`));
                return;
              }

              const userAttributes: { [key: string]: string } = {};
              attributes?.forEach(attr => {
                userAttributes[attr.getName()] = attr.getValue();
              });

              const user: AuthUser = {
                username: credentials.username,
                email: userAttributes['email'] || '',
                name: userAttributes['name'] || userAttributes['given_name'] || '',
                role: userAttributes['custom:role'] || 'user',
                department: userAttributes['custom:department'] || '',
                accessToken,
                idToken,
                refreshToken,
              };

              resolve(user);
            });
          },
          onFailure: (err) => {
            reject(new Error(err.message || 'Login failed'));
          },
          newPasswordRequired: (userAttributes, requiredAttributes) => {
            // Handle new password required scenario
            reject(new Error('New password required. Please contact administrator.'));
          },
          mfaRequired: (challengeName, challengeParameters) => {
            // Handle MFA if enabled
            reject(new Error('MFA not implemented in this demo'));
          }
        });
      } catch (error) {
        reject(new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });
  }

  // Sign up new user
  static async signup(credentials: SignupCredentials): Promise<ISignUpResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const secretHash = await generateSecretHash(credentials.username);
        
        const attributeList: CognitoUserAttribute[] = [
          new CognitoUserAttribute({
            Name: 'email',
            Value: credentials.email,
          }),
        ];

        if (credentials.name) {
          attributeList.push(new CognitoUserAttribute({
            Name: 'name',
            Value: credentials.name,
          }));
        }

        if (credentials.department) {
          attributeList.push(new CognitoUserAttribute({
            Name: 'custom:department',
            Value: credentials.department,
          }));
        }

        // Add SECRET_HASH to the validation data if client secret is configured
        const validationData = secretHash ? [
          new CognitoUserAttribute({
            Name: 'SECRET_HASH',
            Value: secretHash,
          })
        ] : [];

        userPool.signUp(
          credentials.username,
          credentials.password,
          attributeList,
          validationData,
          (err, result) => {
            if (err) {
              reject(new Error(err.message || 'Signup failed'));
              return;
            }
            resolve(result!);
          }
        );
      } catch (error) {
        reject(new Error(`Signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });
  }

  // Confirm signup with verification code
  static async confirmSignup(username: string, confirmationCode: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const secretHash = await generateSecretHash(username);
        
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool,
        });

        // If we have a client secret, we need to pass the SECRET_HASH
        if (secretHash) {
          // For confirmRegistration, we need to set the secretHash on the user object
          (cognitoUser as any).secretHash = secretHash;
        }

        cognitoUser.confirmRegistration(confirmationCode, true, (err) => {
          if (err) {
            reject(new Error(err.message || 'Confirmation failed'));
            return;
          }
          resolve();
        });
      } catch (error) {
        reject(new Error(`Confirmation failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });
  }

  // Get current authenticated user
  static async getCurrentUser(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      const cognitoUser = userPool.getCurrentUser();
      
      if (!cognitoUser) {
        resolve(null);
        return;
      }

      cognitoUser.getSession((err: any, session: CognitoUserSession) => {
        if (err || !session.isValid()) {
          resolve(null);
          return;
        }

        const accessToken = session.getAccessToken().getJwtToken();
        const idToken = session.getIdToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();

        cognitoUser.getUserAttributes((err, attributes) => {
          if (err) {
            resolve(null);
            return;
          }

          const userAttributes: { [key: string]: string } = {};
          attributes?.forEach(attr => {
            userAttributes[attr.getName()] = attr.getValue();
          });

          const user: AuthUser = {
            username: cognitoUser.getUsername(),
            email: userAttributes['email'] || '',
            name: userAttributes['name'] || userAttributes['given_name'] || '',
            role: userAttributes['custom:role'] || 'user',
            department: userAttributes['custom:department'] || '',
            accessToken,
            idToken,
            refreshToken,
          };

          resolve(user);
        });
      });
    });
  }

  // Logout user
  static async logout(): Promise<void> {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
  }

  // Refresh token
  static async refreshSession(): Promise<AuthUser | null> {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      
      if (!cognitoUser) {
        resolve(null);
        return;
      }

      cognitoUser.getSession((err: any, session: CognitoUserSession) => {
        if (err) {
          reject(err);
          return;
        }

        if (session.isValid()) {
          // Session is still valid, return current user
          this.getCurrentUser().then(resolve).catch(reject);
        } else {
          // Try to refresh the session
          const refreshToken = session.getRefreshToken();
          cognitoUser.refreshSession(refreshToken, (err, newSession) => {
            if (err) {
              reject(err);
              return;
            }
            // Return updated user with new tokens
            this.getCurrentUser().then(resolve).catch(reject);
          });
        }
      });
    });
  }

  // Reset password
  static async initiatePasswordReset(username: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const secretHash = await generateSecretHash(username);
        
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool,
        });

        // If we have a client secret, we need to pass the SECRET_HASH
        if (secretHash) {
          (cognitoUser as any).secretHash = secretHash;
        }

        cognitoUser.forgotPassword({
          onSuccess: () => {
            resolve();
          },
          onFailure: (err) => {
            reject(new Error(err.message || 'Password reset failed'));
          },
        });
      } catch (error) {
        reject(new Error(`Password reset failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });
  }

  // Confirm password reset
  static async confirmPasswordReset(
    username: string, 
    verificationCode: string, 
    newPassword: string
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const secretHash = await generateSecretHash(username);
        
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool,
        });

        // If we have a client secret, we need to pass the SECRET_HASH
        if (secretHash) {
          (cognitoUser as any).secretHash = secretHash;
        }

        cognitoUser.confirmPassword(verificationCode, newPassword, {
          onSuccess: () => {
            resolve();
          },
          onFailure: (err) => {
            reject(new Error(err.message || 'Password confirmation failed'));
          },
        });
      } catch (error) {
        reject(new Error(`Password confirmation failed: ${error instanceof Error ? error.message : 'Unknown error'}`));
      }
    });
  }
}
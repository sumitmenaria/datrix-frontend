import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Auth, type AuthUser, type AuthState } from '../services/amplify-auth';
import { apiService } from '../services/api';

interface AuthContextType {
  user: AuthUser | null;
  authState: AuthState;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<{ success: boolean; error?: string; requiresChallenge?: boolean; challengeType?: string }>;
  confirmSignIn: (challengeResponse: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (username: string, password: string, email: string, name?: string, department?: string) => Promise<{ success: boolean; error?: string }>;
  confirmSignUp: (username: string, code: string) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (username: string) => Promise<{ success: boolean; error?: string; destination?: string }>;
  confirmForgotPassword: (username: string, code: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resendConfirmationCode: (username: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Set up auth token in API service when user changes
  useEffect(() => {
    if (user?.accessToken) {
      apiService.setAuthToken(user.accessToken);
    } else {
      apiService.setAuthToken(null);
    }
  }, [user]);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const currentUser = await Auth.getCurrentUser();
      
      if (currentUser) {
        setUser(currentUser);
        setAuthState('signedIn');
      } else {
        setUser(null);
        setAuthState('signedOut');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setAuthState('signedOut');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      console.log('AuthContext signIn called with:', username);
      setIsLoading(true);
      setAuthState('signIn');
      
      const result = await Auth.signIn({ username, password });
      console.log('Auth.signIn result:', result);
      
      if (result.success && result.user) {
        console.log('Setting user and signedIn state:', result.user);
        setUser(result.user);
        setAuthState('signedIn');
        return { success: true };
      } else if (result.challengeName) {
        console.log('Challenge required:', result.challengeName);
        // Challenge required (MFA, new password, etc.)
        setAuthState('confirmSignIn');
        return { 
          success: false, 
          requiresChallenge: true, 
          challengeType: result.challengeName,
          error: `Challenge required: ${result.challengeName}` 
        };
      } else {
        console.log('Sign in failed, staying signedOut');
        setAuthState('signedOut');
        return { success: false, error: result.error || 'Sign in failed' };
      }
    } catch (error: any) {
      console.error('AuthContext signIn error:', error);
      setAuthState('error');
      return { success: false, error: error.message || 'Sign in failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSignIn = async (challengeResponse: string) => {
    try {
      setIsLoading(true);
      
      const result = await Auth.confirmSignIn(challengeResponse);
      
      if (result.success && result.user) {
        setUser(result.user);
        setAuthState('signedIn');
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Challenge confirmation failed' };
      }
    } catch (error: any) {
      setAuthState('error');
      return { success: false, error: error.message || 'Challenge confirmation failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (username: string, password: string, email: string, name?: string, department?: string) => {
    try {
      setIsLoading(true);
      setAuthState('signUp');
      
      const result = await Auth.signUp({ username, password, email, name, department });
      
      if (result.success) {
        setAuthState('confirmSignUp');
        return { success: true };
      } else {
        setAuthState('signedOut');
        return { success: false, error: result.error || 'Sign up failed' };
      }
    } catch (error: any) {
      setAuthState('error');
      return { success: false, error: error.message || 'Sign up failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const confirmSignUp = async (username: string, code: string) => {
    try {
      setIsLoading(true);
      
      const result = await Auth.confirmSignUp(username, code);
      
      if (result.success) {
        setAuthState('signedOut'); // User can now sign in
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Confirmation failed' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Confirmation failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (username: string) => {
    try {
      setIsLoading(true);
      setAuthState('resetPassword');
      
      const result = await Auth.forgotPassword(username);
      
      if (result.success) {
        setAuthState('confirmResetPassword');
        return { success: true, destination: result.destination };
      } else {
        setAuthState('signedOut');
        return { success: false, error: result.error || 'Password reset failed' };
      }
    } catch (error: any) {
      setAuthState('error');
      return { success: false, error: error.message || 'Password reset failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const confirmForgotPassword = async (username: string, code: string, newPassword: string) => {
    try {
      setIsLoading(true);
      
      const result = await Auth.confirmForgotPassword(username, code, newPassword);
      
      if (result.success) {
        setAuthState('signedOut'); // User can now sign in with new password
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Password reset confirmation failed' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Password reset confirmation failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      setIsLoading(true);
      
      const result = await Auth.updatePassword(oldPassword, newPassword);
      
      if (result.success) {
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Password update failed' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Password update failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await Auth.signOut();
      setUser(null);
      setAuthState('signedOut');
    } catch (error) {
      console.error('Sign out error:', error);
      // Force local logout even if server logout fails
      setUser(null);
      setAuthState('signedOut');
    } finally {
      setIsLoading(false);
    }
  };

  const resendConfirmationCode = async (username: string) => {
    try {
      setIsLoading(true);
      
      const result = await Auth.resendConfirmationCode(username);
      
      if (result.success) {
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Failed to resend code' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to resend code' };
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    authState,
    isLoading,
    signIn,
    confirmSignIn,
    signUp,
    confirmSignUp,
    forgotPassword,
    confirmForgotPassword,
    updatePassword,
    signOut,
    resendConfirmationCode,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
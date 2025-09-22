import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginForm } from './LoginForm';
import { LoadingScreen } from './LoadingScreen';
import { AuthDebugger } from './AuthDebugger';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, authState, isLoading } = useAuth();

  // Show loading screen while checking authentication
  if (isLoading || authState === 'loading') {
    return <LoadingScreen />;
  }

  // Show debug info if there's an error state
  if (authState === 'error') {
    return <AuthDebugger />;
  }

  // Show login form if user is not authenticated
  if (!user || authState === 'signedOut') {
    return <LoginForm />;
  }

  // User is authenticated, show protected content
  return <>{children}</>;
}
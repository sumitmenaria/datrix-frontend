import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AppConfig } from '../../config/app-config';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

export function AuthDebugger() {
  const { user, authState, isLoading } = useAuth();
  const [debugInfo, setDebugInfo] = useState({
    amplifyConfigured: false,
    cognitoConfig: null as any,
    errors: [] as string[],
  });

  useEffect(() => {
    try {
      // Check if Amplify is properly configured
      const config = AppConfig.amplify;
      setDebugInfo({
        amplifyConfigured: !!config.Auth.Cognito.userPoolId,
        cognitoConfig: config.Auth.Cognito,
        errors: [],
      });
    } catch (error: any) {
      setDebugInfo(prev => ({
        ...prev,
        errors: [...prev.errors, error.message],
      }));
    }
  }, []);

  const testSignIn = async () => {
    try {
      // Test with demo credentials
      console.log('Testing sign in with demo credentials...');
      // This will show in console what's happening
    } catch (error) {
      console.error('Sign in test failed:', error);
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Authentication Debug Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Auth State */}
          <div>
            <h3 className="font-medium mb-2">Current Auth State</h3>
            <Badge variant={authState === 'signedIn' ? 'default' : 'secondary'}>
              {authState}
            </Badge>
            {isLoading && <Badge variant="outline" className="ml-2">Loading...</Badge>}
          </div>

          {/* User Info */}
          <div>
            <h3 className="font-medium mb-2">User Information</h3>
            <pre className="bg-muted p-2 rounded text-sm overflow-auto">
              {user ? JSON.stringify(user, null, 2) : 'No user data'}
            </pre>
          </div>

          {/* Configuration */}
          <div>
            <h3 className="font-medium mb-2">Amplify Configuration</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant={debugInfo.amplifyConfigured ? 'default' : 'destructive'}>
                  {debugInfo.amplifyConfigured ? '✅ Configured' : '❌ Not Configured'}
                </Badge>
                <span className="text-sm">Amplify Auth</span>
              </div>
              
              {debugInfo.cognitoConfig && (
                <div className="bg-muted p-2 rounded text-sm">
                  <p><strong>User Pool ID:</strong> {debugInfo.cognitoConfig.userPoolId}</p>
                  <p><strong>Client ID:</strong> {debugInfo.cognitoConfig.userPoolClientId}</p>
                  <p><strong>Region:</strong> {debugInfo.cognitoConfig.region}</p>
                </div>
              )}
            </div>
          </div>

          {/* Errors */}
          {debugInfo.errors.length > 0 && (
            <div>
              <h3 className="font-medium mb-2 text-destructive">Errors</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-destructive">
                {debugInfo.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Console Check */}
          <div>
            <h3 className="font-medium mb-2">Check Browser Console</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Open your browser's Developer Tools (F12) and check the Console for any error messages.
            </p>
            <Button onClick={testSignIn} variant="outline" size="sm">
              Test Sign In (Check Console)
            </Button>
          </div>

          {/* Installation Check */}
          <div>
            <h3 className="font-medium mb-2">Required Dependencies</h3>
            <div className="bg-muted p-3 rounded text-sm font-mono">
              <p>npm install aws-amplify</p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Make sure you've installed the aws-amplify package.
            </p>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="font-medium mb-2">Troubleshooting Steps</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Install dependencies: <code>npm install aws-amplify</code></li>
              <li>Check Cognito App Client has no client secret (SPA mode)</li>
              <li>Verify authentication flows are enabled in Cognito</li>
              <li>Check browser console for JavaScript errors</li>
              <li>Try creating a test user in Cognito</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
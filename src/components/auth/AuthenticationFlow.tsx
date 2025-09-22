import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Eye, EyeOff, Loader2, Shield, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

interface AuthenticationFlowProps {
  onSuccess?: () => void;
}

export function AuthenticationFlow({ onSuccess }: AuthenticationFlowProps) {
  const { 
    signIn, 
    confirmSignIn, 
    signUp, 
    confirmSignUp, 
    forgotPassword, 
    confirmForgotPassword,
    updatePassword,
    resendConfirmationCode,
    authState,
    isLoading 
  } = useAuth();

  // Form states

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [challengeType, setChallengeType] = useState('');
  
  // Animated background particles
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
    }));
    setParticles(newParticles);
  }, []);
  
  // Form data
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    department: '',
    confirmationCode: '',
    newPassword: '',
    oldPassword: '',
    challengeResponse: '',
  });

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    clearMessages();
  };

  // Sign In Flow
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    console.log('Attempting sign in with:', credentials.username);
    const result = await signIn(credentials.username, credentials.password);
    console.log('Sign in result:', result);
    
    if (result.success) {
      console.log('Sign in successful!');
      setSuccess('Successfully signed in!');
      onSuccess?.();
    } else if (result.requiresChallenge) {
      console.log('Challenge required:', result.challengeType);
      setChallengeType(result.challengeType || '');
      // Don't show success message for challenge, just set the challenge type
    } else {
      console.log('Sign in failed:', result.error);
      setError(result.error || 'Sign in failed');
    }
  };

  // Confirm Sign In (MFA/Challenge)
  const handleConfirmSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const result = await confirmSignIn(credentials.challengeResponse);
    
    if (result.success) {
      setSuccess('Successfully authenticated!');
      onSuccess?.();
    } else {
      setError(result.error || 'Challenge confirmation failed');
    }
  };

  // Sign Up Flow
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const result = await signUp(
      credentials.username,
      credentials.password,
      credentials.email,
      credentials.name || undefined,
      credentials.department || undefined
    );
    
    if (result.success) {
      setSuccess('Account created! Please check your email for verification code.');
    } else {
      setError(result.error || 'Sign up failed');
    }
  };

  // Confirm Sign Up
  const handleConfirmSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const result = await confirmSignUp(credentials.username, credentials.confirmationCode);
    
    if (result.success) {
      setSuccess('Account verified! You can now sign in.');
      setActiveTab('signin');
    } else {
      setError(result.error || 'Verification failed');
    }
  };

  // Forgot Password Flow
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const result = await forgotPassword(credentials.username);
    
    if (result.success) {
      setSuccess(`Password reset code sent to ${result.destination || 'your email'}`);
    } else {
      setError(result.error || 'Password reset failed');
    }
  };

  // Confirm Forgot Password
  const handleConfirmForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const result = await confirmForgotPassword(
      credentials.username,
      credentials.confirmationCode,
      credentials.newPassword
    );
    
    if (result.success) {
      setSuccess('Password reset successfully! You can now sign in.');
      setActiveTab('signin');
    } else {
      setError(result.error || 'Password reset confirmation failed');
    }
  };

  // Resend Confirmation Code
  const handleResendCode = async () => {
    clearMessages();
    
    const result = await resendConfirmationCode(credentials.username);
    
    if (result.success) {
      toast.success('Verification code resent!');
    } else {
      toast.error(result.error || 'Failed to resend code');
    }
  };

  // Render challenge form for MFA/New Password Required
  if (challengeType === 'NEW_PASSWORD_REQUIRED' || authState === 'confirmSignIn') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass">
          <CardHeader className="text-center">
            <CardTitle className="gradient-primary bg-clip-text text-transparent">
              Authentication Challenge
            </CardTitle>
            <CardDescription>
              {challengeType === 'NEW_PASSWORD_REQUIRED' 
                ? 'You must set a new password to continue'
                : challengeType === 'SMS_MFA' 
                ? 'Enter the code sent to your phone'
                : challengeType === 'SOFTWARE_TOKEN_MFA'
                ? 'Enter the code from your authenticator app'
                : 'Complete the authentication challenge'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConfirmSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="challengeResponse">New Password</Label>
                <Input
                  id="challengeResponse"
                  type="password"
                  value={credentials.challengeResponse}
                  onChange={(e) => handleInputChange('challengeResponse', e.target.value)}
                  placeholder="Enter your new password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full gradient-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Confirm'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white/40 dark:bg-white/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
          <div className="max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">DatrixOne</h1>
              </div>
            </div>

            {/* Hero Text */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Secure Your
                <br />
                Digital Future
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Advanced compliance management platform designed for modern enterprises.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                "AI-Powered Risk Assessment",
                "Real-time Compliance Monitoring", 
                "Advanced Policy Management",
                "Integrated Training Platform"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            <Card className="glass border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-base">
                  Sign in to your DatrixOne account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-username">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-username"
                        type="email"
                        value={credentials.username}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        placeholder="Enter your email"
                        className="pl-10 glass border-0"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 glass border-0"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </form>

                
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Need help? Contact your administrator
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
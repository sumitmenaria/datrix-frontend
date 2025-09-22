import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import {
  Shield,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
  User,
  Building2,
  ArrowRight,
  CheckCircle,
  Globe,
  Zap,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";

interface FancyLoginScreenProps {
  onLogin: () => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

export function FancyLoginScreen({
  onLogin,
  isDark,
  onThemeToggle,
}: FancyLoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("signin");

  // Animated background particles
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
    }));
    setParticles(newParticles);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    onLogin();
  };

  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: Shield, value: "99.9%", label: "Uptime" },
    { icon: Award, value: "SOC 2", label: "Compliant" },
    { icon: TrendingUp, value: "500+", label: "Organizations" },
  ];

  const features = [
    "AI-Powered Risk Assessment",
    "Real-time Compliance Monitoring",
    "Advanced Policy Management",
    "Integrated Training Platform",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-indigo-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000" />

        {/* Floating particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-white/20 dark:bg-white/10 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-3 glass rounded-full px-4 py-2"
        >
          <span className="text-sm">🌞</span>
          <Switch
            checked={isDark}
            onCheckedChange={onThemeToggle}
          />
          <span className="text-sm">🌙</span>
        </motion.div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Panel - Branding & Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12"
        >
          <div className="max-w-md">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="relative">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  GRC Platform
                </h1>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  <span>AI-Powered Governance</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Secure Your
                <br />
                Digital Future
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Advanced governance, risk management, and
                compliance platform designed for modern
                enterprises.
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 mb-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    className="glass rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <div className="text-xl font-bold text-primary">
                      {stat.value}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Panel - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex items-center justify-center p-6 lg:p-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full max-w-md"
          >
            <Card className="glass border-0 shadow-2xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-base">
                  Sign in to your GRC Platform account
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger
                      value="signin"
                      className="relative"
                    >
                      Sign In
                      {activeTab === "signin" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary/10 rounded-sm"
                        />
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="relative"
                    >
                      Sign Up
                      {activeTab === "signup" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary/10 rounded-sm"
                        />
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="signin"
                    className="space-y-4"
                  >
                    <form
                      onSubmit={handleLogin}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                              setEmail(e.target.value)
                            }
                            className="pl-10 glass border-0"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type={
                              showPassword ? "text" : "password"
                            }
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                              setPassword(e.target.value)
                            }
                            className="pl-10 pr-10 glass border-0"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword(!showPassword)
                            }
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

                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                          />
                          <span>Remember me</span>
                        </label>
                        <Button
                          variant="link"
                          className="text-sm p-0 h-auto"
                        >
                          Forgot password?
                        </Button>
                      </div>

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
                  </TabsContent>

                  <TabsContent
                    value="signup"
                    className="space-y-4"
                  >
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">
                            First name
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            className="glass border-0"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">
                            Last name
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            className="glass border-0"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="company"
                            placeholder="Your company name"
                            className="pl-10 glass border-0"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signupEmail">
                          Email address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signupEmail"
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 glass border-0"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="signupPassword">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="signupPassword"
                            type="password"
                            placeholder="Create a password"
                            className="pl-10 glass border-0"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full gradient-primary text-white hover:opacity-90 transition-opacity"
                        onClick={(e) => {
                          e.preventDefault();
                          onLogin();
                        }}
                      >
                        <div className="flex items-center gap-2">
                          Create Account
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Separator className="my-4" />

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="glass border-0"
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="glass border-0"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      SSO
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-muted-foreground">
                    By signing in, you agree to our{" "}
                    <Button
                      variant="link"
                      className="text-xs p-0 h-auto underline"
                    >
                      Terms of Service
                    </Button>{" "}
                    and{" "}
                    <Button
                      variant="link"
                      className="text-xs p-0 h-auto underline"
                    >
                      Privacy Policy
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="mt-6 flex justify-center gap-4"
            >
              <Badge
                variant="outline"
                className="glass border-0"
              >
                <Shield className="h-3 w-3 mr-1" />
                SOC 2 Certified
              </Badge>
              <Badge
                variant="outline"
                className="glass border-0"
              >
                <Lock className="h-3 w-3 mr-1" />
                256-bit SSL
              </Badge>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
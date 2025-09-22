import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";
import { userApiService } from "../services/user-api";

export function SetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSetPassword = async () => {
    if (!email || !newPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      
      // Call the set-password endpoint
      const response = await fetch('https://jt9bq5vlvf.execute-api.me-central-1.amazonaws.com/Prod/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'setPassword',
          email,
          password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Password set successfully! You can now log in.");
        setEmail("");
        setNewPassword("");
      } else {
        toast.error(data.error || data.message || "Failed to set password");
      }
    } catch (error) {
      console.error("Error setting password:", error);
      toast.error("Failed to set password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Set Your Password</CardTitle>
          <CardDescription>
            Set a permanent password for your account to complete setup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-email@company.com"
            />
          </div>
          
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Must be at least 8 characters long
            </p>
          </div>
          
          <Button 
            onClick={handleSetPassword} 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Setting Password..." : "Set Password"}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              After setting your password, you can log in normally
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
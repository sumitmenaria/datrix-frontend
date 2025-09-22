import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { People } from "./organization/People";
import { userApiService, type ProcessedUser } from "../services/user-api";
import { testDatrixAPI } from "../services/user-api-test";
import { 
  Users, 
  Settings,
  UserPlus,
  Shield,
  Building2
} from "lucide-react";

export function Organization() {
  const [users, setUsers] = useState<ProcessedUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  const organizationId = "a7626014-c092-47b2-84a7-b8c8c3059526";

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const userData = await userApiService.fetchUsers(organizationId);
      setUsers(userData);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "CONFIRMED").length,
    pending: users.filter(u => u.status === "FORCE_CHANGE_PASSWORD").length,
    admins: users.filter(u => u.role === "Admin").length,
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Organization</h1>
          <p className="text-muted-foreground">
            Manage your organization settings and team members
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={async () => {
              console.log('🧪 Testing new Datrix API...');
              const result = await testDatrixAPI();
              alert(result ? '✅ API Test Passed!' : '❌ API Test Failed - Check console');
            }}
          >
            🧪 Test API
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Total organization members
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.active}</div>
            <p className="text-xs text-muted-foreground">
              {loading ? "Loading..." : `${Math.round((stats.active / stats.total) * 100)}% of total users`}
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting password change
            </p>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.admins}</div>
            <p className="text-xs text-muted-foreground">
              With admin privileges
            </p>
          </CardContent>
        </Card>
      </div>

      {/* People Management */}
      <People />
    </div>
  );
}
import { useState, useEffect } from "react";
import { SidebarProvider } from "./components/ui/sidebar";
import { ModernHeader } from "./components/ModernHeader";
import { ModernSidebar } from "./components/ModernSidebar";
import { Dashboard } from "./components/Dashboard";
import { Compliance } from "./components/Compliance";
import { PolicyManagement } from "./components/PolicyManagement";
import { RiskManagement } from "./components/RiskManagement";
import { Security } from "./components/Security";
import { Training } from "./components/Training";
import { Organization } from "./components/Organization";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";
import {
  LayoutDashboard,
  Shield,
  FileText,
  AlertTriangle,
  Lock,
  GraduationCap,
  Building2
} from "lucide-react";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    component: Dashboard,
  },
  {
    title: "Compliance",
    icon: Shield,
    component: Compliance,
  },
  {
    title: "Policy Management",
    icon: FileText,
    component: PolicyManagement,
  },
  {
    title: "Risk Management",
    icon: AlertTriangle,
    component: RiskManagement,
  },
  {
    title: "Security",
    icon: Lock,
    component: Security,
  },
  {
    title: "Training",
    icon: GraduationCap,
    component: Training,
  },
  {
    title: "Organization",
    icon: Building2,
    component: Organization,
  },
];

function GRCDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isDark, setIsDark] = useState(false);

  // Filter navigation items based on user role
  const getFilteredNavigationItems = () => {
    if (user?.role === 'Admin') {
      return navigationItems; // Admin sees all items
    } else {
      // Regular users don't see Organization
      return navigationItems.filter(item => item.title !== 'Organization');
    }
  };

  const filteredNavigationItems = getFilteredNavigationItems();

  // Initialize theme from system preference
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // Ensure activeTab is valid for current user role
  const validTabs = filteredNavigationItems.map(item => item.title);
  const currentTab = validTabs.includes(activeTab) ? activeTab : "Dashboard";
  
  const activeComponent = filteredNavigationItems.find(item => item.title === currentTab)?.component || Dashboard;
  const ActiveComponent = activeComponent;

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <ModernSidebar 
          activeTab={currentTab} 
          onTabChange={setActiveTab}
          navigationItems={filteredNavigationItems}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <ModernHeader 
            onThemeToggle={handleThemeToggle}
            isDark={isDark}
          />
          
          <main className="flex-1 overflow-auto">
            <div className="animate-fade-in">
              <ActiveComponent />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <GRCDashboard />
      </ProtectedRoute>
      <Toaster />
    </AuthProvider>
  );
}
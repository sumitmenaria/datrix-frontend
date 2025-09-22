import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "./ui/sidebar";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { 
  LayoutDashboard,
  Shield,
  FileText,
  AlertTriangle,
  Lock,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Activity
} from "lucide-react";

interface ModernSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  navigationItems: any[];
}

export function ModernSidebar({ activeTab, onTabChange, navigationItems }: ModernSidebarProps) {
  const [systemHealth] = useState({
    overall: 87,
    compliance: 92,
    security: 85,
    risks: 78
  });

  const getItemIcon = (title: string, IconComponent: any) => {
    const iconMap: Record<string, any> = {
      "Dashboard": LayoutDashboard,
      "Compliance": Shield,
      "Policy Management": FileText,
      "Risk Management": AlertTriangle,
      "Security": Lock,
      "Training": GraduationCap
    };
    
    return iconMap[title] || IconComponent;
  };

  const getItemBadge = (title: string) => {
    const badges: Record<string, { text: string; variant: "default" | "destructive" | "secondary" | "outline" }> = {
      "Risk Management": { text: "6", variant: "destructive" },
      "Compliance": { text: "NEW", variant: "secondary" },
      "Training": { text: "94%", variant: "outline" }
    };
    
    return badges[title];
  };

  return (
    <Sidebar className="glass border-r border-border/50">
      <SidebarHeader className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">DatrixOne</h2>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarMenu>
          {navigationItems.map((item) => {
            const badge = getItemBadge(item.title);
            const Icon = getItemIcon(item.title, item.icon);
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => onTabChange(item.title)}
                  isActive={activeTab === item.title}
                  className="group relative transition-all duration-200 hover:scale-[1.02] mb-1"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-all duration-200 ${
                        activeTab === item.title 
                          ? 'bg-primary text-primary-foreground shadow-lg' 
                          : 'bg-muted/50 group-hover:bg-muted'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {badge && (
                      <Badge variant={badge.variant} className="text-xs px-2 py-0">
                        {badge.text}
                      </Badge>
                    )}
                  </div>
                  {activeTab === item.title && (
                    <div className="absolute left-0 top-0 w-1 h-full bg-primary rounded-r-full animate-scale-in" />
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="space-y-4">
          {/* System Health */}
          <div className="p-4 rounded-xl glass">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-sm">System Health</h4>
              <Activity className="h-4 w-4 text-green-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Overall</span>
                <span className="font-medium">{systemHealth.overall}%</span>
              </div>
              <Progress 
                value={systemHealth.overall} 
                className="h-2" 
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <div className="text-center">
                <div className="text-green-600 font-medium">{systemHealth.compliance}%</div>
                <div className="text-muted-foreground">Compliance</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 font-medium">{systemHealth.security}%</div>
                <div className="text-muted-foreground">Security</div>
              </div>
              <div className="text-center">
                <div className="text-orange-600 font-medium">{systemHealth.risks}%</div>
                <div className="text-muted-foreground">Risk Mgmt</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <div>
                  <div className="text-sm font-medium text-green-600">+12%</div>
                  <div className="text-xs text-muted-foreground">This month</div>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-sm font-medium text-blue-600">4/5</div>
                  <div className="text-xs text-muted-foreground">Frameworks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
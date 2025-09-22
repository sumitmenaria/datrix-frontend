import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { 
  Search, 
  Bell, 
  Moon, 
  Sun, 
  Settings, 
  User, 
  LogOut,
  Command,
  Plus
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";

interface ModernHeaderProps {
  onThemeToggle: () => void;
  isDark: boolean;
}

export function ModernHeader({ onThemeToggle, isDark }: ModernHeaderProps) {
  const { user, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [notifications] = useState([
    { id: 1, title: "New compliance alert", time: "2m ago", unread: true },
    { id: 2, title: "Risk assessment completed", time: "1h ago", unread: true },
    { id: 3, title: "Training due reminder", time: "3h ago", unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserInitials = (name: string, username: string) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return username.slice(0, 2).toUpperCase();
  };

  return (
    <header className="glass border-b sticky top-0 z-50 w-full backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Search */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search your workspace... (⌘K)" 
              className="pl-10 bg-background/50 border-border/50 focus:bg-background/80 transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="inline-flex items-center rounded border bg-muted px-1.5 py-0.5 text-xs font-mono text-muted-foreground">
                <Command className="h-3 w-3" />K
              </kbd>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Actions */}
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium">Notifications</h4>
                  <p className="text-sm text-gray-500">{unreadCount} unread</p>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
                      <div className="flex items-start gap-3 w-full">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-400'}`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={onThemeToggle}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <Button 
              variant="ghost" 
              className="relative h-8 w-8 rounded-full"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.jpg" alt={user?.name || user?.username} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user ? getUserInitials(user.name || '', user.username) : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="font-medium">{user?.name || user?.username}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  {user?.role && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      {user.role}
                    </Badge>
                  )}
                </div>
                <div className="py-1">
                  <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <button 
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
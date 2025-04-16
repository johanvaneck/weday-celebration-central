
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar, 
  CheckSquare, 
  DollarSign, 
  Heart, 
  Home, 
  MessageSquare, 
  Settings, 
  Users 
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type NavItem = {
  label: string;
  icon: React.ElementType;
  href: string;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    label: "Guests",
    icon: Users,
    href: "/guests",
  },
  {
    label: "Tasks",
    icon: CheckSquare,
    href: "/tasks",
  },
  {
    label: "Vendors",
    icon: Heart,
    href: "/vendors",
  },
  {
    label: "Budget",
    icon: DollarSign,
    href: "/budget",
  },
  {
    label: "Timeline",
    icon: Calendar,
    href: "/timeline",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/messages",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  if (isMobile && collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-weday-primary text-white shadow-lg"
      >
        <Heart className="h-6 w-6" />
      </button>
    );
  }

  return (
    <Card className={cn(
      "fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-card p-4 shadow-lg transition-all duration-300",
      collapsed ? "w-20" : "w-64",
      isMobile && !collapsed ? "w-full" : "",
      isMobile && collapsed ? "hidden" : ""
    )}>
      <div className="flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-weday-primary" />
            <span className="text-xl font-semibold text-weday-primary">WeDay</span>
          </div>
        )}
        {collapsed && <Heart className="mx-auto h-6 w-6 text-weday-primary" />}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto", isMobile ? "block" : "hidden md:block")}
        >
          {collapsed ? (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 11L10 7.5L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4L6 7.5L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-weday-light/25 text-weday-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>
      
      {!collapsed && (
        <div className="mt-auto">
          <Card className="bg-weday-light/25 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-weday-primary p-2 text-white">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Wedding Date</p>
                <Button variant="link" className="h-auto p-0 text-xs text-weday-primary">
                  Set date
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}

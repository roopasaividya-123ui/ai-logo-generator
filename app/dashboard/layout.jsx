"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Heart, 
  CreditCard, 
  Settings, 
  LogOut, 
  Sparkles, 
  Coins, 
  User, 
  Menu, 
  X,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Create Logo", href: "/create", icon: PlusCircle },
  { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
  { name: "Billing & Credits", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { user, logout, setIsAuthModalOpen } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-foreground antialiased">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.svg" alt="Logo" width={140} height={35} />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground"
        >
          {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 space-y-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.svg" alt="Logo" width={160} height={40} priority />
          </Link>

          <nav className="space-y-1.5 pt-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md font-semibold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="p-4 m-4 rounded-2xl bg-muted/60 border border-border/60 space-y-3">
          {user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                <Image
                  src={user.avatar || "/coin.png"}
                  alt={user.name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover shrink-0 border border-border"
                />
                <div className="truncate">
                  <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                title="Log out"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors shrink-0"
              >
                <LogOut className="size-4" />
              </button>
            </div>
          ) : (
            <Button onClick={() => setIsAuthModalOpen(true)} className="w-full font-semibold size-sm">
              Sign In
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Top Header */}
        <header className="hidden md:flex items-center justify-between h-16 px-8 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              SaaS Workspace
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Credits Counter Badge */}
            <Link href="/dashboard/billing">
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold transition-all hover:bg-primary/20 cursor-pointer">
                <Coins className="size-4 text-amber-500" />
                <span>{user?.credits ?? 0} Credits</span>
                <span className="text-xs text-primary/70 font-normal ml-1">+ Top Up</span>
              </div>
            </Link>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />}
            </button>

            {/* User Profile Avatar / Sign In */}
            {user ? (
              <Link href="/dashboard/settings" className="flex items-center space-x-2">
                <Image
                  src={user.avatar || "/coin.png"}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="rounded-full border border-border"
                />
              </Link>
            ) : (
              <Button size="sm" onClick={() => setIsAuthModalOpen(true)}>
                Sign In
              </Button>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      <AuthModal />
    </div>
  );
}

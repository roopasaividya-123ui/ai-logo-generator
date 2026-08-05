"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { dbEngine } from "@/lib/db";
import { toast } from "sonner";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedUser = dbEngine.getUser();
    setUser(loadedUser);
    setIsLoading(false);
  }, []);

  const loginWithGoogle = useCallback(() => {
    const googleUser = {
      id: `usr_g_${Date.now()}`,
      name: "Google User",
      email: "user.google@gmail.com",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      plan: "Free Tier",
      credits: 10,
      createdAt: new Date().toISOString(),
    };
    dbEngine.setUser(googleUser);
    setUser(googleUser);
    setIsAuthModalOpen(false);
    toast.success("Successfully logged in with Google!");
  }, []);

  const loginWithEmail = useCallback((email, name = "SaaS Designer") => {
    const emailUser = {
      id: `usr_e_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      plan: "Free Tier",
      credits: 10,
      createdAt: new Date().toISOString(),
    };
    dbEngine.setUser(emailUser);
    setUser(emailUser);
    setIsAuthModalOpen(false);
    toast.success(`Welcome back, ${emailUser.name}!`);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("ai_logo_saas_user");
    setUser(null);
    toast.info("Logged out successfully.");
  }, []);

  const deductCredit = useCallback(() => {
    const success = dbEngine.deductCredit();
    if (success) {
      setUser((prev) => (prev ? { ...prev, credits: prev.credits - 1 } : null));
    }
    return success;
  }, []);

  const addCredits = useCallback((amount) => {
    const newTotal = dbEngine.addCredits(amount);
    setUser((prev) => (prev ? { ...prev, credits: newTotal } : null));
    toast.success(`Added ${amount} credits to your account!`);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginWithGoogle,
        loginWithEmail,
        logout,
        deductCredit,
        addCredits,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

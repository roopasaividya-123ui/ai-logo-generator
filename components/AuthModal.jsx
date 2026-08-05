"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { X, Mail, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle, loginWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    loginWithEmail(email, name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-8 rounded-3xl bg-card border border-border shadow-2xl space-y-6">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        >
          <X className="size-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
            <Sparkles className="size-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">Welcome to AI Logo Maker</h2>
          <p className="text-sm text-muted-foreground">Sign in to save, customize, and download your AI logos</p>
        </div>

        <div className="space-y-4">
          <Button
            type="button"
            onClick={loginWithGoogle}
            variant="outline"
            className="w-full h-12 text-base font-semibold border-border hover:bg-muted flex items-center justify-center gap-3 rounded-xl"
          >
            <svg className="size-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </Button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-border w-full" />
            <span className="bg-card px-3 text-xs uppercase tracking-wider text-muted-foreground shrink-0">
              Or
            </span>
          </div>

          {!isEmailMode ? (
            <Button
              type="button"
              onClick={() => setIsEmailMode(true)}
              variant="outline"
              className="w-full h-12 text-base font-semibold border-border hover:bg-muted flex items-center justify-center gap-3 rounded-xl"
            >
              <Mail className="size-5" /> Continue with Email
            </Button>
          ) : (
            <form onSubmit={handleSubmitEmail} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 text-sm border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-sm border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <Button type="submit" className="w-full h-11 font-semibold rounded-xl">
                Sign In / Sign Up
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

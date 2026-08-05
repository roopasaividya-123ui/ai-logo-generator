"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { dbEngine } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Settings, User, Mail, Save, Key, Check } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!user) return;
    const updated = { ...user, name, email };
    dbEngine.setUser(updated);
    toast.success("Profile settings updated!");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
          <Settings className="size-7 text-primary" /> Account Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your SaaS user profile, preferences, and API preferences.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-border bg-card space-y-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Image
            src={user?.avatar || "/coin.png"}
            alt={user?.name || "User"}
            width={64}
            height={64}
            className="rounded-full border-2 border-primary object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-foreground">{user?.name || "User Profile"}</h2>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[11px]">
              {user?.plan || "Free Tier"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" className="font-semibold gap-2">
            <Save className="size-4" /> Save Profile Changes
          </Button>
        </form>
      </div>
    </div>
  );
}

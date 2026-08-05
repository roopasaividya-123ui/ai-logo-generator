"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Coins, Check, Zap, Sparkles, CreditCard, ShieldCheck } from "lucide-react";

const CREDIT_PACKS = [
  {
    id: "pack_starter",
    title: "Starter Credit Pack",
    credits: 25,
    price: "$9.99",
    desc: "Great for small projects and quick logo iterations",
    popular: false,
  },
  {
    id: "pack_pro",
    title: "Pro Creator Pack",
    credits: 100,
    price: "$24.99",
    desc: "Best value for agencies, freelancers, and growth startups",
    popular: true,
  },
  {
    id: "pack_unlimited",
    title: "Agency Unlimited",
    credits: 500,
    price: "$49.99",
    desc: "Maximum capacity for enterprise brand identity design",
    popular: false,
  },
];

export default function BillingPage() {
  const { user, addCredits } = useAuth();

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="border-b border-border pb-4">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
          <CreditCard className="size-7 text-primary" /> Billing & Credit Balance
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your AI generation credits, view plan details, and top up balance.
        </p>
      </div>

      {/* Current Balance Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-indigo-500/20">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Active Account Balance
          </span>
          <div className="flex items-baseline space-x-3">
            <span className="text-5xl font-black text-white">{user?.credits ?? 0}</span>
            <span className="text-lg text-indigo-200 font-semibold">Available Credits</span>
          </div>
          <p className="text-xs text-indigo-300">
            Each AI logo generation uses 1 credit. Vector SVG exports are always free.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
          <ShieldCheck className="size-5 text-emerald-400" />
          <span className="text-xs font-semibold text-white">Pro Tier Active</span>
        </div>
      </div>

      {/* Credit Packs Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Top Up Credits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CREDIT_PACKS.map((pack) => (
            <div
              key={pack.id}
              className={`relative p-6 rounded-3xl border-2 bg-card flex flex-col justify-between space-y-6 transition-all ${
                pack.popular
                  ? "border-primary ring-2 ring-primary/20 shadow-xl"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {pack.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="size-3" /> MOST POPULAR
                </div>
              )}

              <div className="space-y-3">
                <h3 className="font-extrabold text-lg text-foreground">{pack.title}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-black text-foreground">{pack.price}</span>
                  <span className="text-xs text-muted-foreground">one-time</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{pack.desc}</p>
                <div className="pt-3 border-t border-border flex items-center space-x-2 text-sm font-bold text-primary">
                  <Coins className="size-4 text-amber-500" />
                  <span>+{pack.credits} Credits</span>
                </div>
              </div>

              <Button
                onClick={() => addCredits(pack.credits)}
                className={`w-full font-bold h-11 rounded-xl gap-2 ${
                  pack.popular ? "" : "variant-outline"
                }`}
              >
                <Zap className="size-4" /> Add {pack.credits} Credits
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

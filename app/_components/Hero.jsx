"use client";

import React, { useState } from "react";
import Lookup from "../_data/Lookup";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

function Hero() {
  const [logoTitle, setLogoTitle] = useState("");
  const router = useRouter();

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (!logoTitle.trim()) return;
    router.push(`/create?title=${encodeURIComponent(logoTitle.trim())}`);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[75vh] py-16 text-center space-y-8 max-w-4xl mx-auto px-4">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase">
        <Sparkles className="size-3.5" /> Next-Gen AI Design Generator
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
          {Lookup.HeroHeading}
        </h1>
        <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {Lookup.HeroSubheading}
        </p>
      </div>

      <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
        {Lookup.HeroDesc}
      </p>

      <form 
        onSubmit={handleGetStarted}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mt-4"
      >
        <input 
          type="text"
          placeholder={Lookup.InputTitlePlaceholder}
          value={logoTitle}
          onChange={(e) => setLogoTitle(e.target.value)}
          className="p-4 border border-border rounded-xl w-full text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-card text-foreground"
        />
        <Button 
          type="submit"
          disabled={!logoTitle.trim()}
          className="h-auto py-4 px-8 text-base font-semibold shadow-md whitespace-nowrap gap-2"
        >
          Get Started <ArrowRight className="size-4" />
        </Button>
      </form>
    </section>
  );
}

export default Hero;

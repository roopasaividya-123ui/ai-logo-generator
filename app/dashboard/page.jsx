"use client";

import React, { useState, useEffect, useMemo } from "react";
import { dbEngine } from "@/lib/db";
import LogoCard from "@/components/LogoCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  LayoutGrid, 
  Heart, 
  Coins, 
  PlusCircle, 
  Filter, 
  SlidersHorizontal 
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardOverview() {
  const [logos, setLogos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [credits, setCredits] = useState(10);

  useEffect(() => {
    setLogos(dbEngine.getLogos());
    setCredits(dbEngine.getCredits());
  }, []);

  const handleToggleFavorite = (id) => {
    const updated = dbEngine.toggleFavorite(id);
    setLogos(updated);
    toast.success("Updated favorites!");
  };

  const handleDeleteLogo = (id) => {
    const updated = dbEngine.deleteLogo(id);
    setLogos(updated);
    toast.info("Logo deleted.");
  };

  // Filter styles list
  const styleCategories = useMemo(() => {
    const categories = new Set(logos.map((l) => l.designStyle).filter(Boolean));
    return ["All", ...Array.from(categories)];
  }, [logos]);

  // Filtered logos
  const filteredLogos = useMemo(() => {
    return logos.filter((logo) => {
      const matchesSearch =
        logo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (logo.desc && logo.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (logo.idea && logo.idea.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStyle = selectedStyle === "All" || logo.designStyle === selectedStyle;

      return matchesSearch && matchesStyle;
    });
  }, [logos, searchQuery, selectedStyle]);

  const totalLogosCount = logos.length;
  const favoriteLogosCount = logos.filter((l) => l.isFavorite).length;

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-primary/90 via-primary to-indigo-900 text-primary-foreground shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 z-10 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-wide uppercase">
            <Sparkles className="size-3.5 text-amber-400" /> AI SaaS Generator
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Design Studio Overview
          </h1>
          <p className="text-sm text-white/80 leading-relaxed">
            Create, manage, and download high-resolution vector logos for your apps and business.
          </p>
        </div>

        <Link href="/create" className="z-10 shrink-0">
          <Button className="h-12 px-6 bg-white text-primary hover:bg-white/90 font-bold text-base shadow-lg rounded-xl gap-2">
            <PlusCircle className="size-5" /> Generate New Logo
          </Button>
        </Link>
      </div>

      {/* Stats Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Total Logos Created
            </span>
            <p className="text-3xl font-extrabold text-foreground">{totalLogosCount}</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <LayoutGrid className="size-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Favorite Saved Logos
            </span>
            <p className="text-3xl font-extrabold text-foreground">{favoriteLogosCount}</p>
          </div>
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500">
            <Heart className="size-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              AI Generation Credits
            </span>
            <p className="text-3xl font-extrabold text-foreground">{credits}</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500">
            <Coins className="size-6" />
          </div>
        </div>
      </div>

      {/* Controls Header: Search & Style Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-border">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search logos by title or vision..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-border rounded-xl bg-card text-foreground focus:ring-2 focus:ring-primary focus:outline-none shadow-xs"
          />
        </div>

        {/* Style Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <SlidersHorizontal className="size-4 text-muted-foreground shrink-0 mr-1" />
          {styleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedStyle(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStyle === cat
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Logo Gallery Grid */}
      {filteredLogos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLogos.map((logo) => (
            <LogoCard
              key={logo.id}
              logo={logo}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteLogo}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center space-y-4 rounded-3xl border border-dashed border-border bg-card/40">
          <div className="inline-flex p-4 rounded-full bg-muted text-muted-foreground">
            <Filter className="size-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-extrabold text-xl text-foreground">No logos match your query</h3>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search terms or generate a brand new AI logo now.
            </p>
          </div>
          <Link href="/create">
            <Button size="sm" className="mt-2 font-semibold">
              <PlusCircle className="size-4 mr-2" /> Create Logo
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

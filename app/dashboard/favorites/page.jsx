"use client";

import React, { useState, useEffect } from "react";
import { dbEngine } from "@/lib/db";
import LogoCard from "@/components/LogoCard";
import { Heart, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function FavoritesPage() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    setLogos(dbEngine.getLogos().filter((l) => l.isFavorite));
  }, []);

  const handleToggleFavorite = (id) => {
    dbEngine.toggleFavorite(id);
    setLogos((prev) => prev.filter((l) => l.id !== id));
    toast.success("Removed from favorites.");
  };

  const handleDeleteLogo = (id) => {
    dbEngine.deleteLogo(id);
    setLogos((prev) => prev.filter((l) => l.id !== id));
    toast.info("Logo deleted.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
            <Heart className="size-7 text-rose-500 fill-current" /> Favorite Logos
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your collection of starred and bookmarked logo designs
          </p>
        </div>
      </div>

      {logos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {logos.map((logo) => (
            <LogoCard
              key={logo.id}
              logo={logo}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDeleteLogo}
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 rounded-3xl border border-dashed border-border bg-card/40">
          <div className="inline-flex p-4 rounded-full bg-rose-500/10 text-rose-500">
            <Heart className="size-8" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-extrabold text-xl text-foreground">No favorite logos yet</h3>
            <p className="text-xs text-muted-foreground">
              Click the heart icon on any logo card in your dashboard to save it to your favorites collection.
            </p>
          </div>
          <Link href="/dashboard">
            <Button size="sm" className="mt-2 font-semibold">
              Browse All Logos
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

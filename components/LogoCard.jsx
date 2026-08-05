"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, Download, Trash2, Eye, Sparkles, Copy, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LogoCard({ logo, onToggleFavorite, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedSvg, setCopiedSvg] = useState(false);

  const handleDownloadSvg = () => {
    if (!logo.svgContent) {
      toast.error("SVG content not available for this logo.");
      return;
    }
    const blob = new Blob([logo.svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${logo.title.toLowerCase().replace(/\s+/g, "-")}-logo.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded SVG vector logo!");
  };

  const handleCopyPrompt = () => {
    const promptText = `Logo Title: ${logo.title}. Style: ${logo.designStyle}. Concept: ${logo.idea}`;
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    toast.success("Copied logo generation prompt!");
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopySvgCode = () => {
    if (!logo.svgContent) return;
    navigator.clipboard.writeText(logo.svgContent);
    setCopiedSvg(true);
    toast.success("Copied raw SVG vector code!");
    setTimeout(() => setCopiedSvg(false), 2000);
  };

  return (
    <>
      <div className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
        {/* Logo Preview Section */}
        <div className="relative h-60 w-full bg-muted flex items-center justify-center p-4 overflow-hidden">
          {logo.svgContent ? (
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              dangerouslySetInnerHTML={{ __html: logo.svgContent }}
            />
          ) : (
            <Image
              src={logo.imageUrl}
              alt={logo.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}

          {/* Quick Action Overlay Badges */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              onClick={() => onToggleFavorite(logo.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                logo.isFavorite
                  ? "bg-rose-500 text-white shadow-md"
                  : "bg-black/40 text-white/80 hover:bg-black/60 hover:text-white"
              }`}
              title={logo.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            >
              <Heart className={`size-4 ${logo.isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Style Badge */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/10">
              {logo.designStyle || "Custom Style"}
            </span>
          </div>
        </div>

        {/* Card Body Info */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-extrabold text-base text-foreground tracking-tight line-clamp-1">
                {logo.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {logo.idea || logo.desc || "AI Generated Logo Concept"}
              </p>
            </div>
          </div>

          {/* Color Palette Swatches */}
          {Array.isArray(logo.colors) && logo.colors.length > 0 && (
            <div className="flex items-center space-x-1.5 pt-1">
              {logo.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="size-4 rounded-full border border-border shadow-xs"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}

          {/* Card Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-border/60">
            <Button
              variant="outline"
              size="xs"
              onClick={() => setIsModalOpen(true)}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <Eye className="size-3.5" /> Specs
            </Button>

            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="xs"
                onClick={handleDownloadSvg}
                className="gap-1 text-xs text-primary hover:bg-primary/10"
                title="Download SVG Vector"
              >
                <Download className="size-3.5" /> SVG
              </Button>

              <button
                onClick={() => onDelete(logo.id)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Delete Logo"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specs Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">{logo.title}</h2>
                <p className="text-xs text-muted-foreground">Generated on {new Date(logo.createdAt).toLocaleDateString()}</p>
              </div>
              <Button variant="ghost" size="xs" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="h-64 rounded-2xl bg-muted border border-border flex items-center justify-center p-4 overflow-hidden">
                {logo.svgContent ? (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: logo.svgContent }}
                  />
                ) : (
                  <Image src={logo.imageUrl} alt={logo.title} fill className="object-cover rounded-2xl" />
                )}
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Style Category</span>
                  <p className="font-semibold text-foreground">{logo.designStyle}</p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Color Palette</span>
                  <p className="font-semibold text-foreground mb-1">{logo.palette}</p>
                  <div className="flex items-center space-x-2">
                    {logo.colors?.map((c, i) => (
                      <div key={i} className="size-6 rounded-md border border-border" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase">Concept Idea</span>
                  <p className="text-xs text-muted-foreground mt-0.5">{logo.idea}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" size="sm" onClick={handleCopyPrompt} className="gap-2">
                {copiedPrompt ? <Check className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                Copy Prompt
              </Button>

              {logo.svgContent && (
                <Button variant="outline" size="sm" onClick={handleCopySvgCode} className="gap-2">
                  {copiedSvg ? <Check className="size-4 text-emerald-500" /> : <Code className="size-4" />}
                  Copy Raw SVG
                </Button>
              )}

              <Button size="sm" onClick={handleDownloadSvg} className="gap-2 font-semibold">
                <Download className="size-4" /> Download Vector SVG
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

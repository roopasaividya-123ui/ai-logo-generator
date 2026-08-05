"use client";

import React, { useEffect, useState, useCallback } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Prompt from "@/app/_data/Prompt";
import { Loader2, RefreshCw, AlertCircle, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const FALLBACK_IDEAS = [
    "Modern & Minimalist Concept",
    "Dynamic Geometric Emblem",
    "Playful Character Mascot",
    "Elegant Abstract Monogram",
    "Bold Industrial Wordmark"
];

function LogoIdea({ formData, onHandleInputChange }) {
    const [ideas, setIdeas] = useState(formData?.ideas || []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const selectedOption = formData?.idea;

    const generateLogoDesignIdea = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const promptTemplate = Prompt.DESIGN_IDEA_PROMPT;
            const formattedPrompt = promptTemplate
                .replace("{logoType}", formData?.design?.title || "Modern Logo")
                .replace("{logoTitle}", formData?.title || "Brand Name")
                .replace("{logoDesc}", formData?.desc || "No description provided")
                .replace("{logoPrompt}", formData?.design?.prompt || "");

            const response = await fetch("/api/ai-design-ideas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: formattedPrompt }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok && data?.ideas && Array.isArray(data.ideas) && data.ideas.length > 0) {
                setIdeas(data.ideas);
                onHandleInputChange("ideas", data.ideas);
            } else {
                setIdeas(FALLBACK_IDEAS);
                onHandleInputChange("ideas", FALLBACK_IDEAS);
            }
        } catch (err) {
            console.warn("Using fallback logo design ideas:", err);
            setIdeas(FALLBACK_IDEAS);
            onHandleInputChange("ideas", FALLBACK_IDEAS);
        } finally {
            setLoading(false);
        }
    }, [formData?.design, formData?.title, formData?.desc, onHandleInputChange]);

    useEffect(() => {
        if (!ideas || ideas.length === 0) {
            generateLogoDesignIdea();
        }
    }, [ideas, generateLogoDesignIdea]);

    return (
        <div className="my-6 space-y-6">
            <HeadingDescription
                stepNumber={5}
                title={Lookup.LogoIdeaTitle}
                description={Lookup.LogoIdeaDesc}
            />

            {error && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="size-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                    <Button 
                        variant="outline" 
                        size="xs"
                        onClick={generateLogoDesignIdea}
                        className="shrink-0"
                    >
                        <RefreshCw className="size-3 mr-1" /> Retry AI
                    </Button>
                </div>
            )}

            {loading ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed border-border bg-card/50">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                        <Loader2 className="animate-spin size-8" />
                    </div>
                    <div className="text-center space-y-1">
                        <p className="font-semibold text-base text-foreground">Generating AI Design Concepts...</p>
                        <p className="text-xs text-muted-foreground">Analysing brand description and design preferences</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Suggested Concepts ({ideas.length})
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={generateLogoDesignIdea}
                            disabled={loading}
                            className="text-xs gap-1 text-primary hover:text-primary/80"
                        >
                            <Sparkles className="size-3.5" /> Regenerate Ideas
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {ideas.map((item, index) => {
                            const isSelected = selectedOption === item;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => onHandleInputChange("idea", item)}
                                    className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${
                                        isSelected
                                            ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                                            : "border-border hover:border-primary/50 bg-card text-foreground"
                                    }`}
                                >
                                    {isSelected && <Check className="size-3.5 shrink-0" />}
                                    <span>{item}</span>
                                </button>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => onHandleInputChange("idea", "Let AI Select the best idea")}
                            className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${
                                selectedOption === "Let AI Select the best idea"
                                    ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                                    : "border-border hover:border-primary/50 bg-card text-foreground"
                            }`}
                        >
                            {selectedOption === "Let AI Select the best idea" && <Check className="size-3.5 shrink-0" />}
                            <Sparkles className="size-3.5 text-amber-400" />
                            <span>Let AI Select the Best Idea</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LogoIdea;
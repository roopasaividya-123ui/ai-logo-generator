"use client";

import React, { useState, useCallback, Suspense } from "react";
import { useRouter } from "next/navigation";
import LogoTitle from "./_components/LogoTitle";
import LogoDesc from "./_components/LogoDesc";
import LogoPalette from "./_components/LogoPalette";
import LogoDesigns from "./_components/LogoDesigns";
import LogoIdea from "./_components/LogoIdea";
import PricingModel from "./_components/PricingModel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { dbEngine } from "@/lib/db";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

function CreateLogoContent() {
    const router = useRouter();
    const { user, deductCredit, setIsAuthModalOpen } = useAuth();

    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        palette: "",
        design: null,
        idea: "",
        pricing: "Free",
    });

    const onHandleInputChange = useCallback((field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }, []);

    // Step validation guard
    const isStepValid = () => {
        switch (step) {
            case 1:
                return Boolean(formData.title && formData.title.trim().length > 0);
            default:
                return true;
        }
    };

    const handleGenerateLogo = async () => {
        if (!user) {
            setIsAuthModalOpen(true);
            return;
        }

        if (user.credits <= 0) {
            toast.error("You are out of credits! Please top up your balance.");
            router.push("/dashboard/billing");
            return;
        }

        setIsGenerating(true);
        toast.info("Generating your AI vector logo...");

        try {
            // Call API endpoint via native fetch
            const response = await fetch("/api/generate-logo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: formData.title,
                    desc: formData.desc,
                    palette: formData.palette,
                    colors: formData.palette ? ["#3b82f6", "#8b5cf6", "#f43f5e"] : undefined,
                    designStyle: formData.design?.title || "Modern",
                    idea: formData.idea || "Clean AI Emblem",
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (response.ok && data?.success && data?.logo) {
                // Deduct credit
                deductCredit();

                // Save to SaaS Database
                dbEngine.saveLogo(data.logo);

                toast.success("Logo generated and saved to your dashboard!");
                router.push("/dashboard");
            } else {
                toast.error(data?.error || "Failed to generate logo.");
            }
        } catch (err) {
            console.error("Logo generation error:", err);
            toast.error("An error occurred during AI logo generation.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="mt-12 mb-20 max-w-4xl mx-auto px-4 sm:px-6">
            {/* Step Progress Bar Header */}
            <div className="mb-8 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <span>Step {step} of 6</span>
                    <span>{Math.round((step / 6) * 100)}% Completed</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                        style={{ width: `${(step / 6) * 100}%` }}
                    />
                </div>
            </div>

            {/* Main Step Container Card */}
            <div className="p-6 sm:p-10 border border-border rounded-3xl bg-card shadow-lg shadow-black/5 transition-all relative overflow-hidden">
                {isGenerating && (
                    <div className="absolute inset-0 bg-card/90 backdrop-blur-md z-30 flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="size-12 text-primary animate-spin" />
                        <div className="text-center space-y-1">
                            <h3 className="font-extrabold text-xl text-foreground">Creating Your AI Logo...</h3>
                            <p className="text-sm text-muted-foreground">Rendering scalable vector SVG & high-res assets</p>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <LogoTitle
                        onHandleInputChange={onHandleInputChange}
                        formData={formData}
                    />
                )}
                {step === 2 && (
                    <LogoDesc
                        onHandleInputChange={onHandleInputChange}
                        formData={formData}
                    />
                )}
                {step === 3 && (
                    <LogoPalette
                        onHandleInputChange={onHandleInputChange}
                        formData={formData}
                    />
                )}
                {step === 4 && (
                    <LogoDesigns
                        onHandleInputChange={onHandleInputChange}
                        formData={formData}
                    />
                )}
                {step === 5 && (
                    <LogoIdea
                        onHandleInputChange={onHandleInputChange}
                        formData={formData}
                    />
                )}
                {step === 6 && (
                    <PricingModel
                        onHandleInputChange={onHandleInputChange}
                        formData={formData}
                    />
                )}

                {/* Step Navigation Controls */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
                    {step > 1 ? (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep((prev) => prev - 1)}
                            className="gap-2 font-medium"
                            disabled={isGenerating}
                        >
                            <ArrowLeft className="size-4" /> Previous
                        </Button>
                    ) : (
                        <div />
                    )}

                    {step < 6 ? (
                        <Button
                            type="button"
                            disabled={!isStepValid() || isGenerating}
                            onClick={() => setStep((prev) => prev + 1)}
                            className="gap-2 font-semibold px-6 shadow-md"
                        >
                            Continue <ArrowRight className="size-4" />
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            disabled={isGenerating}
                            onClick={handleGenerateLogo}
                            className="gap-2 font-semibold px-8 py-2.5 bg-gradient-to-r from-primary via-blue-600 to-indigo-600 text-white shadow-lg hover:opacity-95 rounded-xl"
                        >
                            <Sparkles className="size-4" /> Generate Logo Now
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function CreateLogo() {
    return (
        <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-primary" />
            </div>
        }>
            <CreateLogoContent />
        </Suspense>
    );
}
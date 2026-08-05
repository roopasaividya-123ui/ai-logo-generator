"use client";

import React from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";

function LogoDesc({ onHandleInputChange, formData }) {
    return (
        <div className="my-6 space-y-6">
            <HeadingDescription 
                stepNumber={2}
                title={Lookup?.LogoDescTitle}
                description={Lookup?.LogoDescDesc}
            />

            <div className="space-y-2">
                <label htmlFor="logo-desc-input" className="text-sm font-medium text-foreground">
                    Logo Description & Brand Vision
                </label>
                <textarea 
                    id="logo-desc-input"
                    rows={4}
                    placeholder="e.g. A modern organic coffee shop with warm, minimalist aesthetics and leaves motif..."
                    className="p-4 border rounded-xl w-full text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background text-foreground resize-none"
                    value={formData?.desc || ""}
                    onChange={(e) => onHandleInputChange("desc", e.target.value)}
                    autoFocus
                />
                <p className="text-xs text-muted-foreground">
                    Tip: The more detailed your vision, the better the AI can tailor design suggestions for you!
                </p>
            </div>
        </div>
    );
}

export default LogoDesc;
"use client";

import React, { useEffect } from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import { useSearchParams } from "next/navigation";

function LogoTitle({ onHandleInputChange, formData }) {
    const searchParams = useSearchParams();

    // Auto-populate title from URL query parameter if present and not yet set
    useEffect(() => {
        const titleParam = searchParams?.get("title");
        if (titleParam && !formData?.title) {
            onHandleInputChange("title", titleParam);
        }
    }, [searchParams, formData?.title, onHandleInputChange]);

    return (
        <div className="my-6 space-y-6">
            <HeadingDescription 
                stepNumber={1}
                title={Lookup?.LogoTitle}
                description={Lookup?.LogoTitleDesc}
            />
            
            <div className="space-y-2">
                <label htmlFor="logo-title-input" className="text-sm font-medium text-foreground">
                    Logo / Brand Name <span className="text-destructive">*</span>
                </label>
                <input 
                    id="logo-title-input"
                    type="text" 
                    placeholder={Lookup.InputTitlePlaceholder}
                    className="p-4 border rounded-xl w-full text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-background text-foreground"
                    value={formData?.title || ""}
                    onChange={(e) => onHandleInputChange("title", e.target.value)}
                    autoFocus
                />
                {!formData?.title?.trim() && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                        Please enter your brand name to continue.
                    </p>
                )}
            </div>
        </div>
    );
}

export default LogoTitle;
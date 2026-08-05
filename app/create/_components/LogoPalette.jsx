"use client";

import React from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Colors from "@/app/_data/Colors";
import { Check } from "lucide-react";

function LogoPalette({ onHandleInputChange, formData }) {
    const selectedPaletteName = formData?.palette;

    return (
        <div className="my-6 space-y-6">
            <HeadingDescription
                stepNumber={3}
                title={Lookup.LogoColorPaletteTitle}
                description={Lookup.LogoColorPaletteDesc}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {Colors.map((palette, index) => {
                    const isSelected = selectedPaletteName === palette.name;
                    return (
                        <div
                            key={index}
                            onClick={() => onHandleInputChange("palette", palette.name)}
                            className={`group relative p-3 rounded-xl border-2 transition-all cursor-pointer shadow-sm hover:shadow-md ${
                                isSelected
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/30"
                                    : "border-border hover:border-primary/50 bg-card"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-sm text-foreground">
                                    {palette.name}
                                </span>
                                {isSelected && (
                                    <span className="p-1 rounded-full bg-primary text-primary-foreground">
                                        <Check className="size-3.5" />
                                    </span>
                                )}
                            </div>

                            <div className="flex h-16 w-full rounded-lg overflow-hidden border border-border/50">
                                {palette.colors.map((color, colorIdx) => (
                                    <div
                                        key={colorIdx}
                                        className="h-full flex-1 transition-transform group-hover:scale-105"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LogoPalette;
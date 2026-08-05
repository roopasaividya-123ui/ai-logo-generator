"use client";

import React from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import LogoDesig from "@/app/_data/LogoDesig";
import Image from "next/image";
import { Check } from "lucide-react";

function LogoDesigns({ onHandleInputChange, formData }) {
    const selectedDesignTitle = formData?.design?.title;

    return (
        <div className="my-6 space-y-6">
            <HeadingDescription
                stepNumber={4}
                title={Lookup.LogoDesignTitle}
                description={Lookup.LogoDesignDesc}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {LogoDesig.map((design, index) => {
                    const isSelected = selectedDesignTitle === design.title;
                    return (
                        <div
                            key={index}
                            onClick={() => onHandleInputChange("design", design)}
                            className={`group relative p-2.5 rounded-2xl border-2 transition-all cursor-pointer bg-card overflow-hidden shadow-sm hover:shadow-lg ${
                                isSelected
                                    ? "border-primary ring-2 ring-primary/30"
                                    : "border-border hover:border-primary/50"
                            }`}
                        >
                            <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3 bg-muted">
                                <Image
                                    src={design.image}
                                    alt={design.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {isSelected && (
                                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-primary text-primary-foreground shadow-md">
                                        <Check className="size-4" />
                                    </div>
                                )}
                            </div>

                            <h3 className="font-semibold text-sm text-foreground text-center pb-1">
                                {design.title}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default LogoDesigns;
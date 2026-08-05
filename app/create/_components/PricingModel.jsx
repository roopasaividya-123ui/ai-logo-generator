"use client";

import React from "react";
import HeadingDescription from "./HeadingDescription";
import Lookup from "@/app/_data/Lookup";
import Image from "next/image";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

function PricingModel({ formData, onHandleInputChange }) {
    const selectedPricing = formData?.pricing || "Free";

    return (
        <div className="my-6 space-y-6">
            <HeadingDescription 
                stepNumber={6}
                title={Lookup.LogoPricingModelTitle}
                description={Lookup.LogoPricingModelDesc}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {Lookup.pricingOption.map((option, index) => {
                    const isSelected = selectedPricing === option.title;
                    return (
                        <div
                            key={index}
                            onClick={() => onHandleInputChange("pricing", option.title)}
                            className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer bg-card flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl ${
                                isSelected
                                    ? "border-primary ring-2 ring-primary/30 bg-primary/5"
                                    : "border-border hover:border-primary/50"
                            }`}
                        >
                            {option.title === "Premium" && (
                                <div className="absolute -top-3 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1">
                                    <Sparkles className="size-3" /> RECOMMENDED
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2.5 rounded-xl bg-muted border border-border">
                                        <Image 
                                            src={option.icon} 
                                            alt={option.title} 
                                            width={32} 
                                            height={32}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-xl text-foreground">
                                            {option.title} Plan
                                        </h3>
                                        <p className="text-xs text-muted-foreground">
                                            {option.title === "Free" ? "Ideal for casual testing" : "Best for business & production"}
                                        </p>
                                    </div>
                                </div>

                                <ul className="space-y-2.5 pt-2">
                                    {option.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start text-xs text-muted-foreground">
                                            <Check className="size-3.5 text-primary shrink-0 mr-2 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button 
                                variant={isSelected ? "default" : "outline"}
                                className="w-full font-semibold"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onHandleInputChange("pricing", option.title);
                                }}
                            >
                                {isSelected ? `Selected (${option.title})` : option.button}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PricingModel;
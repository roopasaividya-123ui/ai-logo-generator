import React from "react";

function HeadingDescription({ title, description, stepNumber }) {
    return (
        <div className="space-y-2">
            {stepNumber && (
                <span className="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full border border-primary/20">
                    Step {stepNumber} of 6
                </span>
            )}
            <h2 className="font-extrabold text-3xl tracking-tight text-foreground">
                {title}
            </h2>
            {description && (
                <p className="text-base text-muted-foreground max-w-xl">
                    {description}
                </p>
            )}
        </div>
    );
}

export default HeadingDescription;
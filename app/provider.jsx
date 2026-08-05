import React from "react";
import Header from "./_components/Header";

function Provider({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <Header /> 
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

export default Provider;
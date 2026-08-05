import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className="px-6 lg:px-20 xl:px-32 py-4 flex justify-between items-center border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="flex items-center space-x-2 transition-opacity hover:opacity-90">
        <Image src="/logo.svg" alt="AI Logo Maker" width={160} height={40} priority />
      </Link>
      <Link href="/create">
        <Button className="font-semibold shadow-sm">Get Started</Button>
      </Link>
    </header>
  );
}

export default Header;
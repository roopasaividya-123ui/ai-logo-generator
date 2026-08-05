import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const host_Grotesk = Host_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "AI Logo Maker & Vector Design Studio | SaaS App",
  description: "Craft unique, high-resolution vector logos and brand identity packages effortlessly using AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={host_Grotesk.className}>
        <AuthProvider>
          <Provider>
            {children}
          </Provider>
          <Toaster position="bottom-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}

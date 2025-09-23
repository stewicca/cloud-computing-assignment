import "./globals.css";
import React from "react";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { AuthProvider, StoreProvider } from "@/providers";

export const metadata: Metadata = {
    title: "Sample App",
    description: "Lorem ipsum dolor sit amet, consectetaur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="font-geist antialiased">
                <StoreProvider>
                    <AuthProvider>
                        {children}
                        <Toaster />
                    </AuthProvider>
                </StoreProvider>
            </body>
        </html>
    );
};

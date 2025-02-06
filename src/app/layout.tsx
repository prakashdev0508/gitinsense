import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "sonner";

import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Gitinsense",
  description: "GitInSense – AI-powered GitHub companion! Instantly view commit summaries, ask questions about your GitHub project, and gain insights. Upcoming feature: Team collaboration! Try it now.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

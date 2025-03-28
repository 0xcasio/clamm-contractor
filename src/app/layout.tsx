import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { NetworkProvider } from "@/contexts/NetworkContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CLAMM Contract Dashboard",
  description: "Deploy and manage CLAMM smart contracts across multiple EVM-compatible blockchains",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NetworkProvider>
          <Header />
          <main>{children}</main>
        </NetworkProvider>
      </body>
    </html>
  );
}

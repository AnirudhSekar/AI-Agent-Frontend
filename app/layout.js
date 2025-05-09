// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";      // ← import our wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI‑CEO Assistant",
  description: "Your CEO‑grade email & calendar AI agent",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap everything in our SessionProvider */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

"use client"

import { SessionProvider } from "next-auth/react"

/**
 * Wraps the entire app in a NextAuth session provider
 * so any page or component can call useSession(), signIn(), signOut(), etc.
 */
export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>
}

import type React from "react"
import { AuthGuard } from "@/components/layout/AuthGuard"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen bg-gradient-to-br from-designly-purple-500/10 to-designly-emerald-400/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </AuthGuard>
  )
}

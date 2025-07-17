import type React from "react"
import { AuthGuard } from "@/components/layout/AuthGuard"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requireAuth={false}>
      <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </AuthGuard>
  )
}

import type React from "react"
import "./globals.css"
import "./aakar-styles.css"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ProjectProvider } from "@/contexts/ProjectContext"
import { Navbar } from "@/components/layout/AakarNavbar"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Aakar - AI-Powered Design Companion",
  description: "Cultivating Creativity. Shaping Excellence. Transform your ideas into professional, pixel-perfect designs with advanced AI technology.",
  keywords: ["AI design", "design tools", "artificial intelligence", "creative", "branding", "UI/UX"],
  authors: [{ name: "Aakar Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`}>
        <ThemeProvider>
          <AuthProvider>
            <ProjectProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </ProjectProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

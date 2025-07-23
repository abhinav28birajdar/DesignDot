import type React from "react"
import "./globals.css"
import "./designly-styles.css"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { ProjectProvider } from "@/contexts/ProjectContext"
import { Providers } from "@/components/layout/Providers"

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
  title: "Design.ly - The AI-Powered Creative Engine",
  description: "Innovate. Automate. Elevate. Every Design, Masterfully Crafted. Transform your ideas into professional designs with advanced AI technology.",
  keywords: ["AI design", "design tools", "artificial intelligence", "creative", "branding", "UI/UX", "Design.ly"],
  authors: [{ name: "Design.ly Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900`} suppressHydrationWarning={true}>
        <ThemeProvider>
          <ProjectProvider>
            <Providers>
              {children}
            </Providers>
          </ProjectProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

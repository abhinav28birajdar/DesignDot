"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { cn } from "@/lib/utils"
import {
  Sparkles,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Search,
  Brain,
  LayoutDashboard,
  Palette,
  ChevronDown
} from "lucide-react"

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/create", label: "Create", badge: "AI" },
  { href: "/explore", label: "Explore" },
  { href: "/explore/ai-insights", label: "AI Insights", badge: "New" },
]

export function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/20 designly-glass">
      <div className="container-fluid max-w-7xl h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 designly-hover-lift">
            <div className="w-10 h-10 bg-gradient-to-br from-designly-purple-600 to-designly-purple-700 rounded-xl flex items-center justify-center shadow-lg designly-glow-purple">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold designly-text-gradient">Design.ly</span>
              <div className="text-xs text-muted-foreground">AI Creative Engine</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-all duration-300 hover:text-designly-purple-600",
                    isActiveLink(link.href)
                      ? "text-designly-purple-600"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="flex items-center space-x-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 designly-gradient text-white">
                        {link.badge}
                      </Badge>
                    )}
                  </span>
                  {isActiveLink(link.href) && (
                    <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-gradient-to-r from-designly-purple-600 to-designly-purple-700 rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-designly-purple-600 to-designly-purple-700 rounded-full flex items-center justify-center">
                      {user.user_metadata?.avatar_url ? (
                        <img 
                          src={user.user_metadata.avatar_url} 
                          alt={user.user_metadata?.full_name || user.email} 
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="hidden lg:block">{user.user_metadata?.full_name || user.email}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="min-w-[200px]">
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive cursor-pointer"
                    onClick={handleSignOut}
                  >
                    <div className="flex items-center space-x-2">
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="designly-gradient text-white hover:opacity-90 designly-hover-lift">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200/20">
          <div className="container-fluid max-w-7xl py-6 space-y-6">
            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-all duration-300",
                    isActiveLink(link.href)
                      ? "bg-designly-purple-50 text-designly-purple-600"
                      : "text-muted-foreground hover:bg-gray-50"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="font-medium">{link.label}</span>
                  {link.badge && (
                    <Badge variant="secondary" className="text-xs px-2 py-0.5 designly-gradient text-white">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="border-t border-gray-200 pt-6">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-designly-purple-600 to-designly-purple-700 rounded-full flex items-center justify-center">
                      {user.user_metadata?.avatar_url ? (
                        <img 
                          src={user.user_metadata.avatar_url} 
                          alt={user.user_metadata?.full_name || user.email} 
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{user.user_metadata?.full_name || "User"}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-destructive border-destructive hover:bg-destructive hover:text-white"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="w-full designly-gradient text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/sign-up">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

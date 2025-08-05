"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  ChevronDown,
  Bell,
  Plus,
  MessageCircle,
  Store,
  Users,
  Compass,
  HelpCircle
} from "lucide-react"

const navigationLinks = [
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/community", label: "Community", icon: Users },
  { href: "/marketplace", label: "Marketplace", icon: Store },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [unreadNotifications, setUnreadNotifications] = useState(0)

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Mock notification count - in real app, this would come from Supabase realtime
  useEffect(() => {
    if (user) {
      // Simulate fetching unread notifications
      setUnreadNotifications(3)
    }
  }, [user])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-designly-purple-600 to-designly-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold designly-text-gradient">Design.ly</span>
              <div className="text-xs text-gray-500">AI Creative Engine</div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search designs, users, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              {navigationLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActiveLink(link.href)
                        ? "text-designly-purple-600 bg-designly-purple-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Authenticated User Actions */}
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Share Work Button */}
                <Button asChild className="bg-designly-purple-600 hover:bg-designly-purple-700 text-white">
                  <Link href="/add-work">
                    <Plus className="h-4 w-4 mr-2" />
                    Share Work
                  </Link>
                </Button>

                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="relative"
                >
                  <Link href="/notifications">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                        {unreadNotifications > 9 ? '9+' : unreadNotifications}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* Messages */}
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/messages">
                    <MessageCircle className="h-5 w-5" />
                  </Link>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors p-1 rounded-lg hover:bg-gray-50">
                      <div className="w-8 h-8 bg-gradient-to-br from-designly-purple-600 to-designly-purple-700 rounded-full flex items-center justify-center">
                        {user.user_metadata?.avatar_url ? (
                          <img 
                            src={user.user_metadata.avatar_url} 
                            alt={user.user_metadata?.full_name || user.email} 
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="hidden lg:block max-w-24 truncate">
                        {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                      </span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent className="min-w-[200px]" align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center space-x-2 cursor-pointer">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/users/${user.user_metadata?.username || user.id}`} className="flex items-center space-x-2 cursor-pointer">
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings" className="flex items-center space-x-2 cursor-pointer">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/help" className="flex items-center space-x-2 cursor-pointer">
                        <HelpCircle className="w-4 w-4" />
                        <span>Help & Support</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="text-red-600 cursor-pointer focus:text-red-600"
                      onClick={handleSignOut}
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              /* Unauthenticated User Actions */
              <div className="flex items-center space-x-3">
                <Button asChild variant="ghost">
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button asChild className="bg-designly-purple-600 hover:bg-designly-purple-700 text-white">
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Mobile Notifications (if authenticated) */}
            {user && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </Badge>
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search designs, users, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10"
              />
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              {navigationLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                      isActiveLink(link.href)
                        ? "bg-designly-purple-50 text-designly-purple-600"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile User Section */}
            <div className="border-t border-gray-200 pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-designly-purple-600 to-designly-purple-700 rounded-full flex items-center justify-center">
                      {user.user_metadata?.avatar_url ? (
                        <img 
                          src={user.user_metadata.avatar_url} 
                          alt={user.user_metadata?.full_name || user.email} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-sm">
                        {user.user_metadata?.full_name || "User"}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  
                  <Button
                    asChild
                    className="w-full bg-designly-purple-600 hover:bg-designly-purple-700 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/add-work">
                      <Plus className="h-4 w-4 mr-2" />
                      Share Work
                    </Link>
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      asChild
                      variant="outline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/dashboard">
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/messages">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Messages
                      </Link>
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-red-600 hover:bg-red-50 hover:text-red-600"
                    onClick={() => {
                      handleSignOut()
                      setMobileMenuOpen(false)
                    }}
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
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full bg-designly-purple-600 hover:bg-designly-purple-700 text-white"
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

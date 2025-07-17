"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AuthGuard } from "@/components/layout/AuthGuard"
import { useAuth } from "@/contexts/AuthContext"
import { useProject } from "@/contexts/ProjectContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, Palette, Calendar, MoreVertical, Folder, Star, Clock, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const { projects } = useProject()

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: <Folder className="h-5 w-5" />,
      color: "text-blue-600",
    },
    {
      title: "This Month",
      value: projects.filter((p) => {
        const projectMonth = new Date(p.createdAt).getMonth()
        const currentMonth = new Date().getMonth()
        return projectMonth === currentMonth
      }).length,
      icon: <Calendar className="h-5 w-5" />,
      color: "text-green-600",
    },
    {
      title: "Favorites",
      value: Math.floor(projects.length * 0.3), // Mock favorite count
      icon: <Star className="h-5 w-5" />,
      color: "text-yellow-600",
    },
    {
      title: "Recent Activity",
      value: projects.filter((p) => {
        const daysDiff = (Date.now() - new Date(p.updatedAt).getTime()) / (1000 * 60 * 60 * 24)
        return daysDiff <= 7
      }).length,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "text-orange-600",
    },
  ]

  const recentProjects = projects
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 6)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.user_metadata?.full_name || "Creator"}!
            </h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your design projects</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`${stat.color}`}>{stat.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/create">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-orange-200 hover:border-orange-300">
                  <CardContent className="p-6 text-center">
                    <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Plus className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Start New Project</h3>
                    <p className="text-sm text-gray-600">Create a new AI-powered design</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/explore">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Palette className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Browse Gallery</h3>
                    <p className="text-sm text-gray-600">Explore design inspiration</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/profile">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Star className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Brand Guidelines</h3>
                    <p className="text-sm text-gray-600">Manage your brand settings</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          {/* Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Projects</h2>
              <Link href="/create">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>

            {recentProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <Card key={project.id} className="design-card-hover cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {project.type} • {project.style}
                          </CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        {project.thumbnail ? (
                          <img
                            src={project.thumbnail || "/placeholder.svg"}
                            alt={project.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Palette className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {project.type}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(project.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Palette className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-gray-600 mb-6">Start creating your first AI-powered design project</p>
                  <Link href="/create">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { AuthGuard } from "@/components/layout/AuthGuard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Plus, Palette, Calendar, MoreVertical, Folder, Star, Clock, TrendingUp, Search, Filter, Grid, List, Eye, Edit, Trash2, Download, Share2, Copy, Sparkles, Zap, Target, Layers } from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  type: 'logo' | 'banner' | 'poster' | 'social-media' | 'web-design' | 'branding'
  status: 'draft' | 'in-progress' | 'completed' | 'archived'
  created_at: string
  updated_at: string
  thumbnail_url?: string
  brand_id?: string
  ai_generated: boolean
  generation_count: number
  views: number
  downloads: number
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Mock data for demonstration
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'TechStart Logo',
        description: 'Modern tech startup logo with clean lines',
        type: 'logo',
        status: 'completed',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-20T14:20:00Z',
        thumbnail_url: '/placeholder-logo.jpg',
        ai_generated: true,
        generation_count: 8,
        views: 245,
        downloads: 12
      },
      {
        id: '2',
        name: 'Summer Sale Banner',
        description: 'Eye-catching banner for summer promotion',
        type: 'banner',
        status: 'in-progress',
        created_at: '2024-01-18T09:15:00Z',
        updated_at: '2024-01-22T11:45:00Z',
        ai_generated: true,
        generation_count: 15,
        views: 89,
        downloads: 3
      },
      {
        id: '3',
        name: 'Coffee Brand Identity',
        description: 'Complete branding package for artisan coffee shop',
        type: 'branding',
        status: 'completed',
        created_at: '2024-01-10T16:20:00Z',
        updated_at: '2024-01-25T13:30:00Z',
        ai_generated: false,
        generation_count: 0,
        views: 156,
        downloads: 8
      },
      {
        id: '4',
        name: 'Instagram Post Series',
        description: 'Social media templates for lifestyle brand',
        type: 'social-media',
        status: 'draft',
        created_at: '2024-01-22T08:45:00Z',
        updated_at: '2024-01-22T08:45:00Z',
        ai_generated: true,
        generation_count: 6,
        views: 34,
        downloads: 1
      }
    ]
    
    setTimeout(() => {
      setProjects(mockProjects)
      setLoading(false)
    }, 1000)
  }, [])

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: <Folder className="h-5 w-5" />,
      color: "text-designly-purple",
      change: "+12%"
    },
    {
      title: "AI Generated",
      value: projects.filter(p => p.ai_generated).length,
      icon: <Sparkles className="h-5 w-5" />,
      color: "text-emerald-500",
      change: "+45%"
    },
    {
      title: "Total Views",
      value: projects.reduce((sum, p) => sum + p.views, 0),
      icon: <Eye className="h-5 w-5" />,
      color: "text-blue-500",
      change: "+23%"
    },
    {
      title: "Downloads",
      value: projects.reduce((sum, p) => sum + p.downloads, 0),
      icon: <Download className="h-5 w-5" />,
      color: "text-orange-500",
      change: "+18%"
    }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || project.type === filterType
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'archived': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'logo': return <Target className="h-4 w-4" />
      case 'banner': return <Layers className="h-4 w-4" />
      case 'poster': return <Calendar className="h-4 w-4" />
      case 'social-media': return <Share2 className="h-4 w-4" />
      case 'web-design': return <Palette className="h-4 w-4" />
      case 'branding': return <Sparkles className="h-4 w-4" />
      default: return <Folder className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <Navbar />
        
        <main className="container mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your creative projects</p>
            </div>
            <Link href="/create">
              <Button className="bg-designly-purple hover:bg-designly-purple/90 text-white">
                <Plus className="h-5 w-5 mr-2" />
                New Project
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-emerald-600 mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-designly-purple focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="logo">Logo</option>
                <option value="banner">Banner</option>
                <option value="poster">Poster</option>
                <option value="social-media">Social Media</option>
                <option value="web-design">Web Design</option>
                <option value="branding">Branding</option>
              </select>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-designly-purple text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-designly-purple text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first design project</p>
              <Link href="/create">
                <Button className="bg-designly-purple hover:bg-designly-purple/90 text-white">
                  <Plus className="h-5 w-5 mr-2" />
                  Create Your First Project
                </Button>
              </Link>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-200 group">
                  <CardContent className="p-0">
                    {/* Project Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br from-designly-purple/10 to-emerald-50 rounded-t-lg overflow-hidden">
                      {project.thumbnail_url ? (
                        <img 
                          src={project.thumbnail_url} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-designly-purple">
                            {getTypeIcon(project.type)}
                          </div>
                        </div>
                      )}
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* AI Badge */}
                      {project.ai_generated && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-designly-purple text-white text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            AI
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-designly-purple transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {project.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getTypeIcon(project.type)}
                            <span className="ml-1 capitalize">{project.type.replace('-', ' ')}</span>
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                        <span>{formatDate(project.updated_at)}</span>
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {project.views}
                          </span>
                          <span className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {project.downloads}
                          </span>
                          {project.ai_generated && (
                            <span className="flex items-center">
                              <Zap className="h-3 w-3 mr-1" />
                              {project.generation_count}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-designly-purple/10 to-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getTypeIcon(project.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{project.name}</h3>
                          {project.ai_generated && (
                            <Badge className="bg-designly-purple text-white text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">{project.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{formatDate(project.updated_at)}</span>
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {project.views}
                          </span>
                          <span className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {project.downloads}
                          </span>
                          {project.ai_generated && (
                            <span className="flex items-center">
                              <Zap className="h-3 w-3 mr-1" />
                              {project.generation_count} generations
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs capitalize">
                          {project.type.replace('-', ' ')}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </AuthGuard>
  )
}

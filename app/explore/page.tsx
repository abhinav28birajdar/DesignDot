"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Heart, 
  Download, 
  Share2, 
  Sparkles,
  Calendar,
  User,
  Star,
  TrendingUp,
  Clock,
  Target,
  Layers,
  Palette
} from "lucide-react"

const categories = [
  { id: 'all', name: 'All Designs', count: 2847 },
  { id: 'logo', name: 'Logos', count: 523 },
  { id: 'banner', name: 'Banners', count: 412 },
  { id: 'social-media', name: 'Social Media', count: 789 },
  { id: 'poster', name: 'Posters', count: 234 },
  { id: 'branding', name: 'Branding', count: 567 },
  { id: 'web-design', name: 'Web Design', count: 322 }
]

const mockDesigns = [
  {
    id: 1,
    title: "Modern Tech Startup Logo",
    category: "logo",
    author: "Sarah Chen",
    likes: 234,
    views: 1205,
    downloads: 89,
    image: "/api/placeholder/300/300",
    isPremium: false,
    tags: ["modern", "tech", "startup", "minimalist"],
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Summer Sale Banner Design",
    category: "banner",
    author: "Mike Johnson",
    likes: 156,
    views: 892,
    downloads: 45,
    image: "/api/placeholder/300/300",
    isPremium: true,
    tags: ["sale", "summer", "colorful", "promotional"],
    createdAt: "2024-01-18"
  },
  {
    id: 3,
    title: "Instagram Story Template",
    category: "social-media",
    author: "Emily Davis",
    likes: 445,
    views: 2341,
    downloads: 156,
    image: "/api/placeholder/300/300",
    isPremium: false,
    tags: ["instagram", "story", "template", "lifestyle"],
    createdAt: "2024-01-20"
  },
  {
    id: 4,
    title: "Coffee Shop Branding Kit",
    category: "branding",
    author: "Alex Rivera",
    likes: 678,
    views: 3456,
    downloads: 234,
    image: "/api/placeholder/300/300",
    isPremium: true,
    tags: ["coffee", "branding", "logo", "package"],
    createdAt: "2024-01-12"
  },
  {
    id: 5,
    title: "Event Poster Design",
    category: "poster",
    author: "Lisa Wong",
    likes: 123,
    views: 567,
    downloads: 34,
    image: "/api/placeholder/300/300",
    isPremium: false,
    tags: ["event", "poster", "concert", "vibrant"],
    createdAt: "2024-01-22"
  },
  {
    id: 6,
    title: "SaaS Landing Page Design",
    category: "web-design",
    author: "David Kim",
    likes: 567,
    views: 2890,
    downloads: 178,
    image: "/api/placeholder/300/300",
    isPremium: true,
    tags: ["saas", "landing", "web", "modern"],
    createdAt: "2024-01-10"
  }
]

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('trending')

  const filteredDesigns = mockDesigns.filter(design => {
    const matchesCategory = selectedCategory === 'all' || design.category === selectedCategory
    const matchesSearch = design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         design.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'logo': return <Target className="h-4 w-4" />
      case 'banner': return <Layers className="h-4 w-4" />
      case 'social-media': return <Share2 className="h-4 w-4" />
      case 'poster': return <Calendar className="h-4 w-4" />
      case 'branding': return <Sparkles className="h-4 w-4" />
      case 'web-design': return <Palette className="h-4 w-4" />
      default: return <Grid className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Design Gallery</h1>
          <p className="text-gray-600">Discover stunning designs created by our AI-powered platform</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-designly-purple-500">2,847</div>
              <div className="text-sm text-gray-600">Total Designs</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-emerald-500">156K</div>
              <div className="text-sm text-gray-600">Downloads</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-500">892</div>
              <div className="text-sm text-gray-600">Active Creators</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-500">98%</div>
              <div className="text-sm text-gray-600">AI Generated</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Categories Sidebar */}
          <div className="lg:w-64">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        selectedCategory === category.id ? 'bg-designly-purple-50 text-designly-purple-700 border-r-2 border-designly-purple-500' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(category.id)}
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search designs, tags, or creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-designly-purple-500 focus:border-transparent"
                >
                  <option value="trending">Trending</option>
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="downloads">Most Downloaded</option>
                </select>
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-designly-purple-500 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-designly-purple-500 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredDesigns.length} designs
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {/* Design Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDesigns.map((design) => (
                  <Card key={design.id} className="group hover:shadow-lg transition-all duration-200 overflow-hidden">
                    <div className="relative aspect-square bg-gray-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-designly-purple-500/10 to-emerald-50 flex items-center justify-center">
                        <div className="text-gray-400 text-center">
                          {getCategoryIcon(design.category)}
                          <p className="text-sm mt-2">Design Preview</p>
                        </div>
                      </div>
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Premium Badge */}
                      {design.isPremium && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                            <Star className="h-3 w-3 mr-1" />
                            Premium
                          </Badge>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-designly-purple-500 transition-colors">
                        {design.title}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-r from-designly-purple-500 to-designly-purple-600 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm text-gray-600">{design.author}</span>
                        <Badge variant="outline" className="text-xs capitalize">
                          {design.category.replace('-', ' ')}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {design.likes}
                          </span>
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {design.views}
                          </span>
                          <span className="flex items-center">
                            <Download className="h-3 w-3 mr-1" />
                            {design.downloads}
                          </span>
                        </div>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(design.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {design.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {design.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{design.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredDesigns.map((design) => (
                  <Card key={design.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-designly-purple-500/10 to-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          {getCategoryIcon(design.category)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900 truncate">{design.title}</h3>
                            {design.isPremium && (
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">by {design.author}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Heart className="h-3 w-3 mr-1" />
                              {design.likes} likes
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {design.views} views
                            </span>
                            <span className="flex items-center">
                              <Download className="h-3 w-3 mr-1" />
                              {design.downloads} downloads
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(design.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="text-xs capitalize">
                            {design.category.replace('-', ' ')}
                          </Badge>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" className="px-8">
                Load More Designs
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

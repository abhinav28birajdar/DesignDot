"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Eye, 
  ChevronDown,
  TrendingUp,
  Clock,
  Sparkles,
  Palette,
  Monitor,
  Smartphone,
  Camera,
  Brush,
  Type,
  Layout,
  Play,
  Shirt,
  Package,
  Home,
  Gamepad2,
  User
} from 'lucide-react'

// Design categories with icons
const designCategories = [
  { id: 'all', name: 'All Designs', icon: Grid, count: 12450 },
  { id: 'ui-ux', name: 'UI/UX Design', icon: Monitor, count: 2340 },
  { id: 'web-design', name: 'Web Design', icon: Layout, count: 1890 },
  { id: 'mobile-app', name: 'Mobile App', icon: Smartphone, count: 1560 },
  { id: 'branding', name: 'Branding & Identity', icon: Palette, count: 1340 },
  { id: 'illustration', name: 'Illustration', icon: Brush, count: 2100 },
  { id: 'digital-art', name: 'Digital Art', icon: Sparkles, count: 1780 },
  { id: 'photography', name: 'Photography', icon: Camera, count: 2890 },
  { id: 'typography', name: 'Typography', icon: Type, count: 890 },
  { id: 'motion-graphics', name: 'Motion Graphics', icon: Play, count: 670 },
  { id: 'product-design', name: 'Product Design', icon: Package, count: 560 },
  { id: 'fashion', name: 'Fashion Design', icon: Shirt, count: 430 },
  { id: 'game-design', name: 'Game Design', icon: Gamepad2, count: 340 },
  { id: 'architecture', name: 'Architecture', icon: Home, count: 280 }
]

// Sort options
const sortOptions = [
  { id: 'trending', name: 'Trending', icon: TrendingUp },
  { id: 'newest', name: 'Newest', icon: Clock },
  { id: 'most-liked', name: 'Most Liked', icon: Heart },
  { id: 'most-viewed', name: 'Most Viewed', icon: Eye }
]

// Color filters
const colorFilters = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
]

// Mock design data
const mockDesigns = [
  {
    id: 1,
    title: "Modern Dashboard Design",
    category: "UI/UX Design",
    author: "Sarah Wilson",
    authorAvatar: "/api/placeholder/40/40",
    imageUrl: "/api/placeholder/300/225",
    likes: 234,
    views: 1240,
    tags: ["dashboard", "ui", "modern"],
    isPro: true
  },
  {
    id: 2,
    title: "Brand Identity for Coffee Shop",
    category: "Branding & Identity",
    author: "Alex Chen",
    authorAvatar: "/api/placeholder/40/40",
    imageUrl: "/api/placeholder/300/400",
    likes: 189,
    views: 890,
    tags: ["branding", "logo", "coffee"],
    isPro: false
  },
  // Add more mock designs...
]

interface DesignCardProps {
  design: typeof mockDesigns[0]
}

function DesignCard({ design }: DesignCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={design.imageUrl}
          alt={design.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>

        {/* Pro badge */}
        {design.isPro && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            PRO
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-designly-purple-600 transition-colors">
            {design.title}
          </h3>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <img
            src={design.authorAvatar}
            alt={design.author}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600">{design.author}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <Badge variant="secondary" className="text-xs">
            {design.category}
          </Badge>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{design.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{design.views}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {design.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('trending')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [designs, setDesigns] = useState(mockDesigns)

  // Filter designs based on selected category
  const filteredDesigns = designs.filter(design => {
    if (selectedCategory === 'all') return true
    return design.category.toLowerCase().includes(selectedCategory.replace('-', ' '))
  })

  return (
    <div className="min-h-screen bg-gray-50/50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Amazing <span className="designly-text-gradient">Designs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover inspiring work from talented designers around the world
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for designs, colors, styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-12 text-lg bg-white border-gray-200 focus:border-designly-purple-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto p-1">
              {designCategories.slice(0, 7).map((category) => {
                const Icon = category.icon
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex flex-col items-center space-y-1 py-3 data-[state=active]:bg-designly-purple-600 data-[state=active]:text-white"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs hidden sm:block">{category.name.split(' ')[0]}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>

          {/* All Categories Dropdown */}
          <div className="mt-4 flex justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-48">
                  <Grid className="h-4 w-4 mr-2" />
                  All Categories
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                {designCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count.toLocaleString()}
                      </Badge>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {sortOptions.find(opt => opt.id === sortBy)?.name}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {sortOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <DropdownMenuItem
                      key={option.id}
                      onClick={() => setSortBy(option.id)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {option.name}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Color Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Palette className="h-4 w-4 mr-2" />
                  Colors
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <div className="p-3">
                  <div className="grid grid-cols-5 gap-2">
                    {colorFilters.map((color, index) => (
                      <button
                        key={index}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColors.includes(color) 
                            ? 'border-gray-900 scale-110' 
                            : 'border-gray-200'
                        } transition-all`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setSelectedColors(prev => 
                            prev.includes(color)
                              ? prev.filter(c => c !== color)
                              : [...prev, color]
                          )
                        }}
                      />
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-md"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-md"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            <span className="text-sm text-gray-500">
              {filteredDesigns.length} designs
            </span>
          </div>
        </div>

        {/* Designs Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="w-48 h-12 border-2 border-designly-purple-200 text-designly-purple-600 hover:bg-designly-purple-50"
          >
            Load More Designs
          </Button>
        </div>
      </div>
    </div>
  )
}

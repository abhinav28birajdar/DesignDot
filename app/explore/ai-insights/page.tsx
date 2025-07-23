"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  TrendingUp, 
  Zap, 
  Target, 
  Palette, 
  BarChart3, 
  PieChart, 
  Activity,
  Sparkles,
  Eye,
  Download,
  Heart,
  Clock,
  Users,
  Star,
  ArrowUpRight,
  Calendar,
  Filter
} from "lucide-react"

const insights = [
  {
    id: 1,
    title: "Purple is the New Black",
    category: "Color Trends",
    description: "Purple-based color schemes have seen a 340% increase in usage this month, especially in tech and startup branding.",
    impact: "High",
    date: "2024-01-22",
    icon: <Palette className="h-6 w-6" />,
    stats: { engagement: "+45%", adoption: "2.3K designs" }
  },
  {
    id: 2,
    title: "Minimalist Logo Surge",
    category: "Design Style",
    description: "Clean, minimalist logos are dominating the AI generation requests, with 78% preferring simple geometric shapes.",
    impact: "Medium",
    date: "2024-01-20",
    icon: <Target className="h-6 w-6" />,
    stats: { engagement: "+32%", adoption: "1.8K designs" }
  },
  {
    id: 3,
    title: "Gradient Overlays Peak",
    category: "Visual Effects",
    description: "Gradient overlays on images have become the most requested effect, particularly for social media content.",
    impact: "High",
    date: "2024-01-18",
    icon: <Sparkles className="h-6 w-6" />,
    stats: { engagement: "+67%", adoption: "3.1K designs" }
  },
  {
    id: 4,
    title: "Typography Shift to Sans-Serif",
    category: "Typography",
    description: "Sans-serif fonts are being chosen 85% more often than serif fonts in AI-generated designs this quarter.",
    impact: "Medium",
    date: "2024-01-15",
    icon: <BarChart3 className="h-6 w-6" />,
    stats: { engagement: "+28%", adoption: "2.7K designs" }
  }
]

const trendingElements = [
  { name: "Holographic Effects", usage: 89, trend: "+23%" },
  { name: "3D Gradients", usage: 76, trend: "+45%" },
  { name: "Geometric Patterns", usage: 82, trend: "+12%" },
  { name: "Neon Accents", usage: 64, trend: "+67%" },
  { name: "Abstract Shapes", usage: 71, trend: "+34%" },
  { name: "Monochrome Themes", usage: 58, trend: "+8%" }
]

const aiMetrics = [
  {
    title: "AI Generations Today",
    value: "1,247",
    change: "+23%",
    icon: <Zap className="h-6 w-6" />,
    color: "text-designly-purple"
  },
  {
    title: "Popular AI Mode",
    value: "Enhanced",
    change: "67% usage",
    icon: <Brain className="h-6 w-6" />,
    color: "text-emerald-500"
  },
  {
    title: "Avg. Generation Time",
    value: "2.3s",
    change: "-15%",
    icon: <Clock className="h-6 w-6" />,
    color: "text-blue-500"
  },
  {
    title: "Success Rate",
    value: "98.2%",
    change: "+2.1%",
    icon: <Target className="h-6 w-6" />,
    color: "text-orange-500"
  }
]

export default function AIInsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [timeframe, setTimeframe] = useState('week')

  const categories = ['all', 'Color Trends', 'Design Style', 'Typography', 'Visual Effects']

  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory)

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-designly-purple to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Design Insights</h1>
              <p className="text-gray-600">Real-time intelligence from our AI design engine</p>
            </div>
          </div>
        </div>

        {/* AI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {aiMetrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <p className="text-sm text-emerald-600 mt-1">{metric.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Insights */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-designly-purple hover:bg-designly-purple/90" : ""}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </Button>
                  ))}
                </div>
              </div>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-designly-purple focus:border-transparent"
              >
                <option value="day">Last 24 Hours</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
              </select>
            </div>

            {/* Insights List */}
            <div className="space-y-6">
              {filteredInsights.map((insight) => (
                <Card key={insight.id} className="border-0 shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-designly-purple/10 to-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        {insight.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {insight.category}
                            </Badge>
                            <Badge className={getImpactColor(insight.impact) + " text-xs"}>
                              {insight.impact} Impact
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{insight.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <span className="flex items-center">
                              <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
                              {insight.stats.engagement}
                            </span>
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-blue-500" />
                              {insight.stats.adoption}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(insight.date).toLocaleDateString()}
                            </span>
                          </div>
                          <Button variant="ghost" size="sm">
                            View Details
                            <ArrowUpRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Elements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-designly-purple" />
                  <span>Trending Elements</span>
                </CardTitle>
                <CardDescription>Most popular design elements this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingElements.map((element, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{element.name}</span>
                        <span className="text-xs text-emerald-600 font-medium">{element.trend}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-designly-purple h-2 rounded-full transition-all duration-300"
                          style={{ width: `${element.usage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-designly-purple" />
                  <span>AI Performance</span>
                </CardTitle>
                <CardDescription>Real-time AI engine statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-designly-purple border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-designly-purple">98%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active Models</span>
                    <span className="text-sm font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Queue Time</span>
                    <span className="text-sm font-medium">&lt; 1s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Processing Power</span>
                    <span className="text-sm font-medium">2.1 TFLOPs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-designly-purple hover:bg-designly-purple/90 text-white">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Try Trending Style
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Full Analytics
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

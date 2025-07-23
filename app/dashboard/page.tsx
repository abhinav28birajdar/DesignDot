"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Images, 
  History, 
  Settings, 
  Search, 
  PlusCircle, 
  Sparkles,
  FileImage,
  Users,
  Heart,
  Star,
  ChevronRight,
  Calendar,
  TrendingUp,
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

// Recent projects mock data
const recentProjects = [
  {
    id: "1",
    title: "Brand Logo Redesign",
    category: "Logo",
    imageUrl: "/project-1.jpg",
    date: "2 days ago",
    likes: 24,
    views: 156
  },
  {
    id: "2",
    title: "Summer Campaign",
    category: "Social Media",
    imageUrl: "/project-2.jpg", 
    date: "1 week ago",
    likes: 47,
    views: 302
  },
  {
    id: "3",
    title: "Website Banner",
    category: "Web Design",
    imageUrl: "/project-3.jpg",
    date: "2 weeks ago",
    likes: 18,
    views: 210
  }
];

// AI suggestions
const aiSuggestions = [
  {
    id: "s1",
    title: "Try Minimalist Logo Style",
    description: "Based on your recent designs, you might enjoy our minimalist style preset."
  },
  {
    id: "s2",
    title: "Brand Color Enhancement",
    description: "Your brand palette could use complementary accents to increase visual appeal."
  },
  {
    id: "s3",
    title: "Content Layout Tips",
    description: "Improve your designs with balanced negative space and better hierarchical structure."
  }
];

// Stats data
const statsData = [
  { label: "Projects", value: "23", icon: <FileImage className="h-4 w-4 text-designly-purple-500" /> },
  { label: "Designs", value: "86", icon: <Images className="h-4 w-4 text-designly-emerald-500" /> },
  { label: "Likes", value: "142", icon: <Heart className="h-4 w-4 text-red-500" /> },
  { label: "Collaborators", value: "7", icon: <Users className="h-4 w-4 text-blue-500" /> }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Format date for display
  const currentDate = new Date();
  const dateOptions = { 
    weekday: 'long' as const, 
    year: 'numeric' as const, 
    month: 'long' as const, 
    day: 'numeric' as const 
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, dateOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-fluid max-w-7xl py-8">
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-20">
              <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-designly-purple-500 to-designly-purple-600 rounded-full flex items-center justify-center text-white">
                  {user?.user_metadata?.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt={user.user_metadata?.full_name || "User"} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold">
                      {user?.user_metadata?.full_name?.[0] || "U"}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {user?.user_metadata?.full_name || "User"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Free Plan
                  </div>
                </div>
              </div>

              <nav className="space-y-1">
                <button
                  className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg transition-colors ${
                    activeTab === "overview" 
                      ? "bg-designly-purple-50 text-designly-purple-700" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Overview</span>
                </button>

                <button
                  className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg transition-colors ${
                    activeTab === "projects" 
                      ? "bg-designly-purple-50 text-designly-purple-700" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  <Images className="h-5 w-5" />
                  <span>Projects</span>
                </button>

                <button
                  className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg transition-colors ${
                    activeTab === "history" 
                      ? "bg-designly-purple-50 text-designly-purple-700" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("history")}
                >
                  <History className="h-5 w-5" />
                  <span>History</span>
                </button>

                <button
                  className={`flex items-center space-x-3 w-full px-3 py-2.5 rounded-lg transition-colors ${
                    activeTab === "settings" 
                      ? "bg-designly-purple-50 text-designly-purple-700" 
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Button className="w-full bg-designly-purple-500 hover:bg-designly-purple-600 text-white">
                  <PlusCircle className="h-4 w-4 mr-2" /> New Project
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'Designer'}</h1>
                <p className="text-gray-500 text-sm">{formattedDate}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-designly-purple-500 focus:border-transparent"
                  />
                </div>
                <Button variant="outline" className="border-gray-200">
                  <Calendar className="h-4 w-4 mr-2" />
                  July 2025
                </Button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {statsData.map((stat, index) => (
                <Card key={index} className="border-0 shadow-sm bg-white">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Projects */}
            <Card className="mb-6 border-0 shadow-sm bg-white">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold">Recent Projects</CardTitle>
                  <Button variant="ghost" size="sm" className="text-sm text-designly-purple-500 hover:text-designly-purple-700">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <div className="h-32 bg-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-designly-purple-500/20 to-designly-emerald-500/20"></div>
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-white text-gray-800 hover:bg-gray-50">{project.category}</Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900">{project.title}</h3>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-gray-500">{project.date}</span>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center text-xs text-gray-500">
                              <Heart className="h-3 w-3 mr-1" /> {project.likes}
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                              <Eye className="h-3 w-3 mr-1" /> {project.views}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="border-0 shadow-sm bg-white overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-designly-purple-500 to-designly-emerald-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-designly-purple-500 mr-2" />
                  <CardTitle className="text-lg font-bold">AI Design Insights</CardTitle>
                </div>
                <CardDescription>
                  Personalized recommendations based on your design patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="flex p-3 bg-gray-50 rounded-lg hover:bg-designly-purple-50 transition-colors cursor-pointer">
                      <div className="mr-4 mt-1">
                        <div className="w-8 h-8 rounded-full bg-designly-purple-100 flex items-center justify-center text-designly-purple-500">
                          <Sparkles className="h-4 w-4" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
                        <p className="text-sm text-gray-500">{suggestion.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 flex justify-between border-t border-gray-100">
                <p className="text-sm text-gray-500">Powered by Design.ly AI</p>
                <Button variant="link" size="sm" className="text-designly-purple-500 hover:text-designly-purple-700 p-0">
                  More Insights
                </Button>
              </CardFooter>
            </Card>

            {/* Activity Chart */}
            <Card className="mt-6 border-0 shadow-sm bg-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold">Design Activity</CardTitle>
                  <Button variant="outline" size="sm" className="text-sm">Last 30 Days</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full flex items-end justify-between px-2">
                  {Array.from({ length: 14 }).map((_, i) => {
                    const height = Math.floor(Math.random() * 100) + 20;
                    return (
                      <div key={i} className="relative group">
                        <div 
                          className="w-6 bg-gradient-to-t from-designly-purple-500 to-designly-purple-400 rounded-t-sm hover:from-designly-purple-600 hover:to-designly-purple-500 transition-colors"
                          style={{ height: `${height}px` }}
                        ></div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-designly-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="mt-2 text-xs text-gray-500">{(i + 1)}</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-100 text-sm text-gray-500">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                  <span>14% increase from last month</span>
                </div>
                <Button variant="ghost" size="sm">
                  Full Analytics
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

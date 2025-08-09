import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  ShoppingCart, 
  TrendingUp,
  Award,
  DollarSign,
  Eye
} from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with real Supabase queries
const featuredProducts = [
  {
    id: '1',
    name: 'Modern UI Kit - Banking App',
    description: 'Complete UI kit for mobile banking applications with 50+ screens',
    price: 49.99,
    cover_image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    category: 'UI Kits',
    rating: 4.9,
    reviews_count: 128,
    downloads_count: 1250,
    creator: {
      username: 'alexdesigner',
      display_name: 'Alex Johnson',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      is_verified: true
    }
  },
  {
    id: '2',
    name: 'Brand Identity Template Pack',
    description: 'Professional branding templates for startups and agencies',
    price: 79.99,
    cover_image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    category: 'Templates',
    rating: 4.8,
    reviews_count: 89,
    downloads_count: 890,
    creator: {
      username: 'sarah_creative',
      display_name: 'Sarah Wilson',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      is_verified: true
    }
  },
  {
    id: '3',
    name: 'Character Illustration Bundle',
    description: 'Set of 25 unique character illustrations in vector format',
    price: 34.99,
    cover_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: 'Illustrations',
    rating: 5.0,
    reviews_count: 245,
    downloads_count: 2100,
    creator: {
      username: 'mike_illustrations',
      display_name: 'Mike Chen',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      is_verified: true
    }
  }
];

const categories = [
  { name: 'UI Kits', count: 1250, icon: '📱' },
  { name: 'Templates', count: 890, icon: '📄' },
  { name: 'Illustrations', count: 2100, icon: '🎨' },
  { name: 'Icons', count: 3400, icon: '🔮' },
  { name: 'Mockups', count: 780, icon: '📐' },
  { name: 'Fonts', count: 560, icon: '✍️' },
  { name: 'Photos', count: 4500, icon: '📸' },
  { name: 'Graphics', count: 1890, icon: '🎯' }
];

const topSellers = [
  {
    username: 'designmaster',
    display_name: 'Design Master',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    total_sales: 15420,
    products_count: 47,
    rating: 4.9
  },
  {
    username: 'creativepro',
    display_name: 'Creative Pro',
    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    total_sales: 12890,
    products_count: 32,
    rating: 4.8
  },
  {
    username: 'uiexpert',
    display_name: 'UI Expert',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    total_sales: 11250,
    products_count: 28,
    rating: 4.9
  }
];

const MarketplacePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            DesignDot Marketplace
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium design assets from talented creators worldwide. Find the perfect resources for your next project.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Search for UI kits, templates, illustrations..." 
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline">
              Sort: Popular
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link key={category.name} href={`/marketplace?category=${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.count} items</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Award className="h-6 w-6 text-yellow-500 mr-2" />
              Featured Products
            </h2>
            <Link href="/marketplace/featured">
              <Button variant="outline">View All Featured</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img 
                    src={product.cover_image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <span className="text-xl font-bold text-designly-purple-600">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <Badge variant="secondary" className="mb-3">
                    {product.category}
                  </Badge>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{product.rating}</span>
                        <span className="ml-1">({product.reviews_count})</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        <span>{product.downloads_count}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={product.creator.avatar_url} alt={product.creator.display_name} />
                        <AvatarFallback>{product.creator.display_name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{product.creator.display_name}</span>
                      {product.creator.is_verified && (
                        <Badge variant="outline" className="text-xs">✓</Badge>
                      )}
                    </div>
                    <Link href={`/marketplace/product/${product.id}`}>
                      <Button size="sm">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Buy
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Marketplace Tabs */}
        <section className="mb-12">
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="bestsellers">Best Sellers</TabsTrigger>
              <TabsTrigger value="free">Free Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square bg-gray-200">
                      <img 
                        src={product.cover_image_url} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium text-sm mb-1 line-clamp-1">{product.name}</h4>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-designly-purple-600">${product.price}</span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          {product.rating}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="newest" className="mt-6">
              <div className="text-center py-12 text-gray-500">
                Newest products will be displayed here
              </div>
            </TabsContent>

            <TabsContent value="bestsellers" className="mt-6">
              <div className="text-center py-12 text-gray-500">
                Best selling products will be displayed here
              </div>
            </TabsContent>

            <TabsContent value="free" className="mt-6">
              <div className="text-center py-12 text-gray-500">
                Free resources will be displayed here
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Top Sellers */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="h-6 w-6 text-designly-purple-600 mr-2" />
            Top Sellers This Month
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topSellers.map((seller, index) => (
              <Card key={seller.username} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <Avatar className="h-20 w-20 mx-auto">
                      <AvatarImage src={seller.avatar_url} alt={seller.display_name} />
                      <AvatarFallback>{seller.display_name[0]}</AvatarFallback>
                    </Avatar>
                    <Badge 
                      className={`absolute -top-2 -right-2 ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                      }`}
                    >
                      #{index + 1}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{seller.display_name}</h3>
                  <p className="text-gray-600 mb-3">@{seller.username}</p>
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <div className="text-lg font-bold text-designly-purple-600">
                        ${seller.total_sales.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Total Sales</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-designly-purple-600">
                        {seller.products_count}
                      </div>
                      <div className="text-xs text-gray-500">Products</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-designly-purple-600 flex items-center justify-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        {seller.rating}
                      </div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                  </div>
                  <Link href={`/users/${seller.username}`}>
                    <Button className="w-full">View Store</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sell Your Designs CTA */}
        <section className="bg-gradient-to-r from-designly-purple-600 to-designly-purple-700 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Selling Your Designs</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of creators earning money from their passion. Upgrade to Pro and unlock your marketplace potential.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard/settings/subscription">
              <Button size="lg" variant="secondary" className="text-designly-purple-600">
                <DollarSign className="h-5 w-5 mr-2" />
                Become a Pro Seller
              </Button>
            </Link>
            <Link href="/marketplace/seller-guide">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-designly-purple-600">
                <Eye className="h-5 w-5 mr-2" />
                Learn How to Sell
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MarketplacePage;

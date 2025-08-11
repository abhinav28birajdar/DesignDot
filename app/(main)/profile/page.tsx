"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Calendar, 
  Globe, 
  Twitter, 
  Instagram, 
  Github, 
  Linkedin,
  MessageCircle,
  UserPlus,
  UserMinus,
  Share2,
  Edit,
  Heart,
  Eye,
  Download,
  Settings
} from 'lucide-react';
import Link from 'next/link';

// Mock user profile data - replace with real API call
const mockProfile = {
  id: '1',
  username: 'designpro',
  fullName: 'Alex Designer',
  bio: 'UI/UX Designer passionate about creating beautiful and functional designs. Love to experiment with colors and typography.',
  location: 'San Francisco, CA',
  website: 'https://alexdesigner.com',
  joinedDate: '2024-01-15',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  headerImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=200&fit=crop',
  social: {
    twitter: 'https://twitter.com/alexdesigner',
    instagram: 'https://instagram.com/alexdesigner',
    github: 'https://github.com/alexdesigner',
    linkedin: 'https://linkedin.com/in/alexdesigner'
  },
  stats: {
    followers: 1234,
    following: 567,
    designs: 89,
    likes: 5678
  },
  isFollowing: false,
  isOwnProfile: true
};

const mockDesigns = [
  {
    id: '1',
    title: 'Modern Dashboard UI',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
    likes: 234,
    views: 1234,
    downloads: 89
  },
  {
    id: '2',
    title: 'Mobile App Design',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop',
    likes: 156,
    views: 890,
    downloads: 45
  },
  {
    id: '3',
    title: 'Website Landing Page',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=200&fit=crop',
    likes: 189,
    views: 567,
    downloads: 23
  }
];

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(mockProfile);
  const [activeTab, setActiveTab] = useState('designs');

  const handleFollow = () => {
    setProfile(prev => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      stats: {
        ...prev.stats,
        followers: prev.isFollowing ? prev.stats.followers - 1 : prev.stats.followers + 1
      }
    }));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.fullName} - DesignDot Profile`,
          text: profile.bio,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Profile link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-48 bg-gradient-to-r from-purple-500 to-pink-500">
        {profile.headerImage && (
          <img
            src={profile.headerImage}
            alt="Profile header"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Info Card */}
          <div className="lg:w-1/3">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="relative -mt-16 mb-4">
                  <div className="w-32 h-32 mx-auto relative">
                    <img
                      src={profile.avatar}
                      alt={profile.fullName}
                      className="w-full h-full rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    {profile.isOwnProfile && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full p-2"
                        asChild
                      >
                        <Link href="/profile/edit">
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Name and Username */}
                <div className="text-center mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
                  <p className="text-gray-500">@{profile.username}</p>
                </div>

                {/* Bio */}
                {profile.bio && (
                  <p className="text-gray-700 text-center mb-4 leading-relaxed">
                    {profile.bio}
                  </p>
                )}

                {/* Location and Website */}
                <div className="space-y-2 mb-4">
                  {profile.location && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-4 w-4 mr-2" />
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {profile.website.replace('https://', '')}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      Joined {new Date(profile.joinedDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center space-x-3 mb-6">
                  {profile.social.twitter && (
                    <a
                      href={profile.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {profile.social.instagram && (
                    <a
                      href={profile.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-pink-400 transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  )}
                  {profile.social.github && (
                    <a
                      href={profile.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {profile.social.linkedin && (
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {profile.isOwnProfile ? (
                    <>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href="/profile/edit">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/settings">
                          <Settings className="h-4 w-4" />
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        onClick={handleFollow}
                        className={`flex-1 ${
                          profile.isFollowing
                            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {profile.isFollowing ? (
                          <UserMinus className="h-4 w-4 mr-2" />
                        ) : (
                          <UserPlus className="h-4 w-4 mr-2" />
                        )}
                        {profile.isFollowing ? 'Unfollow' : 'Follow'}
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/messages?user=${profile.id}`}>
                          <MessageCircle className="h-4 w-4" />
                        </Link>
                      </Button>
                    </>
                  )}
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t">
                  <Link href="/profile/followers" className="text-center hover:bg-gray-50 p-2 rounded">
                    <div className="font-bold text-lg">{profile.stats.followers.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm">Followers</div>
                  </Link>
                  <Link href="/profile/following" className="text-center hover:bg-gray-50 p-2 rounded">
                    <div className="font-bold text-lg">{profile.stats.following.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm">Following</div>
                  </Link>
                  <div className="text-center">
                    <div className="font-bold text-lg">{profile.stats.designs}</div>
                    <div className="text-gray-500 text-sm">Designs</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg">{profile.stats.likes.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm">Likes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="border-b">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'designs', label: 'Designs', count: profile.stats.designs },
                    { id: 'liked', label: 'Liked', count: profile.stats.likes },
                    { id: 'collections', label: 'Collections', count: 5 }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                      <Badge variant="secondary" className="ml-2">
                        {tab.count}
                      </Badge>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'designs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {mockDesigns.map((design) => (
                  <Card key={design.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={design.image}
                        alt={design.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{design.title}</h3>
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {design.likes}
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {design.views}
                          </div>
                          <div className="flex items-center">
                            <Download className="h-4 w-4 mr-1" />
                            {design.downloads}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {(activeTab === 'liked' || activeTab === 'collections') && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Heart className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {activeTab === 'liked' ? 'No liked designs yet' : 'No collections yet'}
                </h3>
                <p className="text-gray-500">
                  {activeTab === 'liked' 
                    ? 'Start exploring and like designs you love!'
                    : 'Create your first collection to organize your designs.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

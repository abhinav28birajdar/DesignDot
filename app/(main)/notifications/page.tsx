import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Heart, 
  MessageSquare, 
  UserPlus, 
  Star, 
  ShoppingCart,
  Calendar,
  AlertCircle,
  CheckCircle,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';

// Mock data - replace with real Supabase queries
const notifications = [
  {
    id: '1',
    type: 'like',
    message: 'Alex Johnson liked your design "Modern Banking Interface"',
    time: '2 minutes ago',
    is_read: false,
    sender: {
      username: 'alexdesigner',
      display_name: 'Alex Johnson',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    entity: {
      type: 'design',
      id: 'design-123',
      name: 'Modern Banking Interface',
      image_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=100&h=100&fit=crop'
    }
  },
  {
    id: '2',
    type: 'comment',
    message: 'Sarah Wilson commented on your design',
    time: '15 minutes ago',
    is_read: false,
    sender: {
      username: 'sarah_creative',
      display_name: 'Sarah Wilson',
      avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face'
    },
    entity: {
      type: 'design',
      id: 'design-456',
      name: 'E-commerce Mobile App',
      image_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop'
    }
  },
  {
    id: '3',
    type: 'follow',
    message: 'Mike Chen started following you',
    time: '1 hour ago',
    is_read: true,
    sender: {
      username: 'mike_illustrations',
      display_name: 'Mike Chen',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  },
  {
    id: '4',
    type: 'purchase',
    message: 'Someone purchased your "UI Kit Bundle"',
    time: '3 hours ago',
    is_read: true,
    entity: {
      type: 'product',
      id: 'product-789',
      name: 'UI Kit Bundle',
      price: 49.99
    }
  },
  {
    id: '5',
    type: 'project_invite',
    message: 'Emily Davis invited you to collaborate on "Brand Redesign Project"',
    time: '1 day ago',
    is_read: false,
    sender: {
      username: 'emily_brand',
      display_name: 'Emily Davis',
      avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    entity: {
      type: 'project',
      id: 'project-abc',
      name: 'Brand Redesign Project'
    }
  },
  {
    id: '6',
    type: 'achievement',
    message: 'Congratulations! You\'ve reached 1000 followers',
    time: '2 days ago',
    is_read: true,
    entity: {
      type: 'milestone',
      milestone: '1000_followers'
    }
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'like':
      return <Heart className="h-4 w-4 text-red-500" />;
    case 'comment':
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case 'follow':
      return <UserPlus className="h-4 w-4 text-green-500" />;
    case 'purchase':
      return <ShoppingCart className="h-4 w-4 text-purple-500" />;
    case 'project_invite':
      return <Calendar className="h-4 w-4 text-orange-500" />;
    case 'achievement':
      return <Star className="h-4 w-4 text-yellow-500" />;
    default:
      return <Bell className="h-4 w-4 text-gray-500" />;
  }
};

const NotificationItem = ({ notification }: { notification: any }) => {
  const handleMarkAsRead = () => {
    // TODO: Implement mark as read functionality
    console.log('Mark as read:', notification.id);
  };

  const handleAction = () => {
    // TODO: Implement notification action (like accepting invite, viewing design, etc.)
    console.log('Handle action for:', notification.id);
  };

  return (
    <div className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
      !notification.is_read ? 'bg-blue-50/50' : ''
    }`}>
      <div className="flex items-start space-x-3">
        {/* Notification Icon */}
        <div className="flex-shrink-0 mt-1">
          {getNotificationIcon(notification.type)}
        </div>

        {/* Sender Avatar (if applicable) */}
        {notification.sender && (
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={notification.sender.avatar_url} alt={notification.sender.display_name} />
            <AvatarFallback>{notification.sender.display_name[0]}</AvatarFallback>
          </Avatar>
        )}

        {/* Notification Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 mb-1">
            {notification.message}
          </p>
          <p className="text-xs text-gray-500">{notification.time}</p>

          {/* Entity Preview (for designs, products, etc.) */}
          {notification.entity && notification.entity.type === 'design' && (
            <div className="mt-2 flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
              <img 
                src={notification.entity.image_url} 
                alt={notification.entity.name}
                className="w-8 h-8 rounded object-cover"
              />
              <span className="text-xs font-medium text-gray-700">
                {notification.entity.name}
              </span>
            </div>
          )}

          {/* Action Buttons */}
          {notification.type === 'project_invite' && (
            <div className="mt-2 flex space-x-2">
              <Button size="sm" onClick={handleAction}>
                Accept
              </Button>
              <Button size="sm" variant="outline">
                Decline
              </Button>
            </div>
          )}
        </div>

        {/* Read/Unread Indicator & Actions */}
        <div className="flex items-center space-x-2">
          {!notification.is_read && (
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAsRead}
            className="h-8 w-8 p-0"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const unreadCount = notifications.filter(n => !n.is_read).length;

  const handleMarkAllAsRead = () => {
    // TODO: Implement mark all as read
    console.log('Mark all as read');
  };

  const handleClearAll = () => {
    // TODO: Implement clear all notifications
    console.log('Clear all notifications');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Bell className="h-8 w-8 mr-3 text-designly-purple-600" />
                Notifications
                {unreadCount > 0 && (
                  <Badge className="ml-3 bg-red-500 text-white">
                    {unreadCount} new
                  </Badge>
                )}
              </h1>
              <p className="text-gray-600 mt-2">
                Stay updated with your latest activities and interactions
              </p>
            </div>
            <div className="flex space-x-2">
              {unreadCount > 0 && (
                <Button variant="outline" onClick={handleMarkAllAsRead}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              )}
              <Link href="/dashboard/settings/notifications">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Notification Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="likes">Likes</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="follows">Follows</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>All Notifications</CardTitle>
                  <Button variant="ghost" size="sm" onClick={handleClearAll}>
                    Clear all
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No notifications yet</p>
                    <p className="text-sm">When you get notifications, they'll show up here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Likes & Reactions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {notifications
                    .filter(n => n.type === 'like')
                    .map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
                  Comments & Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {notifications
                    .filter(n => n.type === 'comment')
                    .map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="follows" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2 text-green-500" />
                  Follows & Connections
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {notifications
                    .filter(n => n.type === 'follow')
                    .map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                  Projects & Collaborations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100">
                  {notifications
                    .filter(n => n.type === 'project_invite')
                    .map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Notification Settings Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Email Notifications</div>
                  <div className="text-xs text-gray-500">Get notified via email</div>
                </div>
                <Button size="sm" variant="outline">
                  <AlertCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Push Notifications</div>
                  <div className="text-xs text-gray-500">Browser notifications</div>
                </div>
                <Button size="sm" variant="outline">
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Digest Email</div>
                  <div className="text-xs text-gray-500">Weekly summary</div>
                </div>
                <Button size="sm" variant="outline">
                  <AlertCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link href="/dashboard/settings/notifications">
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  Manage All Notification Settings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;

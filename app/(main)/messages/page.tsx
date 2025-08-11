"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Search, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Image as ImageIcon,
  ArrowLeft,
  Circle,
  Check,
  CheckCheck
} from 'lucide-react';
import Link from 'next/link';

const mockConversations = [
  {
    id: '1',
    username: 'designlover',
    fullName: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Hey! I loved your latest design. Can we collaborate?',
    lastMessageTime: '2 min ago',
    unreadCount: 2,
    isOnline: true,
    lastSeen: null
  },
  {
    id: '2',
    username: 'creativemind',
    fullName: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Thanks for the feedback on my portfolio!',
    lastMessageTime: '1 hour ago',
    unreadCount: 0,
    isOnline: false,
    lastSeen: '2 hours ago'
  },
  {
    id: '3',
    username: 'artistica',
    fullName: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'The color palette looks amazing! 🎨',
    lastMessageTime: '3 hours ago',
    unreadCount: 1,
    isOnline: true,
    lastSeen: null
  }
];

const mockMessages = [
  {
    id: '1',
    senderId: '2',
    senderName: 'Mike Chen',
    message: 'Hey Alex! I saw your latest dashboard design and it\'s absolutely stunning!',
    timestamp: '2025-01-10T10:30:00Z',
    isRead: true,
    type: 'text'
  },
  {
    id: '2',
    senderId: 'me',
    senderName: 'You',
    message: 'Thank you so much! I really appreciate the feedback.',
    timestamp: '2025-01-10T10:32:00Z',
    isRead: true,
    type: 'text'
  },
  {
    id: '3',
    senderId: '2',
    senderName: 'Mike Chen',
    message: 'Would you be interested in collaborating on a project? I have an idea for a fintech app.',
    timestamp: '2025-01-10T10:35:00Z',
    isRead: true,
    type: 'text'
  },
  {
    id: '4',
    senderId: 'me',
    senderName: 'You',
    message: 'That sounds interesting! I\'d love to hear more about it.',
    timestamp: '2025-01-10T10:40:00Z',
    isRead: true,
    type: 'text'
  },
  {
    id: '5',
    senderId: '2',
    senderName: 'Mike Chen',
    message: 'Great! I\'ll send you the brief and we can schedule a call to discuss further.',
    timestamp: '2025-01-10T11:00:00Z',
    isRead: false,
    type: 'text'
  }
];

export default function MessagesPage() {
  const searchParams = useSearchParams();
  const selectedUserId = searchParams.get('user');
  
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(
    selectedUserId ? selectedUserId : conversations[0]?.id
  );
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedUser = conversations.find(conv => conv.id === selectedConversation);
  const filteredConversations = conversations.filter(conv =>
    conv.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: String(messages.length + 1),
        senderId: 'me',
        senderName: 'You',
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isRead: false,
        type: 'text' as const
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Update conversation's last message
      setConversations(prev =>
        prev.map(conv =>
          conv.id === selectedConversation
            ? { ...conv, lastMessage: newMessage.trim(), lastMessageTime: 'now', unreadCount: 0 }
            : conv
        )
      );
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatLastMessageTime = (timeStr: string) => {
    if (timeStr === 'now') return 'now';
    return timeStr;
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Conversations Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Messages</h1>
            <Button variant="outline" size="sm" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedConversation === conversation.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.fullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 truncate">
                      {conversation.fullName}
                    </p>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs text-gray-500">
                        {formatLastMessageTime(conversation.lastMessageTime)}
                      </span>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {conversation.lastMessage}
                  </p>
                  {!conversation.isOnline && conversation.lastSeen && (
                    <p className="text-xs text-gray-400">
                      Last seen {conversation.lastSeen}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedUser.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedUser.fullName}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedUser.isOnline ? 'Online' : `Last seen ${selectedUser.lastSeen}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.senderId === 'me'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className={`text-xs ${
                        message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </span>
                      {message.senderId === 'me' && (
                        <div className="ml-2">
                          {message.isRead ? (
                            <CheckCheck className="h-3 w-3 text-blue-100" />
                          ) : (
                            <Check className="h-3 w-3 text-blue-100" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <Button type="button" variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button type="button" variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="border-0 focus:ring-0 bg-gray-100"
                  />
                </div>
                <Button type="button" variant="outline" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <Send className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
                Choose a conversation from the sidebar to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

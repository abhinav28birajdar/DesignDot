"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Globe,
  Moon,
  Sun,
  Monitor,
  Mail,
  MessageCircle,
  Heart,
  UserPlus,
  Download,
  Share2,
  Trash2,
  LogOut,
  ArrowLeft,
  Save
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { signOut } = useAuth();
  const router = useRouter();
  
  const [activeSection, setActiveSection] = useState('account');
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    // Account Settings
    email: 'alex@designpro.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    commentNotifications: true,
    likeNotifications: true,
    followNotifications: true,
    messageNotifications: true,
    marketingEmails: false,
    
    // Privacy Settings
    profileVisibility: 'public',
    showEmail: false,
    showOnlineStatus: true,
    allowMessagesFrom: 'followers',
    showActivity: true,
    indexProfile: true,
    
    // Appearance Settings
    theme: 'system',
    language: 'en',
    timeZone: 'UTC',
    
    // Download Settings
    defaultDownloadQuality: 'high',
    watermarkDownloads: false
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Here you would save settings to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Show success message
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/thanks');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      console.log('Account deletion requested');
    }
  };

  const sections = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Monitor },
    { id: 'downloads', label: 'Downloads', icon: Download }
  ];

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/profile">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          </div>
          <Button onClick={handleSaveSettings} disabled={loading}>
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-64">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                            : 'text-gray-700'
                        }`}
                      >
                        <Icon className="h-5 w-5 mr-3" />
                        {section.label}
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Account Settings */}
            {activeSection === 'account' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange('email', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={settings.currentPassword}
                        onChange={(e) => handleSettingChange('currentPassword', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={settings.newPassword}
                        onChange={(e) => handleSettingChange('newPassword', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={settings.confirmPassword}
                        onChange={(e) => handleSettingChange('confirmPassword', e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">Sign Out</h4>
                        <p className="text-sm text-gray-500">Sign out of your account</p>
                      </div>
                      <Button variant="outline" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-red-600">Delete Account</h4>
                        <p className="text-sm text-gray-500">Permanently delete your account and all data</p>
                      </div>
                      <Button variant="destructive" onClick={handleDeleteAccount}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Notification Settings */}
            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                      { key: 'commentNotifications', label: 'Comments', desc: 'When someone comments on your work' },
                      { key: 'likeNotifications', label: 'Likes', desc: 'When someone likes your work' },
                      { key: 'followNotifications', label: 'New Followers', desc: 'When someone follows you' },
                      { key: 'messageNotifications', label: 'Messages', desc: 'When you receive a new message' },
                      { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional content and updates' }
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{label}</p>
                          <p className="text-sm text-gray-500">{desc}</p>
                        </div>
                        <ToggleSwitch
                          checked={settings[key as keyof typeof settings] as boolean}
                          onChange={(checked) => handleSettingChange(key, checked)}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Push Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Browser Push Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications in your browser</p>
                      </div>
                      <ToggleSwitch
                        checked={settings.pushNotifications}
                        onChange={(checked) => handleSettingChange('pushNotifications', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Visibility</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="profileVisibility">Who can see your profile?</Label>
                      <select
                        id="profileVisibility"
                        value={settings.profileVisibility}
                        onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="public">Everyone</option>
                        <option value="followers">Followers only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Show Email Address</p>
                        <p className="text-sm text-gray-500">Display your email on your profile</p>
                      </div>
                      <ToggleSwitch
                        checked={settings.showEmail}
                        onChange={(checked) => handleSettingChange('showEmail', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Show Online Status</p>
                        <p className="text-sm text-gray-500">Let others see when you're online</p>
                      </div>
                      <ToggleSwitch
                        checked={settings.showOnlineStatus}
                        onChange={(checked) => handleSettingChange('showOnlineStatus', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Show Activity</p>
                        <p className="text-sm text-gray-500">Show your likes and follows publicly</p>
                      </div>
                      <ToggleSwitch
                        checked={settings.showActivity}
                        onChange={(checked) => handleSettingChange('showActivity', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Search Engine Indexing</p>
                        <p className="text-sm text-gray-500">Allow search engines to index your profile</p>
                      </div>
                      <ToggleSwitch
                        checked={settings.indexProfile}
                        onChange={(checked) => handleSettingChange('indexProfile', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="allowMessagesFrom">Who can send you messages?</Label>
                      <select
                        id="allowMessagesFrom"
                        value={settings.allowMessagesFrom}
                        onChange={(e) => handleSettingChange('allowMessagesFrom', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="followers">Followers only</option>
                        <option value="none">No one</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'light', label: 'Light', icon: Sun },
                        { value: 'dark', label: 'Dark', icon: Moon },
                        { value: 'system', label: 'System', icon: Monitor }
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => handleSettingChange('theme', value)}
                          className={`p-4 border rounded-lg text-center hover:bg-gray-50 ${
                            settings.theme === value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          <Icon className="h-6 w-6 mx-auto mb-2" />
                          <p className="font-medium">{label}</p>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Language & Region</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        value={settings.language}
                        onChange={(e) => handleSettingChange('language', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="timeZone">Time Zone</Label>
                      <select
                        id="timeZone"
                        value={settings.timeZone}
                        onChange={(e) => handleSettingChange('timeZone', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Chicago">Central Time</option>
                        <option value="America/Denver">Mountain Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Download Settings */}
            {activeSection === 'downloads' && (
              <Card>
                <CardHeader>
                  <CardTitle>Download Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="defaultDownloadQuality">Default Download Quality</Label>
                    <select
                      id="defaultDownloadQuality"
                      value={settings.defaultDownloadQuality}
                      onChange={(e) => handleSettingChange('defaultDownloadQuality', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="original">Original Quality</option>
                      <option value="high">High Quality</option>
                      <option value="medium">Medium Quality</option>
                      <option value="low">Low Quality</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Add Watermark to Downloads</p>
                      <p className="text-sm text-gray-500">Add your signature to downloaded images</p>
                    </div>
                    <ToggleSwitch
                      checked={settings.watermarkDownloads}
                      onChange={(checked) => handleSettingChange('watermarkDownloads', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

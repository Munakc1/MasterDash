'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  FaCog, 
  FaUser, 
  FaBell, 
  FaShieldAlt, 
  FaDatabase, 
  FaEnvelope, 
  FaPalette, 
  FaGlobe, 
  FaKey,
  FaSave,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { 
  MdNotifications, 
  MdSecurity, 
  MdBackup, 
  MdLanguage,
  MdColorLens,
  MdEmail,
  MdStorage
} from 'react-icons/md';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    systemName: 'CareSewa Healthcare',
    systemLogo: '',
    adminEmail: 'admin@caresewa.in',
    supportEmail: 'support@caresewa.in',
    systemTimezone: 'Asia/Kolkata',
    dateFormat: 'DD/MM/YYYY',
    currency: 'INR',
    
    // Profile Settings
    adminName: 'System Administrator',
    adminPhone: '+91 9876543210',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    appointmentAlerts: true,
    paymentAlerts: true,
    systemAlerts: true,
    
    // Security Settings
    twoFactorAuth: false,
    sessionTimeout: '30',
    maxLoginAttempts: '3',
    passwordComplexity: true,
    
    // Theme Settings
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    darkMode: false,
    sidebarStyle: 'expanded',
    
    // Email Settings
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUsername: '',
    smtpPassword: '',
    emailEncryption: 'TLS',
    
    // Backup Settings
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: '30',
    backupLocation: 'cloud'
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings);
    alert(`${section} settings saved successfully!`);
  };

  const settingsTabs = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'theme', label: 'Theme', icon: FaPalette },
    { id: 'email', label: 'Email', icon: FaEnvelope },
    { id: 'backup', label: 'Backup', icon: FaDatabase }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            System Name
          </label>
          <Input
            value={settings.systemName}
            onChange={(e) => handleInputChange('systemName', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Email
          </label>
          <Input
            type="email"
            value={settings.adminEmail}
            onChange={(e) => handleInputChange('adminEmail', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Support Email
          </label>
          <Input
            type="email"
            value={settings.supportEmail}
            onChange={(e) => handleInputChange('supportEmail', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={settings.systemTimezone}
            onChange={(e) => handleInputChange('systemTimezone', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="Asia/Kolkata">Asia/Kolkata</option>
            <option value="America/New_York">America/New_York</option>
            <option value="Europe/London">Europe/London</option>
            <option value="Asia/Dubai">Asia/Dubai</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Format
          </label>
          <select
            value={settings.dateFormat}
            onChange={(e) => handleInputChange('dateFormat', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={settings.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <Button 
          onClick={() => handleSave('General')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaSave className="mr-2" /> Save Changes
        </Button>
      </div>
    </div>
  );

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Admin Name
          </label>
          <Input
            value={settings.adminName}
            onChange={(e) => handleInputChange('adminName', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <Input
            value={settings.adminPhone}
            onChange={(e) => handleInputChange('adminPhone', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <hr className="my-6" />
      
      <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={settings.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <Input
            type="password"
            value={settings.newPassword}
            onChange={(e) => handleInputChange('newPassword', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <Input
            type="password"
            value={settings.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button 
          onClick={() => handleSave('Profile')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaSave className="mr-2" /> Update Profile
        </Button>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Notification Channels</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">SMS Notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleInputChange('pushNotifications', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Push Notifications</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Alert Types</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.appointmentAlerts}
                onChange={(e) => handleInputChange('appointmentAlerts', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Appointment Alerts</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.paymentAlerts}
                onChange={(e) => handleInputChange('paymentAlerts', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Payment Alerts</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.systemAlerts}
                onChange={(e) => handleInputChange('systemAlerts', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">System Alerts</span>
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button 
          onClick={() => handleSave('Notifications')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaSave className="mr-2" /> Save Settings
        </Button>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session Timeout (minutes)
          </label>
          <Input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Login Attempts
          </label>
          <Input
            type="number"
            value={settings.maxLoginAttempts}
            onChange={(e) => handleInputChange('maxLoginAttempts', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Security Options</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) => handleInputChange('twoFactorAuth', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Enable Two-Factor Authentication</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.passwordComplexity}
              onChange={(e) => handleInputChange('passwordComplexity', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Enforce Password Complexity</span>
          </label>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={() => handleSave('Security')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaSave className="mr-2" /> Update Security
        </Button>
      </div>
    </div>
  );

  const renderThemeSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.primaryColor}
              onChange={(e) => handleInputChange('primaryColor', e.target.value)}
              className="h-10 w-20 border border-gray-300 rounded-md cursor-pointer"
            />
            <Input
              value={settings.primaryColor}
              onChange={(e) => handleInputChange('primaryColor', e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Secondary Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.secondaryColor}
              onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
              className="h-10 w-20 border border-gray-300 rounded-md cursor-pointer"
            />
            <Input
              value={settings.secondaryColor}
              onChange={(e) => handleInputChange('secondaryColor', e.target.value)}
              className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Display Options</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => handleInputChange('darkMode', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">Dark Mode</span>
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sidebar Style
            </label>
            <select
              value={settings.sidebarStyle}
              onChange={(e) => handleInputChange('sidebarStyle', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            >
              <option value="expanded">Expanded</option>
              <option value="collapsed">Collapsed</option>
              <option value="mini">Mini</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={() => handleSave('Theme')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaSave className="mr-2" /> Apply Theme
        </Button>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Host
          </label>
          <Input
            value={settings.smtpHost}
            onChange={(e) => handleInputChange('smtpHost', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="smtp.gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Port
          </label>
          <Input
            value={settings.smtpPort}
            onChange={(e) => handleInputChange('smtpPort', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="587"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <Input
            value={settings.smtpUsername}
            onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="your-email@gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <Input
            type="password"
            value={settings.smtpPassword}
            onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="App Password"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Encryption
          </label>
          <select
            value={settings.emailEncryption}
            onChange={(e) => handleInputChange('emailEncryption', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="TLS">TLS</option>
            <option value="SSL">SSL</option>
            <option value="NONE">None</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Test Connection
        </Button>
        <Button 
          onClick={() => handleSave('Email')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaSave className="mr-2" /> Save Email Settings
        </Button>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Backup Frequency
          </label>
          <select
            value={settings.backupFrequency}
            onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Retention Period (days)
          </label>
          <Input
            type="number"
            value={settings.backupRetention}
            onChange={(e) => handleInputChange('backupRetention', e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Backup Location
          </label>
          <select
            value={settings.backupLocation}
            onChange={(e) => handleInputChange('backupLocation', e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          >
            <option value="local">Local Storage</option>
            <option value="cloud">Cloud Storage</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Backup Options</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.autoBackup}
            onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-gray-700">Enable Automatic Backup</span>
        </label>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Backups</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Database Backup - 2025-06-07 10:30 AM</span>
            <span className="text-green-600">Success</span>
          </div>
          <div className="flex justify-between">
            <span>Full System Backup - 2025-06-06 11:00 PM</span>
            <span className="text-green-600">Success</span>
          </div>
          <div className="flex justify-between">
            <span>Database Backup - 2025-06-06 10:30 AM</span>
            <span className="text-green-600">Success</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Create Backup Now
        </Button>
        <Button 
          onClick={() => handleSave('Backup')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <FaSave className="mr-2" /> Save Backup Settings
        </Button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'profile':
        return renderProfileSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'theme':
        return renderThemeSettings();
      case 'email':
        return renderEmailSettings();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
            <p className="text-gray-600 mt-1">Manage your system configuration and preferences</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 p-6">
            {/* Settings Navigation */}
            <div className="lg:w-64">
              <nav className="space-y-2">
                {settingsTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="mr-3 h-4 w-4" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 capitalize">
                  {settingsTabs.find(tab => tab.id === activeTab)?.label} Settings
                </h2>
                <p className="text-gray-600 mt-1">
                  Configure your {settingsTabs.find(tab => tab.id === activeTab)?.label.toLowerCase()} preferences
                </p>
              </div>
              
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
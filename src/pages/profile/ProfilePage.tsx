import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile, useUpdateUserProfile } from '@/hooks/useApi';
import { AuthService } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Shield,
  Key
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { data: profileResponse, isLoading } = useUserProfile();
  const updateProfile = useUpdateUserProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const profile = profileResponse?.data;

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData({});
    } else {
      setEditData({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone_number: profile?.phone_number || '',
        city: profile?.city || '',
        height_cm: profile?.height_cm || '',
        weight_kg: profile?.weight_kg || '',
        primary_fitness_goal: profile?.primary_fitness_goal || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile.mutateAsync(editData);
      
      // Update user context if basic info changed
      if (editData.first_name || editData.last_name) {
        updateUser({
          first_name: editData.first_name,
          last_name: editData.last_name,
        });
      }
      
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      await AuthService.changePassword(passwordData.currentPassword, passwordData.newPassword);
      toast.success('Password changed successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error('Failed to change password');
    }
  };

  const getUserInitials = () => {
    if (user?.first_name && user?.last_name) {
      return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();
    }
    if (user?.username) {
      return user.username.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateBMI = (height?: number, weight?: number) => {
    if (!height || !weight) return null;
    const heightInM = height / 100;
    return (weight / (heightInM * heightInM)).toFixed(1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage 
                      src={profile?.profile_picture_url} 
                      alt={user?.username || 'User'} 
                    />
                    <AvatarFallback className="text-lg">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">
                    {user?.first_name && user?.last_name 
                      ? `${user.first_name} ${user.last_name}`
                      : user?.username || 'User'
                    }
                  </h2>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {user?.role === 'admin' ? 'Admin' : 'Member'}
                    </Badge>
                    <Badge variant="outline">
                      Joined {formatDate(user?.created_at)}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Your personal details and contact information
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={handleEditToggle}
                  disabled={updateProfile.isPending}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  {isEditing ? (
                    <Input
                      value={editData.first_name || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, first_name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm py-2">{user?.first_name || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Last Name</Label>
                  {isEditing ? (
                    <Input
                      value={editData.last_name || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, last_name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm py-2">{user?.last_name || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  {isEditing ? (
                    <Input
                      value={editData.phone_number || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone_number: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm py-2">{profile?.phone_number || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>City</Label>
                  {isEditing ? (
                    <Input
                      value={editData.city || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, city: e.target.value }))}
                    />
                  ) : (
                    <p className="text-sm py-2">{profile?.city || 'Not set'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <p className="text-sm py-2">
                    {formatDate(profile?.date_of_birth)}
                    {profile?.date_of_birth && (
                      <span className="text-muted-foreground ml-2">
                        (Age: {calculateAge(profile.date_of_birth)})
                      </span>
                    )}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <p className="text-sm py-2 capitalize">
                    {profile?.gender || 'Not set'}
                  </p>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleSaveProfile}
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
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
              )}
            </CardContent>
          </Card>

          {/* Fitness Information */}
          <Card>
            <CardHeader>
              <CardTitle>Fitness Information</CardTitle>
              <CardDescription>
                Your physical stats and fitness goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    {profile?.height_cm || '--'}
                  </div>
                  <p className="text-sm text-muted-foreground">Height (cm)</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-500">
                    {profile?.weight_kg || '--'}
                  </div>
                  <p className="text-sm text-muted-foreground">Weight (kg)</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-orange-500">
                    {calculateBMI(profile?.height_cm, profile?.weight_kg) || '--'}
                  </div>
                  <p className="text-sm text-muted-foreground">BMI</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <Label>Primary Fitness Goal</Label>
                  <p className="text-sm py-2 capitalize">
                    {profile?.primary_fitness_goal?.replace('_', ' ') || 'Not set'}
                  </p>
                </div>

                {profile?.dietary_preferences && profile.dietary_preferences.length > 0 && (
                  <div>
                    <Label>Dietary Preferences</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.dietary_preferences.map((pref, index) => (
                        <Badge key={index} variant="outline">
                          {pref.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {profile?.allergies && profile.allergies.length > 0 && (
                  <div>
                    <Label>Allergies</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profile.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Security
              </CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ 
                      ...prev, 
                      currentPassword: e.target.value 
                    }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ 
                      ...prev, 
                      newPassword: e.target.value 
                    }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ 
                      ...prev, 
                      confirmPassword: e.target.value 
                    }))}
                    required
                  />
                </div>

                <Button type="submit" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>
                Customize your app experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about your memberships and workouts
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders and motivational messages
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Privacy Settings</Label>
                    <p className="text-sm text-muted-foreground">
                      Control who can see your fitness data
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
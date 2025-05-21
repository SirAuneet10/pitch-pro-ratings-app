
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ProfilePage = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [profileImage, setProfileImage] = useState<string | null>(currentUser?.profilePicture || null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle profile image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // In a real application, this would upload to a storage service
    // For this demo, we'll use FileReader to convert to base64
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setProfileImage(result);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      updateUserProfile({
        bio,
        profilePicture: profileImage || undefined,
      });
      setIsLoading(false);
    }, 500);
  };

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  const initials = currentUser.name 
    ? currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase() 
    : currentUser.email.substring(0, 2).toUpperCase();

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Info</CardTitle>
              <CardDescription>Your public player profile</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={profileImage || undefined} alt={currentUser.name || currentUser.email} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-medium">{currentUser.name || currentUser.email.split('@')[0]}</h3>
              <p className="text-muted-foreground mb-2">{currentUser.email}</p>
              {currentUser.position && (
                <span className="px-3 py-1 bg-secondary rounded-full text-sm font-medium">
                  {currentUser.position}
                </span>
              )}
            </CardContent>
          </Card>
          
          {/* Edit Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-image">Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profileImage || undefined} alt="Preview" />
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <Input 
                      id="profile-image" 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell others about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;

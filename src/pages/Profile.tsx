import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Target, Star, Edit2, Save, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    location: "",
    class_level: "",
    age: null as number | null,
    academic_interests: [] as string[],
    gender: "",
    preferences: {} as any,
    quiz_results: {} as any
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          setProfile({
            full_name: data.full_name || "",
            phone: data.phone || "",
            location: data.location || "",
            class_level: data.class_level || "",
            age: data.age,
            academic_interests: data.academic_interests || [],
            gender: data.gender || "",
            preferences: data.preferences || {},
            quiz_results: data.quiz_results || {}
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, toast]);

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: profile.full_name,
          phone: profile.phone,
          location: profile.location,
          class_level: profile.class_level,
          age: profile.age,
          academic_interests: profile.academic_interests,
          gender: profile.gender,
          preferences: profile.preferences,
          quiz_results: profile.quiz_results
        });

      if (error) throw error;

      setIsEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile changes",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | null) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-card">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <User className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
                <p className="text-muted-foreground mb-6">
                  Please log in to view and manage your profile.
                </p>
                <Button onClick={() => window.location.href = '/auth'}>
                  Go to Login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="shadow-hero mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {(profile.full_name || user.email || "U").split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                 <div className="flex-1 text-center md:text-left">
                   <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                     <div>
                       <h1 className="text-3xl font-bold mb-2">{profile.full_name || user.email}</h1>
                       <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                         {profile.class_level && <Badge className="bg-primary">{profile.class_level}</Badge>}
                         {profile.location && <Badge variant="outline">{profile.location}</Badge>}
                       </div>
                     </div>
                     <Button
                       variant={isEditing ? "default" : "outline"}
                       onClick={isEditing ? handleSave : () => setIsEditing(true)}
                       className="mt-4 md:mt-0"
                       disabled={saving}
                     >
                       {saving ? (
                         <>
                           <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                           Saving...
                         </>
                       ) : isEditing ? (
                         <>
                           <Save className="h-4 w-4 mr-2" />
                           Save Changes
                         </>
                       ) : (
                         <>
                           <Edit2 className="h-4 w-4 mr-2" />
                           Edit Profile
                         </>
                       )}
                     </Button>
                   </div>
                   
                   <p className="text-muted-foreground">
                     {profile.preferences?.bio || "Complete your profile to get personalized recommendations."}
                   </p>
                 </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={profile.full_name}
                        onChange={(e) => handleInputChange('full_name', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{profile.full_name || "Not provided"}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    {isEditing ? (
                      <Input
                        id="age"
                        type="number"
                        value={profile.age || ""}
                        onChange={(e) => handleInputChange('age', e.target.value ? parseInt(e.target.value) : null)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">
                        {profile.age || "Not provided"}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{user.email}</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{profile.phone || "Not provided"}</span>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  {isEditing ? (
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{profile.location || "Not provided"}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="class">Current Class</Label>
                    {isEditing ? (
                      <Select value={profile.class_level} onValueChange={(value) => handleInputChange('class_level', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10th">10th Grade</SelectItem>
                          <SelectItem value="11th">11th Grade</SelectItem>
                          <SelectItem value="12th">12th Grade</SelectItem>
                          <SelectItem value="Graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{profile.class_level || "Not provided"}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    {isEditing ? (
                      <Select value={profile.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                          <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{profile.gender || "Not provided"}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Academic Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.academic_interests && profile.academic_interests.length > 0 ? (
                      profile.academic_interests.map((interest, index) => (
                        <Badge key={index} variant="secondary">
                          {interest}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No interests added yet</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Achievements & Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Quiz Results</Label>
                  {profile.quiz_results && Object.keys(profile.quiz_results).length > 0 ? (
                    <div className="space-y-2 mt-2">
                      <p className="text-sm text-muted-foreground">
                        Quiz completed - Results available
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">No quiz results yet</p>
                  )}
                </div>

                <div>
                  <Label>Preferences</Label>
                  {profile.preferences && Object.keys(profile.preferences).length > 0 ? (
                    <p className="text-sm text-muted-foreground mt-2">
                      Preferences configured
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">No preferences set yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => window.location.href = '/quiz'}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Take Aptitude Quiz
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => window.location.href = '/roadmap'}
                >
                  <Target className="h-4 w-4 mr-2" />
                  View Career Roadmap
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => window.location.href = '/colleges'}
                >
                  <User className="h-4 w-4 mr-2" />
                  Explore Colleges
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => window.location.href = '/scholarships'}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Find Scholarships
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
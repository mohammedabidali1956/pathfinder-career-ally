import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Target, Star, Edit2, Save } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 9876543210",
    class: "12th",
    stream: "Science",
    location: "New Delhi, India",
    dateOfBirth: "2005-06-15",
    interests: ["Physics", "Mathematics", "Computer Science", "Engineering"],
    careerGoals: "Become a Software Engineer",
    bio: "Passionate about technology and innovation. Aspiring to pursue computer science engineering.",
    achievements: [
      "School Topper in Mathematics",
      "Science Olympiad State Level Winner",
      "Coding Competition Winner"
    ],
    skills: ["Programming", "Problem Solving", "Leadership", "Communication"]
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', profile);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

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
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        <Badge className="bg-primary">{profile.class} - {profile.stream}</Badge>
                        <Badge variant="outline">{profile.location}</Badge>
                      </div>
                    </div>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      onClick={isEditing ? handleSave : () => setIsEditing(true)}
                      className="mt-4 md:mt-0"
                    >
                      {isEditing ? (
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
                  
                  <p className="text-muted-foreground">{profile.bio}</p>
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
                        value={profile.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{profile.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    {isEditing ? (
                      <Input
                        id="dob"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(profile.dateOfBirth).toLocaleDateString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  {isEditing ? (
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <div className="flex items-center mt-1">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{profile.email}</span>
                    </div>
                  )}
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
                      <span className="text-sm text-muted-foreground">{profile.phone}</span>
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
                      <span className="text-sm text-muted-foreground">{profile.location}</span>
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
                      <Select value={profile.class} onValueChange={(value) => handleInputChange('class', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10th">10th Grade</SelectItem>
                          <SelectItem value="11th">11th Grade</SelectItem>
                          <SelectItem value="12th">12th Grade</SelectItem>
                          <SelectItem value="Graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{profile.class}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="stream">Stream</Label>
                    {isEditing ? (
                      <Select value={profile.stream} onValueChange={(value) => handleInputChange('stream', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                          <SelectItem value="Arts">Arts</SelectItem>
                          <SelectItem value="Vocational">Vocational</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-1">{profile.stream}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="career-goals">Career Goals</Label>
                  {isEditing ? (
                    <Textarea
                      id="career-goals"
                      value={profile.careerGoals}
                      onChange={(e) => handleInputChange('careerGoals', e.target.value)}
                      placeholder="Describe your career aspirations..."
                    />
                  ) : (
                    <div className="flex items-start mt-1">
                      <Target className="h-4 w-4 mr-2 text-muted-foreground mt-0.5" />
                      <span className="text-sm text-muted-foreground">{profile.careerGoals}</span>
                    </div>
                  )}
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
                  <Label>Achievements</Label>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {profile.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Label>Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profile.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
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
                  onClick={() => console.log('Take aptitude quiz')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Retake Aptitude Quiz
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => console.log('View recommendations')}
                >
                  <Target className="h-4 w-4 mr-2" />
                  View Career Recommendations
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => console.log('Update preferences')}
                >
                  <User className="h-4 w-4 mr-2" />
                  Update Preferences
                </Button>
                <Button 
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => console.log('Download profile')}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Download Profile Summary
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
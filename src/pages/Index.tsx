import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, GraduationCap, DollarSign, Calendar, UserCircle, Target, TrendingUp, Award } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Aptitude Assessment",
      description: "Discover your strengths and interests with our comprehensive aptitude quiz.",
      color: "primary" as const,
      onClick: () => console.log('Navigate to quiz'),
    },
    {
      icon: GraduationCap,
      title: "Course Mapping",
      description: "Explore courses and their career prospects. From B.Sc to BBA, find your path.",
      color: "education" as const,
      onClick: () => console.log('Navigate to courses'),
    },
    {
      icon: Users,
      title: "College Directory",
      description: "Find colleges based on location, courses, cutoffs, and facilities.",
      color: "career" as const,
      onClick: () => console.log('Navigate to colleges'),
    },    
    {
      icon: DollarSign,
      title: "Scholarships",
      description: "Discover scholarships with eligibility criteria, benefits, and deadlines.",
      color: "success" as const,
      onClick: () => console.log('Navigate to scholarships'),
    },
    {
      icon: Calendar,
      title: "Timeline Tracker",
      description: "Never miss important admission dates and scholarship deadlines.",
      color: "primary" as const,
      onClick: () => console.log('Navigate to timeline'),
    },
    {
      icon: UserCircle,
      title: "Student Profile",
      description: "Create your profile and track your academic journey and interests.",
      color: "career" as const,
      onClick: () => console.log('Navigate to profile'),
    },
  ];

  const stats = [
    { icon: Target, value: "10,000+", label: "Students Guided" },
    { icon: TrendingUp, value: "500+", label: "Career Paths" },
    { icon: Award, value: "1,000+", label: "Scholarships Listed" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need for Your Career Journey
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From aptitude assessment to college selection, we provide comprehensive tools 
              to guide your educational and career decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4">
                <stat.icon className="h-12 w-12 mx-auto opacity-80" />
                <div>
                  <div className="text-4xl font-bold">{stat.value}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="shadow-hero bg-gradient-card border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">Ready to Start Your Journey?</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl text-muted-foreground mb-6">
                Join thousands of students who have found their perfect career path with CareerGuide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-hero transition-all duration-300"
                  onClick={() => console.log('Create account')}
                >
                  Create Your Profile
                </button>
                <button 
                  className="border border-primary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                  onClick={() => console.log('Take quiz')}
                >
                  Take Free Assessment
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;

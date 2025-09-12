import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, GraduationCap, DollarSign, Calendar, UserCircle } from "lucide-react";

const Navigation = () => {
  const navigationItems = [
    { icon: BookOpen, label: "Aptitude Quiz", href: "/quiz", color: "primary" },
    { icon: GraduationCap, label: "Course Mapping", href: "/courses", color: "education" },
    { icon: Users, label: "College Directory", href: "/colleges", color: "career" },
    { icon: DollarSign, label: "Scholarships", href: "/scholarships", color: "success" },
    { icon: Calendar, label: "Timeline", href: "/timeline", color: "primary" },
    { icon: UserCircle, label: "Profile", href: "/profile", color: "career" },
  ];

  return (
    <nav className="w-full bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CareerGuide
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-gradient-card"
                onClick={() => console.log(`Navigate to ${item.href}`)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          <Button className="md:hidden">Menu</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
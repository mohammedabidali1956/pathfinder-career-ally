import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuizClick = () => {
    if (user) {
      navigate('/quiz');
    } else {
      navigate('/auth', { state: { from: { pathname: '/quiz' } } });
    }
  };

  const handleExploreClick = () => {
    if (user) {
      navigate('/courses');
    } else {
      navigate('/auth', { state: { from: { pathname: '/courses' } } });
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Your Future Starts Here
            </h1>
            <p className="text-xl lg:text-2xl opacity-90">
              Discover your potential with our comprehensive career guidance system. 
              Take assessments, explore courses, and find your perfect career path.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg shadow-hero"
                onClick={handleQuizClick}
              >
                Take Aptitude Quiz
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/60 bg-white/10 text-white hover:bg-white/20 hover:border-white px-8 py-3 text-lg backdrop-blur-sm"
                onClick={handleExploreClick}
              >
                Explore Features
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <Card className="overflow-hidden shadow-hero transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img 
                src={heroImage} 
                alt="Students exploring career opportunities" 
                className="w-full h-[400px] object-cover"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
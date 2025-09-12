import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: "primary" | "education" | "career" | "success";
  onClick: () => void;
}

const FeatureCard = ({ icon: Icon, title, description, color, onClick }: FeatureCardProps) => {
  const colorClasses = {
    primary: "text-primary border-primary/20 hover:border-primary/40",
    education: "text-education border-education/20 hover:border-education/40",
    career: "text-career border-career/20 hover:border-career/40",
    success: "text-success border-success/20 hover:border-success/40",
  };

  return (
    <Card className={`shadow-card hover:shadow-hero transition-all duration-300 cursor-pointer bg-gradient-card ${colorClasses[color]}`}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 rounded-full bg-background shadow-card">
          <Icon className={`h-8 w-8 ${colorClasses[color].split(' ')[0]}`} />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button 
          onClick={onClick}
          className={`w-full transition-smooth ${
            color === 'primary' ? 'bg-primary hover:bg-primary-hover' :
            color === 'education' ? 'bg-education hover:bg-education/90' :
            color === 'career' ? 'bg-career hover:bg-career/90' :
            'bg-success hover:bg-success/90'
          } text-white`}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
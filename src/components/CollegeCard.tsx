import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Info, GitCompare, MapPin, Star, Calendar, DollarSign, GraduationCap, Award } from "lucide-react";

export interface College {
  id: number;
  name: string;
  location: string;
  state?: string;
  type: string;
  rating?: number;
  establishedYear?: number;
  description: string;
  courses: string[];
  fees: string;
  cutoff?: string;
  facilities: string[];
  website: string;
  affiliation?: string;
  accreditations?: string[];
  placements?: {
    rate?: string;
    highest?: string;
    average?: string;
  };
}

interface CollegeCardProps {
  college: College;
  onGetAdmissionInfo: (college: College) => void;
  onCompareCollege: (college: College) => void;
  isSelected: boolean;
}

const CollegeCard = ({ college, onGetAdmissionInfo, onCompareCollege, isSelected }: CollegeCardProps) => {
  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'library': return '📚';
      case 'hostel': return '🏠';
      case 'labs': return '🔬';
      case 'sports': return '⚽';
      case 'cafeteria': return '🍽️';
      case 'wifi': return '📶';
      case 'transport': return '🚌';
      case 'placement cell': return '💼';
      default: return '✨';
    }
  };

  return (
    <Card className={`shadow-card hover:shadow-hero transition-all duration-300 ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold leading-tight">{college.name}</CardTitle>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{college.location}</span>
              {college.establishedYear && (
                <>
                  <Calendar className="h-4 w-4 ml-2" />
                  <span>Est. {college.establishedYear}</span>
                </>
              )}
            </div>
          </div>
          {college.rating && (
            <div className="flex items-center bg-primary/10 px-2 py-1 rounded-lg">
              <Star className="h-4 w-4 text-primary mr-1" />
              <span className="text-sm font-medium">{college.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          <Badge variant="secondary" className="text-xs">{college.type}</Badge>
          {college.affiliation && (
            <Badge variant="outline" className="text-xs">{college.affiliation}</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{college.description}</p>
        
        {/* Accreditations */}
        {college.accreditations && college.accreditations.length > 0 && (
          <div>
            <h4 className="font-semibold text-xs mb-2 flex items-center">
              <Award className="h-3 w-3 mr-1" />
              Accreditations:
            </h4>
            <div className="flex flex-wrap gap-1">
              {college.accreditations.map((acc) => (
                <Badge key={acc} variant="outline" className="text-xs bg-success/10">
                  {acc}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Courses */}
        <div>
          <h4 className="font-semibold text-xs mb-2 flex items-center">
            <GraduationCap className="h-3 w-3 mr-1" />
            Available Courses:
          </h4>
          <div className="flex flex-wrap gap-1">
            {college.courses.slice(0, 3).map((course) => (
              <Badge key={course} variant="outline" className="text-xs">
                {course}
              </Badge>
            ))}
            {college.courses.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{college.courses.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Placements */}
        {college.placements && (
          <div>
            <h4 className="font-semibold text-xs mb-2">Placements:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {college.placements.rate && (
                <div>Rate: <span className="font-medium">{college.placements.rate}</span></div>
              )}
              {college.placements.highest && (
                <div>Highest: <span className="font-medium">{college.placements.highest}</span></div>
              )}
            </div>
          </div>
        )}

        {/* Facilities */}
        <div>
          <h4 className="font-semibold text-xs mb-2">Facilities:</h4>
          <div className="flex flex-wrap gap-1">
            {college.facilities.slice(0, 4).map((facility) => (
              <div key={facility} className="flex items-center text-xs bg-muted px-2 py-1 rounded">
                <span className="mr-1">{getFacilityIcon(facility)}</span>
                {facility}
              </div>
            ))}
            {college.facilities.length > 4 && (
              <div className="text-xs text-muted-foreground">+{college.facilities.length - 4} more</div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm pt-2 border-t">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-success" />
            <span className="font-semibold">{college.fees}</span>
          </div>
          {college.cutoff && (
            <div className="text-muted-foreground">
              <strong>Cutoff:</strong> {college.cutoff}
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => window.open(college.website, '_blank')}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Visit Website
          </Button>
          <Button 
            size="sm"
            variant="outline"
            onClick={() => onGetAdmissionInfo(college)}
          >
            <Info className="h-3 w-3 mr-1" />
            Admission Info
          </Button>
          <Button 
            size="sm"
            variant="outline"
            onClick={() => onCompareCollege(college)}
          >
            <GitCompare className="h-3 w-3 mr-1" />
            Compare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;
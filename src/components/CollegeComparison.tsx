import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, MapPin, Calendar, DollarSign, GraduationCap, Award, TrendingUp } from "lucide-react";
import type { College } from "./CollegeCard";

interface CollegeComparisonProps {
  colleges: College[];
  onRemoveCollege: (collegeId: number) => void;
  onClose: () => void;
}

const CollegeComparison = ({ colleges, onRemoveCollege, onClose }: CollegeComparisonProps) => {
  if (colleges.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">College Comparison</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Criteria</th>
                  {colleges.map((college) => (
                    <th key={college.id} className="text-left p-3 min-w-64">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-sm">{college.name}</div>
                          <div className="text-xs text-muted-foreground flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {college.location}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onRemoveCollege(college.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Established
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-3">
                      {college.establishedYear || 'N/A'}
                    </td>
                  ))}
                </tr>
                
                <tr className="border-b">
                  <td className="p-3 font-medium">Type</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-3">
                      <Badge variant="secondary" className="text-xs">{college.type}</Badge>
                    </td>
                  ))}
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    Accreditations
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {college.accreditations?.slice(0, 3).map((acc) => (
                          <Badge key={acc} variant="outline" className="text-xs">
                            {acc}
                          </Badge>
                        )) || 'N/A'}
                        {(college.accreditations?.length || 0) > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(college.accreditations?.length || 0) - 3}
                          </Badge>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Courses
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {college.courses.slice(0, 3).map((course) => (
                          <Badge key={course} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                        {college.courses.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{college.courses.length - 3}
                          </Badge>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Fees
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-3 font-semibold text-success">
                      {college.fees}
                    </td>
                  ))}
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Placement Rate
                  </td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-3">
                      {college.placements?.rate || 'N/A'}
                    </td>
                  ))}
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium">Highest Package</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-3">
                      {college.placements?.highest || 'N/A'}
                    </td>
                  ))}
                </tr>

                <tr className="border-b">
                  <td className="p-3 font-medium">Facilities</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-3">
                      <div className="text-sm">
                        {college.facilities.slice(0, 4).join(', ')}
                        {college.facilities.length > 4 && '...'}
                      </div>
                    </td>
                  ))}
                </tr>

                <tr>
                  <td className="p-3 font-medium">Website</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(college.website, '_blank')}
                        className="text-xs"
                      >
                        Visit Website
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeComparison;
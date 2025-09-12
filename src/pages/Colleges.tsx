import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, MapPin, Star, Users, Wifi, Car, Home, BookOpen, ExternalLink } from "lucide-react";

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");

  const colleges = [
    {
      id: 1,
      name: "Delhi University",
      location: "New Delhi, Delhi",
      state: "delhi",
      rating: 4.8,
      courses: ["B.A", "B.Sc", "B.Com", "M.A", "M.Sc"],
      cutoff: "85-95%",
      fees: "₹15,000-30,000/year",
      facilities: ["Library", "Sports", "Hostel", "WiFi", "Canteen", "Labs"],
      established: 1922,
      type: "Government",
      description: "One of India's premier universities offering diverse undergraduate and postgraduate programs.",
      website: "https://du.ac.in"
    },
    {
      id: 2,
      name: "IIT Mumbai",
      location: "Mumbai, Maharashtra",
      state: "maharashtra",
      rating: 4.9,
      courses: ["B.Tech", "M.Tech", "PhD"],
      cutoff: "JEE Advanced Rank 1-1000",
      fees: "₹2,50,000/year",
      facilities: ["Research Labs", "Library", "Sports Complex", "Hostel", "WiFi", "Medical Center"],
      established: 1958,
      type: "Government",
      description: "Premier engineering institute known for cutting-edge research and innovation.",
      website: "https://iitb.ac.in"
    },
    {
      id: 3,
      name: "Lady Shri Ram College",
      location: "New Delhi, Delhi",
      state: "delhi",
      rating: 4.7,
      courses: ["B.A", "B.Com", "M.A"],
      cutoff: "90-98%",
      fees: "₹25,000-40,000/year",
      facilities: ["Library", "Sports", "Auditorium", "WiFi", "Canteen"],
      established: 1956,
      type: "Government",
      description: "Prestigious women's college known for excellence in liberal arts education.",
      website: "https://lsr.edu.in"
    },
    {
      id: 4,
      name: "Christ University",
      location: "Bangalore, Karnataka",
      state: "karnataka",
      rating: 4.5,
      courses: ["BBA", "B.Com", "BCA", "MBA", "MCA"],
      cutoff: "70-85%",
      fees: "₹1,50,000-2,50,000/year",
      facilities: ["Modern Campus", "International Programs", "Sports", "Hostel", "WiFi"],
      established: 1969,
      type: "Private",
      description: "Leading private university with strong industry connections and placement record.",
      website: "https://christuniversity.in"
    },
    {
      id: 5,
      name: "Jawaharlal Nehru University",
      location: "New Delhi, Delhi",
      state: "delhi",
      rating: 4.6,
      courses: ["B.A", "M.A", "M.Phil", "PhD"],
      cutoff: "75-90%",
      fees: "₹5,000-20,000/year",
      facilities: ["Library", "Research Centers", "Hostel", "Sports", "Cultural Centers"],
      established: 1969,
      type: "Government",
      description: "Renowned for social sciences, languages, and research programs.",
      website: "https://jnu.ac.in"
    },
    {
      id: 6,
      name: "SRCC Delhi",
      location: "New Delhi, Delhi",
      state: "delhi",
      rating: 4.8,
      courses: ["B.Com", "B.A Economics", "M.Com"],
      cutoff: "95-99%",
      fees: "₹20,000-35,000/year",
      facilities: ["Library", "Computer Labs", "Sports", "WiFi", "Placement Cell"],
      established: 1926,
      type: "Government",
      description: "Top commerce college in India with excellent placement opportunities.",
      website: "https://srcc.du.ac.in"
    }
  ];

  const states = ["delhi", "maharashtra", "karnataka", "tamil nadu", "west bengal", "rajasthan"];
  const courses = ["B.A", "B.Sc", "B.Com", "B.Tech", "BBA", "BCA"];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === "all" || college.state === selectedState;
    const matchesCourse = selectedCourse === "all" || 
                         college.courses.some(course => course.toLowerCase().includes(selectedCourse.toLowerCase()));
    return matchesSearch && matchesState && matchesCourse;
  });

  const getFacilityIcon = (facility: string) => {
    const icons: { [key: string]: any } = {
      "WiFi": Wifi,
      "Hostel": Home,
      "Sports": Users,
      "Library": BookOpen,
      "Parking": Car
    };
    return icons[facility] || BookOpen;
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">College Directory</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect college based on location, courses, and facilities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search colleges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    {states.map(state => (
                      <SelectItem key={state} value={state} className="capitalize">
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map(course => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* College Cards */}
        <div className="max-w-6xl mx-auto space-y-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="shadow-card hover:shadow-hero transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-2xl font-bold">{college.name}</CardTitle>
                      <Badge variant={college.type === "Government" ? "default" : "secondary"}>
                        {college.type}
                      </Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {college.location}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="font-semibold">{college.rating}</span>
                      </div>
                      <span>Est. {college.established}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(college.website, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Visit Website
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{college.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Available Courses:</h4>
                    <div className="flex flex-wrap gap-1">
                      {college.courses.map((course) => (
                        <Badge key={course} variant="outline" className="text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Facilities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.facilities.slice(0, 4).map((facility) => {
                        const Icon = getFacilityIcon(facility);
                        return (
                          <div key={facility} className="flex items-center text-xs bg-muted rounded-full px-2 py-1">
                            <Icon className="h-3 w-3 mr-1" />
                            {facility}
                          </div>
                        );
                      })}
                      {college.facilities.length > 4 && (
                        <div className="text-xs bg-muted rounded-full px-2 py-1">
                          +{college.facilities.length - 4} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 pt-2 border-t">
                  <div>
                    <span className="font-semibold text-sm">Cutoff: </span>
                    <span className="text-sm text-primary font-semibold">{college.cutoff}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-sm">Fees: </span>
                    <span className="text-sm text-success font-semibold">{college.fees}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1"
                    onClick={() => console.log('Get admission info for', college.name)}
                  >
                    Get Admission Info
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => console.log('Compare colleges')}
                  >
                    Compare
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;
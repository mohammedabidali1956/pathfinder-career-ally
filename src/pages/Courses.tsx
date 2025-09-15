import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, GraduationCap, TrendingUp, Clock, DollarSign, Map } from "lucide-react";

const Courses = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStream, setSelectedStream] = useState("all");

  const courses = [
    {
      id: 1,
      name: "Bachelor of Science (B.Sc)",
      stream: "science",
      duration: "3 years",
      description: "Comprehensive science education with specializations in Physics, Chemistry, Mathematics, Biology, Computer Science, Environmental Science.",
      careers: ["Research Scientist", "Lab Technician", "Data Analyst", "Quality Control", "Teaching"],
      higherStudy: ["M.Sc", "MBA", "MCA", "PhD"],
      averageSalary: "₹3–6 LPA",
      eligibility: "12th with Science (PCM/PCB)",
      color: "primary"
    },
    {
      id: 2,
      name: "Bachelor of Arts (B.A)",
      stream: "arts",
      duration: "3 years",
      description: "Liberal arts education with majors in History, Literature, Psychology, Political Science, Sociology, Economics.",
      careers: ["Civil Services", "Journalism", "Teaching", "Social Work"],
      higherStudy: ["M.A", "MBA", "LLB", "B.Ed"],
      averageSalary: "₹2.5–5 LPA",
      eligibility: "12th in any stream",
      color: "education"
    },
    {
      id: 3,
      name: "Bachelor of Commerce (B.Com)",
      stream: "commerce",
      duration: "3 years",
      description: "Business and commerce education covering Accounting, Finance, Economics, Business Law.",
      careers: ["Chartered Accountant", "Financial Analyst", "Banking", "Business Management"],
      higherStudy: ["M.Com", "MBA", "CA", "CS"],
      averageSalary: "₹3–7 LPA",
      eligibility: "12th with Commerce (preferred), Arts/Science allowed",
      color: "career"
    },
    {
      id: 4,
      name: "Bachelor of Business Administration (BBA)",
      stream: "commerce",
      duration: "3 years",
      description: "Management education focusing on Business Strategy, Marketing, HR, Operations.",
      careers: ["Business Manager", "Marketing Executive", "HR Professional", "Entrepreneur"],
      higherStudy: ["MBA", "PGDM", "Specialized Masters"],
      averageSalary: "₹4–8 LPA",
      eligibility: "12th in any stream (some colleges prefer English/Math)",
      color: "success"
    },
    {
      id: 5,
      name: "Polytechnic Diploma",
      stream: "vocational",
      duration: "3 years",
      description: "Practical engineering in Mechanical, Civil, Electrical, Electronics, Computer Science.",
      careers: ["Junior Engineer", "Technician", "Supervisor", "ITI Instructor"],
      higherStudy: ["B.Tech (Lateral Entry)", "AMIE", "Specialized Diplomas"],
      averageSalary: "₹2–5 LPA",
      eligibility: "10th pass (SSC/CBSE/ICSE) + TS POLYCET",
      color: "primary"
    },
    {
      id: 6,
      name: "Bachelor of Engineering (B.E/B.Tech)",
      stream: "science",
      duration: "4 years",
      description: "Engineering education in various specializations - CS, Mechanical, Civil, Electrical, AI/ML.",
      careers: ["Software Engineer", "Design Engineer", "Project Manager", "Consultant"],
      higherStudy: ["M.Tech", "MBA", "MS", "PhD"],
      averageSalary: "₹4–12 LPA",
      eligibility: "12th with PCM + Entrance Exam (TS EAMCET/JEE)",
      color: "career"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStream = selectedStream === "all" || course.stream === selectedStream;
    return matchesSearch && matchesStream;
  });

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Course to Career Mapping</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore courses and discover the career opportunities they offer
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Streams</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="arts">Arts</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="vocational">Vocational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="shadow-card hover:shadow-hero transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">{course.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="capitalize">{course.stream}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                    </div>
                  </div>
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{course.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Career Opportunities:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {course.careers.map((career) => (
                        <Badge key={career} variant="outline" className="text-xs">
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Higher Study Options:</h4>
                    <div className="flex flex-wrap gap-1">
                      {course.higherStudy.map((study) => (
                        <Badge key={study} variant="outline" className="text-xs bg-education/10">
                          {study}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-success" />
                      <span className="font-semibold">{course.averageSalary}</span>
                    </div>
                    <div className="text-muted-foreground">
                      <strong>Eligibility:</strong> {course.eligibility}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      const courseParam = course.name.toLowerCase()
                        .replace(/[()]/g, '')
                        .replace(/bachelor of science/i, 'bsc')
                        .replace(/bachelor of arts/i, 'ba')
                        .replace(/bachelor of commerce/i, 'bcom')
                        .replace(/bachelor of business administration/i, 'bba')
                        .replace(/bachelor of engineering.*|b\.e\/b\.tech/i, 'btech')
                        .replace(/polytechnic diploma/i, 'polytechnic');
                      navigate(`/colleges?course=${encodeURIComponent(course.name)}`);
                    }}
                  >
                    Find Colleges
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const roadmapParam = course.name.toLowerCase()
                        .replace(/[()]/g, '')
                        .replace(/bachelor of science/i, 'bsc')
                        .replace(/bachelor of arts/i, 'ba')
                        .replace(/bachelor of commerce/i, 'bcom')
                        .replace(/bachelor of business administration/i, 'bba')
                        .replace(/bachelor of engineering.*|b\.e\/b\.tech/i, 'btech')
                        .replace(/polytechnic diploma/i, 'polytechnic');
                      navigate(`/roadmap/${roadmapParam}`);
                    }}
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Roadmap
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
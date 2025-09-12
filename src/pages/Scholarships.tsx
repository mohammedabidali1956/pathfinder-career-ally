import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Search, DollarSign, Calendar, ExternalLink, Users, GraduationCap, Award } from "lucide-react";

const Scholarships = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEligibility, setSelectedEligibility] = useState("all");

  const scholarships = [
    {
      id: 1,
      name: "National Scholarship Portal (NSP)",
      category: "government",
      provider: "Government of India",
      amount: "₹12,000-80,000/year",
      deadline: "2024-03-31",
      eligibility: ["Class 12th passed", "Family income < ₹8 LPA", "Indian citizen"],
      description: "Comprehensive scholarship program for students from economically weaker sections.",
      benefits: ["Tuition fee support", "Maintenance allowance", "Book allowance"],
      website: "https://scholarships.gov.in",
      applicationOpen: true,
      studyLevel: "undergraduate"
    },
    {
      id: 2,
      name: "INSPIRE Scholarship",
      category: "government",
      provider: "Department of Science & Technology",
      amount: "₹80,000/year",
      deadline: "2024-02-28",
      eligibility: ["Top 1% in Class 12th", "Science stream", "Pursuing basic sciences"],
      description: "For students pursuing basic and natural sciences at undergraduate and postgraduate levels.",
      benefits: ["Full tuition fee", "Monthly stipend", "Research opportunities"],
      website: "https://inspire-dst.gov.in",
      applicationOpen: true,
      studyLevel: "undergraduate"
    },
    {
      id: 3,
      name: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
      category: "government",
      provider: "Indian Institute of Science",
      amount: "₹5,000-7,000/month",
      deadline: "2024-01-15",
      eligibility: ["Class 11th/12th", "Science stream", "KVPY exam qualified"],
      description: "Fellowship program to encourage students to pursue research in science.",
      benefits: ["Monthly fellowship", "Annual contingency", "Research exposure"],
      website: "https://kvpy.iisc.ac.in",
      applicationOpen: false,
      studyLevel: "school"
    },
    {
      id: 4,
      name: "Tata Scholarship",
      category: "private",
      provider: "Tata Education & Development Trust",
      amount: "₹2,00,000/year",
      deadline: "2024-04-30",
      eligibility: ["Undergraduate admission", "Family income < ₹6 LPA", "Merit-based"],
      description: "Need and merit-based scholarship for undergraduate students.",
      benefits: ["Tuition fee coverage", "Living allowance", "Mentorship"],
      website: "https://tatascholarship.org",
      applicationOpen: true,
      studyLevel: "undergraduate"
    },
    {
      id: 5,
      name: "Reliance Foundation Scholarship",
      category: "private",
      provider: "Reliance Foundation",
      amount: "₹2,00,000/year",
      deadline: "2024-03-15",
      eligibility: ["Class 12th 80%+", "Family income < ₹10 LPA", "Any stream"],
      description: "Undergraduate scholarship program for academically bright students.",
      benefits: ["Full academic support", "Skill development", "Internship opportunities"],
      website: "https://reliancefoundation.org",
      applicationOpen: true,
      studyLevel: "undergraduate"
    },
    {
      id: 6,
      name: "Aditya Birla Scholarship",
      category: "private",
      provider: "Aditya Birla Group",
      amount: "₹1,75,000/year",
      deadline: "2024-05-31",
      eligibility: ["IIT/IIM admission", "Top rankers", "Leadership qualities"],
      description: "For students admitted to premier institutions with leadership potential.",
      benefits: ["Financial support", "Mentoring", "Leadership development"],
      website: "https://adityabirlascholarship.com",
      applicationOpen: true,
      studyLevel: "undergraduate"
    }
  ];

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scholarship.category === selectedCategory;
    const matchesEligibility = selectedEligibility === "all" || scholarship.studyLevel === selectedEligibility;
    return matchesSearch && matchesCategory && matchesEligibility;
  });

  const getStatusColor = (deadline: string, applicationOpen: boolean) => {
    if (!applicationOpen) return "secondary";
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (daysLeft < 0) return "secondary";
    if (daysLeft < 30) return "destructive";
    if (daysLeft < 60) return "secondary";
    return "default";
  };

  const getDaysLeft = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysLeft;
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Scholarship Directory</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover scholarships to fund your education dreams
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
                    placeholder="Search scholarships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedEligibility} onValueChange={setSelectedEligibility}>
                  <SelectTrigger>
                    <SelectValue placeholder="Study Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="school">School Level</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="postgraduate">Postgraduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scholarship Cards */}
        <div className="max-w-6xl mx-auto space-y-6">
          {filteredScholarships.map((scholarship) => {
            const daysLeft = getDaysLeft(scholarship.deadline);
            const statusColor = getStatusColor(scholarship.deadline, scholarship.applicationOpen);
            
            return (
              <Card key={scholarship.id} className="shadow-card hover:shadow-hero transition-all duration-300">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-2xl font-bold">{scholarship.name}</CardTitle>
                        <Badge variant={scholarship.category === "government" ? "default" : "secondary"} className="capitalize">
                          {scholarship.category}
                        </Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Award className="h-4 w-4 mr-1" />
                        {scholarship.provider}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center text-success">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span className="font-semibold">{scholarship.amount}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{scholarship.deadline}</span>
                          <Badge variant={statusColor} className="ml-2">
                            {scholarship.applicationOpen ? 
                              (daysLeft > 0 ? `${daysLeft} days left` : "Expired") : 
                              "Closed"
                            }
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(scholarship.website, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Apply Now
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{scholarship.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        Eligibility Criteria:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {scholarship.eligibility.map((criteria, index) => (
                          <li key={index} className="text-muted-foreground">{criteria}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        Benefits:
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {scholarship.benefits.map((benefit, index) => (
                          <li key={index} className="text-muted-foreground">{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button 
                      className="flex-1"
                      disabled={!scholarship.applicationOpen || daysLeft < 0}
                      onClick={() => window.open(scholarship.website, '_blank')}
                    >
                      {scholarship.applicationOpen && daysLeft > 0 ? "Apply Now" : "Application Closed"}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => console.log('Save scholarship', scholarship.name)}
                    >
                      Save for Later
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No scholarships found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="shadow-card bg-gradient-primary text-white">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold">{scholarships.length}</div>
                  <div className="text-sm opacity-90">Total Scholarships</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {scholarships.filter(s => s.applicationOpen && getDaysLeft(s.deadline) > 0).length}
                  </div>
                  <div className="text-sm opacity-90">Currently Open</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">₹80L+</div>
                  <div className="text-sm opacity-90">Total Value Available</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Scholarships;
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search, GraduationCap } from "lucide-react";
import CollegeCard, { type College } from "@/components/CollegeCard";
import CollegeComparison from "@/components/CollegeComparison";
import AdmissionInfoModal from "@/components/AdmissionInfoModal";

const Colleges = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedAccreditation, setSelectedAccreditation] = useState("all");
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [compareColleges, setCompareColleges] = useState<College[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Extract course filter from URL params if coming from courses page
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const courseParam = searchParams.get('course');
    if (courseParam) {
      const courseMapping: Record<string, string> = {
        'Bachelor of Engineering (B.E/B.Tech)': 'btech',
        'Bachelor of Science (B.Sc)': 'bsc',
        'Bachelor of Arts (B.A)': 'ba',
        'Bachelor of Commerce (B.Com)': 'bcom',
        'Bachelor of Business Administration (BBA)': 'bba',
        'Polytechnic Diploma': 'polytechnic'
      };
      const mappedCourse = courseMapping[courseParam];
      if (mappedCourse) {
        setSelectedCourse(mappedCourse);
      }
    }
  }, [location.search]);

  const colleges: College[] = [
    // B.E/B.Tech Colleges
    {
      id: 1,
      name: "CBIT – Chaitanya Bharathi Institute of Technology",
      location: "Kokapet, Ranga Reddy, Hyderabad – 500075",
      type: "Private",
      rating: 4.5,
      establishedYear: 1979,
      description: "Autonomous engineering institute with NAAC A++ grade, offering 23 B.E/B.Tech branches with strong industry connections.",
      courses: ["B.E/B.Tech (23 branches)", "M.E/M.Tech", "MBA", "MCA"],
      fees: "₹1,50,600 – ₹5,60,000",
      facilities: ["Library", "Labs", "Hostel", "Sports", "WiFi", "Placement Cell", "Cafeteria"],
      website: "https://www.cbit.ac.in",
      affiliation: "Osmania University",
      accreditations: ["NAAC A++", "NBA", "AICTE", "UGC Autonomous"],
      placements: {
        rate: "85%+",
        highest: "₹25 LPA",
        average: "₹6 LPA"
      }
    },
    {
      id: 2,
      name: "IARE – Institute of Aeronautical Engineering",
      location: "Dundigal Road, Hyderabad – 500043",
      type: "Private",
      rating: 4.4,
      establishedYear: 2000,
      description: "Specialized in aeronautical engineering with comprehensive tech programs, 25-acre campus with modern infrastructure.",
      courses: ["B.Tech CSE", "AI & ML", "Data Science", "IT", "Aeronautical", "ECE", "EEE", "Mechanical", "Civil"],
      fees: "₹1,75,000 – ₹3,50,000",
      facilities: ["Smart Classrooms", "Labs", "Hostel", "Sports", "Library", "Cafeteria", "Transport"],
      website: "https://www.iare.ac.in",
      affiliation: "JNTU Hyderabad",
      accreditations: ["NAAC A++", "NBA", "AICTE", "UGC Autonomous"],
      placements: {
        rate: "91%",
        highest: "₹51 LPA",
        average: "₹8 LPA"
      }
    },
    {
      id: 3,
      name: "IIT Hyderabad (IITH)",
      location: "Sangareddy, Kandi, Telangana – 502285",
      type: "Government",
      rating: 4.9,
      establishedYear: 2008,
      description: "Premier Institute of National Importance with flexible curriculum, research-focused programs and innovation ecosystem.",
      courses: ["B.Tech", "M.Tech", "M.Sc", "PhD", "Design Programs"],
      fees: "₹2,50,000 – ₹3,00,000",
      facilities: ["Research Labs", "Library", "Hostel", "Sports Complex", "Medical Center", "Innovation Hub"],
      website: "https://www.iith.ac.in",
      affiliation: "Autonomous (IIT Act)",
      accreditations: ["NIRF Top Ranking", "NAAC A++", "NBA"],
      placements: {
        rate: "95%+",
        highest: "₹1.2 Cr",
        average: "₹20 LPA"
      }
    },
    {
      id: 4,
      name: "IIIT Hyderabad",
      location: "Gachibowli, Hyderabad – 500032",
      type: "PPP",
      rating: 4.8,
      establishedYear: 1998,
      description: "Top research-focused IT institution with Public-Private Partnership model, known for cutting-edge technology research.",
      courses: ["B.Tech CSE", "ECE", "AI/ML", "M.Tech", "MS", "PhD"],
      fees: "₹4,50,000 – ₹6,00,000",
      facilities: ["Research Centers", "Library", "Hostel", "Sports", "Innovation Labs", "Incubation Center"],
      website: "https://www.iiit.ac.in",
      affiliation: "Deemed University",
      accreditations: ["UGC", "NAAC", "AICTE", "MHRD Approved"],
      placements: {
        rate: "100%",
        highest: "₹74 LPA",
        average: "₹25 LPA"
      }
    },
    {
      id: 5,
      name: "MGIT – Mahatma Gandhi Institute of Technology",
      location: "Kokapet, Gandipet, Hyderabad – 500075",
      type: "Private",
      rating: 4.2,
      establishedYear: 1997,
      description: "UGC Autonomous engineering college with NBA accredited programs and strong industry partnerships.",
      courses: ["B.Tech", "M.Tech"],
      fees: "₹6,62,000 (Full Course)",
      facilities: ["Labs", "Library", "Hostel", "Sports", "WiFi", "Placement Cell"],
      website: "https://www.mgit.ac.in",
      affiliation: "JNTU Hyderabad",
      accreditations: ["NBA", "UGC Autonomous", "AICTE"],
      placements: {
        rate: "80%",
        highest: "₹15 LPA",
        average: "₹5.5 LPA"
      }
    },
    {
      id: 6,
      name: "Vasavi College of Engineering",
      location: "Ibrahim Bagh, Hyderabad – 500031",
      type: "Private",
      rating: 4.3,
      establishedYear: 1981,
      description: "Well-established engineering college with NAAC A++ grade and NBA accredited programs.",
      courses: ["B.E (Multiple Streams)", "PG Programs"],
      fees: "₹5,00,000 – ₹6,00,000 (Full Course)",
      facilities: ["Modern Labs", "Library", "Sports", "Hostel", "Transport", "Medical Center"],
      website: "https://www.vce.ac.in",
      affiliation: "Osmania University",
      accreditations: ["NAAC A++", "NBA", "AICTE"],
      placements: {
        rate: "75%",
        highest: "₹12 LPA",
        average: "₹5 LPA"
      }
    },

    // B.Sc Colleges
    {
      id: 7,
      name: "Osmania University",
      location: "Tarnaka, Secunderabad, Hyderabad",
      type: "Government",
      rating: 4.6,
      establishedYear: 1918,
      description: "Premier state university with strong research culture, offering comprehensive science programs with vast campus facilities.",
      courses: ["B.Sc Life Sciences", "Physical Sciences", "Mathematics", "Computer Science"],
      fees: "₹15,000 – ₹25,000/year",
      facilities: ["Research Labs", "Central Library", "Sports Complex", "Hostels", "Medical Center"],
      website: "https://www.osmania.ac.in",
      affiliation: "State University",
      accreditations: ["NAAC A+", "UGC"],
      placements: {
        rate: "60%",
        average: "₹4 LPA"
      }
    },
    {
      id: 8,
      name: "Nizam College",
      location: "Basheerbagh, Hyderabad",
      type: "Government",
      rating: 4.4,
      establishedYear: 1887,
      description: "Historic institution and oldest arts/science college in Telangana, popular for quality science education.",
      courses: ["B.Sc Physics", "Chemistry", "Mathematics", "Zoology", "Botany"],
      fees: "₹12,000 – ₹20,000/year",
      facilities: ["Library", "Labs", "Sports", "Cultural Centers"],
      website: "https://www.nizamcollege.ac.in",
      affiliation: "Osmania University",
      accreditations: ["NAAC", "UGC"],
      placements: {
        rate: "55%",
        average: "₹3.5 LPA"
      }
    },
    {
      id: 9,
      name: "St. Ann's College for Women",
      location: "Mehdipatnam, Hyderabad",
      type: "Private",
      rating: 4.3,
      establishedYear: 1983,
      description: "UGC 'College with Potential for Excellence' focusing on women's empowerment through quality science education.",
      courses: ["B.Sc Physical Sciences", "Biological Sciences"],
      fees: "₹25,000 – ₹35,000/year",
      facilities: ["Well-equipped Labs", "Library", "Sports", "Cultural Activities", "Counseling"],
      website: "https://www.stannscollegehyd.com",
      affiliation: "Osmania University",
      accreditations: ["UGC CPE", "NAAC"],
      placements: {
        rate: "70%",
        average: "₹4.5 LPA"
      }
    },

    // B.A Colleges  
    {
      id: 10,
      name: "Aurora's Degree & PG College",
      location: "Chikkadpally, Hyderabad",
      type: "Private",
      rating: 4.2,
      establishedYear: 1989,
      description: "Career-driven arts programs with focus on contemporary issues and practical applications.",
      courses: ["English Literature", "Mass Communication", "Political Science", "Economics"],
      fees: "₹30,000 – ₹45,000/year",
      facilities: ["Library", "Computer Labs", "Sports", "Cultural Centers", "Placement Cell"],
      website: "https://www.adpgcollege.edu.in",
      affiliation: "Osmania University",
      accreditations: ["NAAC", "UGC"],
      placements: {
        rate: "65%",
        average: "₹3.8 LPA"
      }
    },

    // B.Com Colleges
    {
      id: 11,
      name: "Indian Institute of Management & Commerce (IIMC)",
      location: "Hyderabad",
      type: "Private",
      rating: 4.4,
      establishedYear: 1985,
      description: "Specialized in commerce education with strong industry connections, focusing on Finance, HR, Marketing and IT.",
      courses: ["B.Com General", "Computers", "Honours"],
      fees: "₹35,000 – ₹50,000/year",
      facilities: ["Computer Labs", "Library", "Placement Cell", "Seminar Halls", "WiFi"],
      website: "https://www.iimchyderabad.com",
      affiliation: "Osmania University",
      accreditations: ["NAAC", "AICTE"],
      placements: {
        rate: "80%",
        average: "₹5 LPA"
      }
    },
    {
      id: 12,
      name: "Badruka College of Commerce & Arts",
      location: "Hyderabad",
      type: "Private",
      rating: 4.3,
      establishedYear: 1976,
      description: "Strong academic reputation with industry-linked programs in commerce and business studies.",
      courses: ["B.Com Computers", "Honours", "Foreign Trade"],
      fees: "₹40,000 – ₹55,000/year",
      facilities: ["Modern Labs", "Library", "Sports", "Industry Connect", "Placement Support"],
      website: "https://www.badruka.com",
      affiliation: "Osmania University",
      accreditations: ["NAAC", "UGC"],
      placements: {
        rate: "75%",
        average: "₹4.8 LPA"
      }
    },

    // BBA Colleges
    {
      id: 13,
      name: "St. Joseph's Degree & PG College",
      location: "King Koti, Hyderabad",
      type: "Private",
      rating: 4.2,
      establishedYear: 1972,
      description: "BBA with specializations and strong placement support, known for holistic business education.",
      courses: ["BBA with Multiple Specializations"],
      fees: "₹45,000 – ₹60,000/year",
      facilities: ["Business Labs", "Library", "Computer Centers", "Placement Cell", "Sports"],
      website: "https://www.josephscollege.ac.in",
      affiliation: "Osmania University",
      accreditations: ["NAAC", "UGC"],
      placements: {
        rate: "78%",
        average: "₹5.2 LPA"
      }
    },

    // Polytechnic Colleges
    {
      id: 14,
      name: "Mahaveer Institute of Science & Technology (MIST)",
      location: "Hyderabad",
      type: "Private",
      rating: 4.0,
      establishedYear: 2001,
      description: "Comprehensive polytechnic offering diploma programs in core engineering branches with hands-on training focus.",
      courses: ["Diploma CSE", "Civil", "EEE", "ECE", "Mechanical"],
      fees: "₹39,000/year",
      facilities: ["Workshop Labs", "Hostels", "Library", "Sports", "Placement Cell"],
      website: "https://www.mist.ac.in",
      affiliation: "AICTE",
      accreditations: ["AICTE", "JNTU"],
      placements: {
        rate: "70%",
        average: "₹3.5 LPA"
      }
    },
    {
      id: 15,
      name: "TKR College of Engg & Tech (TKRCET)",
      location: "Meerpet, Hyderabad",
      type: "Private",
      rating: 3.9,
      establishedYear: 2002,
      description: "Affordable polytechnic education with practical engineering focus and industry-oriented curriculum.",
      courses: ["Civil", "EEE", "Mechanical", "ECE", "CSE"],
      fees: "₹14,900/year",
      facilities: ["Workshops", "Labs", "Library", "Sports", "Hostels"],
      website: "https://www.tkrcet.ac.in",
      affiliation: "JNTU Hyderabad",
      accreditations: ["AICTE", "JNTU"],
      placements: {
        rate: "65%",
        average: "₹3 LPA"
      }
    },
    {
      id: 16,
      name: "Avanthi's Scientific Technological & Research Academy (ASTRA)",
      location: "Hyderabad (Near Ramoji Film City)",
      type: "Private",
      rating: 3.8,
      establishedYear: 2008,
      description: "Modern polytechnic with 786 seats offering comprehensive engineering diploma programs.",
      courses: ["Civil", "Mechanical", "ECE", "EEE", "CSE"],
      fees: "₹44,700/year",
      facilities: ["Modern Labs", "Library", "Hostels", "Sports", "Transport"],
      website: "https://www.avanthi.edu.in",
      affiliation: "AICTE",
      accreditations: ["AICTE", "JNTU"],
      placements: {
        rate: "68%",
        average: "₹3.2 LPA"
      }
    }
  ];

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         college.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCourse = selectedCourse === "all" || (() => {
      switch(selectedCourse) {
        case 'btech': return college.courses.some(course => 
          course.toLowerCase().includes('b.tech') || 
          course.toLowerCase().includes('b.e') ||
          course.toLowerCase().includes('engineering')
        );
        case 'bsc': return college.courses.some(course => 
          course.toLowerCase().includes('b.sc') || 
          course.toLowerCase().includes('science')
        );
        case 'ba': return college.courses.some(course => 
          course.toLowerCase().includes('b.a') || 
          course.toLowerCase().includes('arts') ||
          course.toLowerCase().includes('literature') ||
          course.toLowerCase().includes('political')
        );
        case 'bcom': return college.courses.some(course => 
          course.toLowerCase().includes('b.com') || 
          course.toLowerCase().includes('commerce')
        );
        case 'bba': return college.courses.some(course => 
          course.toLowerCase().includes('bba') || 
          course.toLowerCase().includes('business administration')
        );
        case 'polytechnic': return college.courses.some(course => 
          course.toLowerCase().includes('diploma') || 
          college.name.toLowerCase().includes('polytechnic') ||
          college.name.toLowerCase().includes('mist') ||
          college.name.toLowerCase().includes('tkr') ||
          college.name.toLowerCase().includes('astra')
        );
        default: return true;
      }
    })();
    
    const matchesAccreditation = selectedAccreditation === "all" || 
      (college.accreditations && college.accreditations.some(acc => 
        acc.toLowerCase().includes(selectedAccreditation.toLowerCase())
      ));

    return matchesSearch && matchesCourse && matchesAccreditation;
  });

  const handleGetAdmissionInfo = (college: College) => {
    setSelectedCollege(college);
  };

  const handleCompareCollege = (college: College) => {
    if (compareColleges.find(c => c.id === college.id)) {
      setCompareColleges(prev => prev.filter(c => c.id !== college.id));
    } else if (compareColleges.length < 3) {
      setCompareColleges(prev => [...prev, college]);
    }
  };

  const handleRemoveFromComparison = (collegeId: number) => {
    setCompareColleges(prev => prev.filter(c => c.id !== collegeId));
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">College Directory</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect college in Hyderabad for your academic journey
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search colleges, locations, or courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="btech">B.E/B.Tech</SelectItem>
                    <SelectItem value="bsc">B.Sc</SelectItem>
                    <SelectItem value="ba">B.A</SelectItem>
                    <SelectItem value="bcom">B.Com</SelectItem>
                    <SelectItem value="bba">BBA</SelectItem>
                    <SelectItem value="polytechnic">Polytechnic</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedAccreditation} onValueChange={setSelectedAccreditation}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by accreditation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accreditations</SelectItem>
                    <SelectItem value="naac a++">NAAC A++</SelectItem>
                    <SelectItem value="naac a+">NAAC A+</SelectItem>
                    <SelectItem value="nba">NBA Accredited</SelectItem>
                    <SelectItem value="autonomous">UGC Autonomous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {compareColleges.length > 0 && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <strong>{compareColleges.length}/3</strong> colleges selected for comparison
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowComparison(true)}
                        className="text-sm bg-primary text-white px-3 py-1 rounded hover:bg-primary/80"
                        disabled={compareColleges.length < 2}
                      >
                        Compare ({compareColleges.length})
                      </button>
                      <button
                        onClick={() => setCompareColleges([])}
                        className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded hover:bg-muted/80"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* College Cards */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredColleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
              onGetAdmissionInfo={handleGetAdmissionInfo}
              onCompareCollege={handleCompareCollege}
              isSelected={compareColleges.some(c => c.id === college.id)}
            />
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-4 gap-4">
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{colleges.length}</div>
              <div className="text-sm text-muted-foreground">Total Colleges</div>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">
                {colleges.filter(c => c.accreditations?.includes('NAAC A++')).length}
              </div>
              <div className="text-sm text-muted-foreground">NAAC A++ Colleges</div>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-education">
                {colleges.filter(c => c.type === 'Government').length}
              </div>
              <div className="text-sm text-muted-foreground">Government Colleges</div>
            </CardContent>
          </Card>
          <Card className="shadow-card text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-career">100%</div>
              <div className="text-sm text-muted-foreground">Placement Support</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {selectedCollege && (
        <AdmissionInfoModal
          college={selectedCollege}
          onClose={() => setSelectedCollege(null)}
        />
      )}

      {showComparison && (
        <CollegeComparison
          colleges={compareColleges}
          onRemoveCollege={handleRemoveFromComparison}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
};

export default Colleges;
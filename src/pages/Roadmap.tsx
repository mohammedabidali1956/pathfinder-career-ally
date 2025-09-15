import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, BookOpen, TrendingUp, Clock, CheckCircle, Target } from "lucide-react";

interface RoadmapStep {
  year: number;
  title: string;
  subjects: string[];
  activities: string[];
  outcomes: string[];
}

const Roadmap = () => {
  const { course } = useParams();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const roadmapData: Record<string, { title: string; description: string; steps: RoadmapStep[]; careers: string[] }> = {
    "bsc": {
      title: "B.Sc Roadmap",
      description: "Year-wise progression for Bachelor of Science degree",
      careers: ["Research Scientist", "Lab Technician", "Data Analyst", "Quality Control", "Teaching"],
      steps: [
        {
          year: 1,
          title: "Foundation Year",
          subjects: ["General Physics", "Inorganic Chemistry", "Calculus & Algebra", "Biology/Botany", "English"],
          activities: ["Basic lab work", "Science club participation", "Study groups"],
          outcomes: ["Strong foundation in core sciences", "Lab safety certification", "Basic research skills"]
        },
        {
          year: 2,
          title: "Specialization Introduction", 
          subjects: ["Advanced Physics/Chemistry", "Organic Chemistry", "Statistics", "Elective subjects", "Computer Applications"],
          activities: ["Minor projects", "Industry visits", "Seminar presentations", "Internship prep"],
          outcomes: ["Specialized knowledge", "Research methodology", "Technical writing skills"]
        },
        {
          year: 3,
          title: "Final Year & Career Prep",
          subjects: ["Advanced specialization", "Project work", "Research methods", "Industry applications"],
          activities: ["Major project", "Internships", "Job/higher studies prep", "Competitive exams"],
          outcomes: ["Industry readiness", "Research project completion", "Career pathway clarity"]
        }
      ]
    },
    "ba": {
      title: "B.A Roadmap", 
      description: "Year-wise progression for Bachelor of Arts degree",
      careers: ["Civil Services", "Journalism", "Teaching", "Social Work", "Content Writing"],
      steps: [
        {
          year: 1,
          title: "Foundation Year",
          subjects: ["History", "Political Science", "English Literature", "Psychology", "General Studies"],
          activities: ["Debates & discussions", "Literary societies", "Current affairs study"],
          outcomes: ["Critical thinking", "Communication skills", "General awareness"]
        },
        {
          year: 2,
          title: "Depth & Application",
          subjects: ["Advanced History", "Public Administration", "Sociology", "Economics", "Research Methods"],
          activities: ["Fieldwork", "Social surveys", "Essay competitions", "UPSC foundation"],
          outcomes: ["Analytical skills", "Social awareness", "Research capabilities"]
        },
        {
          year: 3,
          title: "Specialization & Career Prep",
          subjects: ["Specialized subjects", "Dissertation", "Contemporary issues", "Optional subjects"],
          activities: ["Internships (Media/NGO/Govt)", "UPSC/State PSC prep", "Job applications"],
          outcomes: ["Career specialization", "Competitive exam readiness", "Professional network"]
        }
      ]
    },
    "bcom": {
      title: "B.Com Roadmap",
      description: "Year-wise progression for Bachelor of Commerce degree", 
      careers: ["Chartered Accountant", "Financial Analyst", "Banking", "Business Management"],
      steps: [
        {
          year: 1,
          title: "Business Fundamentals",
          subjects: ["Financial Accounting", "Business Organization", "Economics", "Business Mathematics", "English"],
          activities: ["Accounting practice", "Stock market basics", "Business case studies"],
          outcomes: ["Accounting foundation", "Business awareness", "Financial literacy"]
        },
        {
          year: 2,
          title: "Advanced Concepts", 
          subjects: ["Cost Accounting", "Corporate Accounting", "Banking", "Taxation", "Business Law"],
          activities: ["Auditing practice", "Tax return filing", "Banking operations", "CA foundation prep"],
          outcomes: ["Professional accounting", "Tax knowledge", "Legal understanding"]
        },
        {
          year: 3,
          title: "Specialization & Professional Prep",
          subjects: ["Management Accounting", "Auditing", "Financial Management", "Project work"],
          activities: ["Internships (Banks/CA firms)", "CA Intermediate prep", "Mock interviews", "Placement prep"],
          outcomes: ["Professional readiness", "CA qualification path", "Industry connections"]
        }
      ]
    },
    "bba": {
      title: "BBA Roadmap",
      description: "Year-wise progression for Bachelor of Business Administration",
      careers: ["Business Manager", "Marketing Executive", "HR Professional", "Entrepreneur"],
      steps: [
        {
          year: 1,
          title: "Management Fundamentals",
          subjects: ["Principles of Management", "Business Communication", "Economics", "Accounting", "Computer Applications"],
          activities: ["Case study analysis", "Group projects", "Business simulations", "Soft skills training"],
          outcomes: ["Management basics", "Leadership skills", "Team collaboration"]
        },
        {
          year: 2,
          title: "Functional Specialization",
          subjects: ["Marketing Management", "HR Management", "Financial Management", "Operations Management", "Business Law"],
          activities: ["Marketing campaigns", "HR projects", "Financial analysis", "Industry visits", "MBA prep"],
          outcomes: ["Functional expertise", "Strategic thinking", "Problem-solving skills"]
        },
        {
          year: 3,
          title: "Strategic Management & Career Launch",
          subjects: ["Strategic Management", "Entrepreneurship", "International Business", "Project Management"],
          activities: ["Business plan creation", "Internships", "Live projects", "Campus placements", "MBA entrance prep"],
          outcomes: ["Strategic mindset", "Business acumen", "Career readiness"]
        }
      ]
    },
    "polytechnic": {
      title: "Polytechnic Diploma Roadmap",
      description: "Year-wise progression for Polytechnic Diploma in Engineering",
      careers: ["Junior Engineer", "Technician", "Supervisor", "ITI Instructor"],
      steps: [
        {
          year: 1,
          title: "Engineering Basics",
          subjects: ["Engineering Drawing", "Workshop Practice", "Basic Electronics/Mechanical", "Mathematics", "Physics"],
          activities: ["Hands-on training", "Lab exercises", "Technical drawing", "Safety protocols"],
          outcomes: ["Technical foundation", "Practical skills", "Safety awareness"]
        },
        {
          year: 2,
          title: "Core Engineering",
          subjects: ["Advanced Engineering subjects", "Industrial training", "Technical subjects", "Computer applications"],
          activities: ["Workshop projects", "Industrial visits", "Technical presentations", "Skill development"],
          outcomes: ["Core competency", "Industrial exposure", "Technical proficiency"]
        },
        {
          year: 3,
          title: "Specialization & Industry Readiness",
          subjects: ["Specialized engineering", "Project work", "Industrial training", "Entrepreneurship"],
          activities: ["Major project", "Industry internship", "Job preparation", "B.Tech lateral entry prep"],
          outcomes: ["Industry readiness", "Project completion", "Career pathway (Job/B.Tech)"]
        }
      ]
    },
    "btech": {
      title: "B.Tech Roadmap",
      description: "Year-wise progression for Bachelor of Technology",
      careers: ["Software Engineer", "Design Engineer", "Project Manager", "Technical Consultant"],
      steps: [
        {
          year: 1,
          title: "Engineering Foundation",
          subjects: ["Mathematics", "Physics", "Chemistry", "Programming", "Engineering Graphics"],
          activities: ["Programming practice", "Lab experiments", "Technical clubs", "Coding competitions"],
          outcomes: ["Strong fundamentals", "Programming skills", "Problem-solving ability"]
        },
        {
          year: 2,
          title: "Core Engineering",
          subjects: ["Data Structures", "Digital Electronics", "Circuit Analysis", "Engineering subjects", "Technical Communication"],
          activities: ["Mini projects", "Technical workshops", "Internship applications", "Open source contributions"],
          outcomes: ["Core technical skills", "Project experience", "Industry connections"]
        },
        {
          year: 3,
          title: "Advanced Specialization",
          subjects: ["Advanced algorithms", "System design", "Specialized subjects", "Electives", "Research methods"],
          activities: ["Major projects", "Research papers", "Industry collaborations", "Technical competitions"],
          outcomes: ["Advanced expertise", "Research capabilities", "Industry recognition"]
        },
        {
          year: 4,
          title: "Final Year & Career Launch",
          subjects: ["Capstone project", "Industry applications", "Emerging technologies", "Management subjects"],
          activities: ["Final year project", "Placements", "Higher studies prep", "Entrepreneurship"],
          outcomes: ["Industry readiness", "Placement success", "Higher studies qualification"]
        }
      ]
    }
  };

  const currentRoadmap = roadmapData[course || "bsc"];

  if (!currentRoadmap) {
    return (
      <div className="min-h-screen bg-gradient-card">
        <Navigation />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Roadmap not found</h1>
          <Button onClick={() => navigate('/courses')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/courses')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <h1 className="text-4xl font-bold mb-4">{currentRoadmap.title}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {currentRoadmap.description}
          </p>
        </div>

        {/* Career Opportunities */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Career Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentRoadmap.careers.map((career) => (
                <Badge key={career} variant="outline" className="text-sm">
                  {career}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Roadmap Timeline */}
        <div className="space-y-6">
          {currentRoadmap.steps.map((step, index) => (
            <Card 
              key={step.year} 
              className={`shadow-card hover:shadow-hero transition-all duration-300 ${
                selectedYear === step.year ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedYear(selectedYear === step.year ? null : step.year)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-primary/10 mr-4">
                      <span className="text-lg font-bold text-primary">
                        {step.year}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <p className="text-muted-foreground">Year {step.year}</p>
                    </div>
                  </div>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              
              {(selectedYear === step.year || selectedYear === null) && (
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Subjects
                      </h4>
                      <ul className="space-y-2">
                        {step.subjects.map((subject) => (
                          <li key={subject} className="text-sm flex items-center">
                            <CheckCircle className="h-3 w-3 mr-2 text-success" />
                            {subject}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Activities
                      </h4>
                      <ul className="space-y-2">
                        {step.activities.map((activity) => (
                          <li key={activity} className="text-sm flex items-center">
                            <CheckCircle className="h-3 w-3 mr-2 text-primary" />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2" />
                        Outcomes
                      </h4>
                      <ul className="space-y-2">
                        {step.outcomes.map((outcome) => (
                          <li key={outcome} className="text-sm flex items-center">
                            <CheckCircle className="h-3 w-3 mr-2 text-education" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <Card className="mt-8 shadow-card bg-gradient-primary text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to Begin Your Journey?</h3>
            <p className="mb-4 opacity-90">
              Explore colleges and take the next step towards your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary"
                onClick={() => navigate('/colleges')}
              >
                Find Colleges
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => navigate('/quiz')}
              >
                Take Aptitude Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Roadmap;
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Calendar, Clock, Bell, AlertCircle, CheckCircle, BookOpen, DollarSign, GraduationCap } from "lucide-react";

const Timeline = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const events = [
    {
      id: 1,
      title: "JEE Main 2024 Registration",
      type: "exam",
      date: "2024-01-15",
      endDate: "2024-02-15",
      status: "upcoming",
      priority: "high",
      description: "Joint Entrance Examination for engineering admissions",
      category: "Engineering",
      reminder: true,
      daysUntil: 45
    },
    {
      id: 2,
      title: "NEET 2024 Application",
      type: "exam",
      date: "2024-02-01",
      endDate: "2024-03-01",
      status: "upcoming",
      priority: "high",
      description: "National Eligibility cum Entrance Test for medical courses",
      category: "Medical",
      reminder: true,
      daysUntil: 62
    },
    {
      id: 3,
      title: "DU Admission 2024",
      type: "admission",
      date: "2024-05-15",
      endDate: "2024-06-30",
      status: "upcoming",
      priority: "medium",
      description: "Delhi University undergraduate admissions",
      category: "University",
      reminder: false,
      daysUntil: 165
    },
    {
      id: 4,
      title: "NSP Scholarship Deadline",
      type: "scholarship",
      date: "2024-03-31",
      endDate: null,
      status: "upcoming",
      priority: "high",
      description: "National Scholarship Portal application deadline",
      category: "Scholarship",
      reminder: true,
      daysUntil: 120
    },
    {
      id: 5,
      title: "CBSE Board Exams",
      type: "exam",
      date: "2024-02-15",
      endDate: "2024-04-15",
      status: "upcoming",
      priority: "high",
      description: "Class 12th board examinations",
      category: "Board",
      reminder: true,
      daysUntil: 76
    },
    {
      id: 6,
      title: "CAT 2023 Results",
      type: "result",
      date: "2024-01-05",
      endDate: null,
      status: "completed",
      priority: "medium",
      description: "Common Admission Test results declared",
      category: "MBA",
      reminder: false,
      daysUntil: -5
    }
  ];

  const upcomingEvents = events
    .filter(event => event.status === "upcoming")
    .sort((a, b) => a.daysUntil - b.daysUntil);

  const completedEvents = events.filter(event => event.status === "completed");

  const getEventIcon = (type: string) => {
    switch (type) {
      case "exam": return BookOpen;
      case "admission": return GraduationCap;
      case "scholarship": return DollarSign;
      case "result": return CheckCircle;
      default: return Calendar;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "secondary";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const currentEvents = activeTab === "upcoming" ? upcomingEvents : completedEvents;

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Academic Timeline</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Never miss important deadlines for exams, admissions, and scholarships
          </p>
        </div>

        {/* Quick Stats */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <AlertCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                <div className="text-2xl font-bold">{upcomingEvents.filter(e => e.priority === "high").length}</div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{upcomingEvents.length}</div>
                <div className="text-sm text-muted-foreground">Upcoming Events</div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <Bell className="h-8 w-8 mx-auto mb-2 text-education" />
                <div className="text-2xl font-bold">{events.filter(e => e.reminder).length}</div>
                <div className="text-sm text-muted-foreground">Reminders Set</div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                <div className="text-2xl font-bold">{completedEvents.length}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            <Button
              variant={activeTab === "upcoming" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming Events
            </Button>
            <Button
              variant={activeTab === "completed" ? "default" : "ghost"}
              className="flex-1"
              onClick={() => setActiveTab("completed")}
            >
              Completed Events
            </Button>
          </div>
        </div>

        {/* Timeline Events */}
        <div className="max-w-4xl mx-auto space-y-4">
          {currentEvents.map((event) => {
            const EventIcon = getEventIcon(event.type);
            
            return (
              <Card key={event.id} className="shadow-card hover:shadow-hero transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <EventIcon className="h-6 w-6 text-primary" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">{event.title}</h3>
                          <p className="text-muted-foreground">{event.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={getPriorityColor(event.priority)} className="capitalize">
                            {event.priority}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {event.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(event.date)}
                          {event.endDate && ` - ${formatDate(event.endDate)}`}
                        </div>
                        {event.status === "upcoming" && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.daysUntil > 0 ? `${event.daysUntil} days left` : "Today"}
                          </div>
                        )}
                        {event.reminder && (
                          <div className="flex items-center text-education">
                            <Bell className="h-4 w-4 mr-1" />
                            Reminder set
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {event.status === "upcoming" && (
                          <>
                            <Button 
                              size="sm"
                              onClick={() => console.log('More info about', event.title)}
                            >
                              More Info
                            </Button>
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => console.log('Set reminder for', event.title)}
                            >
                              {event.reminder ? 'Update Reminder' : 'Set Reminder'}
                            </Button>
                          </>
                        )}
                        {event.status === "completed" && (
                          <Badge variant="default" className="bg-success">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {currentEvents.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {activeTab === "upcoming" ? "No upcoming events" : "No completed events"}
            </h3>
            <p className="text-muted-foreground">
              {activeTab === "upcoming" 
                ? "All caught up! Check back later for new deadlines." 
                : "No events have been completed yet."
              }
            </p>
          </div>
        )}

        {/* Add Event CTA */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="shadow-card bg-gradient-primary text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Stay on Track!</h3>
              <p className="mb-4 opacity-90">
                Set up personalized reminders for important dates and never miss a deadline.
              </p>
              <Button 
                variant="secondary"
                onClick={() => console.log('Add custom event')}
              >
                Add Custom Event
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
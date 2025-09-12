import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Plus, Upload, Download, Edit2, Trash2, School, DollarSign, Calendar, Users, Settings } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("colleges");

  // Sample data for admin management
  const [colleges, setColleges] = useState([
    { id: 1, name: "Delhi University", location: "New Delhi", type: "Government", courses: ["B.A", "B.Sc"] },
    { id: 2, name: "IIT Mumbai", location: "Mumbai", type: "Government", courses: ["B.Tech"] }
  ]);

  const [scholarships, setScholarships] = useState([
    { id: 1, name: "NSP Scholarship", amount: "₹50,000", deadline: "2024-03-31", status: "Active" },
    { id: 2, name: "Merit Scholarship", amount: "₹25,000", deadline: "2024-04-15", status: "Active" }
  ]);

  const [newCollege, setNewCollege] = useState({
    name: "",
    location: "",
    type: "Government",
    courses: "",
    fees: "",
    cutoff: "",
    facilities: "",
    website: ""
  });

  const [newScholarship, setNewScholarship] = useState({
    name: "",
    provider: "",
    amount: "",
    deadline: "",
    eligibility: "",
    description: "",
    website: ""
  });

  const handleAddCollege = () => {
    if (newCollege.name && newCollege.location) {
      const college = {
        id: colleges.length + 1,
        name: newCollege.name,
        location: newCollege.location,
        type: newCollege.type,
        courses: newCollege.courses.split(',').map(c => c.trim())
      };
      setColleges([...colleges, college]);
      setNewCollege({ name: "", location: "", type: "Government", courses: "", fees: "", cutoff: "", facilities: "", website: "" });
      console.log('College added:', college);
    }
  };

  const handleAddScholarship = () => {
    if (newScholarship.name && newScholarship.amount) {
      const scholarship = {
        id: scholarships.length + 1,
        name: newScholarship.name,
        amount: newScholarship.amount,
        deadline: newScholarship.deadline,
        status: "Active"
      };
      setScholarships([...scholarships, scholarship]);
      setNewScholarship({ name: "", provider: "", amount: "", deadline: "", eligibility: "", description: "", website: "" });
      console.log('Scholarship added:', scholarship);
    }
  };

  const deleteCollege = (id: number) => {
    setColleges(colleges.filter(c => c.id !== id));
    console.log('College deleted:', id);
  };

  const deleteScholarship = (id: number) => {
    setScholarships(scholarships.filter(s => s.id !== id));
    console.log('Scholarship deleted:', id);
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage colleges, scholarships, and system data
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <School className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{colleges.length}</div>
              <div className="text-sm text-muted-foreground">Colleges Listed</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-success" />
              <div className="text-2xl font-bold">{scholarships.length}</div>
              <div className="text-sm text-muted-foreground">Active Scholarships</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-education" />
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Registered Users</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-career" />
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-muted-foreground">Upcoming Deadlines</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="colleges">Colleges</TabsTrigger>
              <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Colleges Management */}
            <TabsContent value="colleges" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Add New College */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="h-5 w-5 mr-2" />
                      Add New College
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="college-name">College Name</Label>
                        <Input
                          id="college-name"
                          value={newCollege.name}
                          onChange={(e) => setNewCollege(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter college name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="college-location">Location</Label>
                        <Input
                          id="college-location"
                          value={newCollege.location}
                          onChange={(e) => setNewCollege(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="City, State"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="college-type">Type</Label>
                        <Select value={newCollege.type} onValueChange={(value) => setNewCollege(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Government">Government</SelectItem>
                            <SelectItem value="Private">Private</SelectItem>
                            <SelectItem value="Autonomous">Autonomous</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="college-courses">Courses (comma-separated)</Label>
                        <Input
                          id="college-courses"
                          value={newCollege.courses}
                          onChange={(e) => setNewCollege(prev => ({ ...prev, courses: e.target.value }))}
                          placeholder="B.A, B.Sc, B.Com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="college-fees">Fees Range</Label>
                        <Input
                          id="college-fees"
                          value={newCollege.fees}
                          onChange={(e) => setNewCollege(prev => ({ ...prev, fees: e.target.value }))}
                          placeholder="₹10,000-50,000/year"
                        />
                      </div>
                      <div>
                        <Label htmlFor="college-cutoff">Cutoff</Label>
                        <Input
                          id="college-cutoff"
                          value={newCollege.cutoff}
                          onChange={(e) => setNewCollege(prev => ({ ...prev, cutoff: e.target.value }))}
                          placeholder="85-95%"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="college-facilities">Facilities</Label>
                      <Input
                        id="college-facilities"
                        value={newCollege.facilities}
                        onChange={(e) => setNewCollege(prev => ({ ...prev, facilities: e.target.value }))}
                        placeholder="Library, Sports, Hostel, WiFi"
                      />
                    </div>

                    <div>
                      <Label htmlFor="college-website">Website URL</Label>
                      <Input
                        id="college-website"
                        value={newCollege.website}
                        onChange={(e) => setNewCollege(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://college-website.edu"
                      />
                    </div>

                    <Button onClick={handleAddCollege} className="w-full">
                      Add College
                    </Button>
                  </CardContent>
                </Card>

                {/* Existing Colleges */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Existing Colleges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {colleges.map((college) => (
                        <div key={college.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{college.name}</h4>
                            <p className="text-sm text-muted-foreground">{college.location}</p>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="outline" className="text-xs">{college.type}</Badge>
                              {college.courses.map((course, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">{course}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteCollege(college.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Scholarships Management */}
            <TabsContent value="scholarships" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Add New Scholarship */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Plus className="h-5 w-5 mr-2" />
                      Add New Scholarship
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scholarship-name">Scholarship Name</Label>
                        <Input
                          id="scholarship-name"
                          value={newScholarship.name}
                          onChange={(e) => setNewScholarship(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter scholarship name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="scholarship-provider">Provider</Label>
                        <Input
                          id="scholarship-provider"
                          value={newScholarship.provider}
                          onChange={(e) => setNewScholarship(prev => ({ ...prev, provider: e.target.value }))}
                          placeholder="Government/Organization"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="scholarship-amount">Amount</Label>
                        <Input
                          id="scholarship-amount"
                          value={newScholarship.amount}
                          onChange={(e) => setNewScholarship(prev => ({ ...prev, amount: e.target.value }))}
                          placeholder="₹50,000/year"
                        />
                      </div>
                      <div>
                        <Label htmlFor="scholarship-deadline">Deadline</Label>
                        <Input
                          id="scholarship-deadline"
                          type="date"
                          value={newScholarship.deadline}
                          onChange={(e) => setNewScholarship(prev => ({ ...prev, deadline: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="scholarship-eligibility">Eligibility Criteria</Label>
                      <Textarea
                        id="scholarship-eligibility"
                        value={newScholarship.eligibility}
                        onChange={(e) => setNewScholarship(prev => ({ ...prev, eligibility: e.target.value }))}
                        placeholder="Class 12th passed, Family income < ₹5 LPA"
                      />
                    </div>

                    <div>
                      <Label htmlFor="scholarship-description">Description</Label>
                      <Textarea
                        id="scholarship-description"
                        value={newScholarship.description}
                        onChange={(e) => setNewScholarship(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Detailed description of the scholarship"
                      />
                    </div>

                    <div>
                      <Label htmlFor="scholarship-website">Application URL</Label>
                      <Input
                        id="scholarship-website"
                        value={newScholarship.website}
                        onChange={(e) => setNewScholarship(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://application-link.gov.in"
                      />
                    </div>

                    <Button onClick={handleAddScholarship} className="w-full">
                      Add Scholarship
                    </Button>
                  </CardContent>
                </Card>

                {/* Existing Scholarships */}
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Existing Scholarships</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scholarships.map((scholarship) => (
                        <div key={scholarship.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{scholarship.name}</h4>
                            <p className="text-sm text-muted-foreground">Amount: {scholarship.amount}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                Deadline: {scholarship.deadline}
                              </Badge>
                              <Badge variant="default" className="text-xs">
                                {scholarship.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteScholarship(scholarship.id)}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Timeline Management */}
            <TabsContent value="timeline" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Timeline Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Timeline Data
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Export Timeline Data
                    </Button>
                  </div>
                  <div className="text-center py-8 text-muted-foreground">
                    Timeline management features will be available here.
                    <br />
                    Add exam dates, admission deadlines, and scholarship deadlines.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* System Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    System Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Data Management</h4>
                      <Button className="w-full" variant="outline">
                        <Upload className="h-4 w-4 mr-2" />
                        Bulk Import Data
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export All Data
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">System Maintenance</h4>
                      <Button className="w-full" variant="outline">
                        Clear Cache
                      </Button>
                      <Button className="w-full" variant="outline">
                        Generate Reports
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;

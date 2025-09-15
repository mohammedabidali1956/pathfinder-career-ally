import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, GraduationCap, DollarSign, Calendar, FileText, Award } from "lucide-react";
import type { College } from "./CollegeCard";

interface AdmissionInfoModalProps {
  college: College | null;
  onClose: () => void;
}

const AdmissionInfoModal = ({ college, onClose }: AdmissionInfoModalProps) => {
  if (!college) return null;

  const getAdmissionInfo = (college: College) => {
    // This would typically come from a database
    // For now, returning mock data based on college type
    const baseInfo = {
      eligibility: "12th pass from recognized board",
      process: "Merit-based admission",
      importantDates: "Applications open: June, Classes start: July",
      scholarships: ["Merit-based scholarships", "Financial aid available"]
    };

    if (college.name.toLowerCase().includes('engineering') || college.name.toLowerCase().includes('tech')) {
      return {
        ...baseInfo,
        eligibility: "12th with PCM (60%+) + TS EAMCET",
        process: "TS EAMCET counseling + Document verification",
        importantDates: "EAMCET: May, Counseling: June-July, Classes: August",
        scholarships: ["TS Fee Reimbursement", "Merit scholarships", "SC/ST/BC scholarships"]
      };
    }

    if (college.name.toLowerCase().includes('polytechnic')) {
      return {
        ...baseInfo,
        eligibility: "10th pass (45%+) + TS POLYCET",
        process: "TS POLYCET counseling + Document verification",
        importantDates: "POLYCET: May, Counseling: June-July, Classes: August",
        scholarships: ["TS Fee Reimbursement", "Minority scholarships", "EBC scholarships"]
      };
    }

    return baseInfo;
  };

  const admissionInfo = getAdmissionInfo(college);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{college.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Admission Information</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Eligibility */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Eligibility Criteria
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm">{admissionInfo.eligibility}</p>
            </div>
          </div>

          {/* Admission Process */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Admission Process
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm">{admissionInfo.process}</p>
            </div>
          </div>

          {/* Fees */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              Fee Structure
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-lg font-bold text-success">{college.fees}</p>
              <p className="text-xs text-muted-foreground mt-1">
                *Fees may vary by course and category. Additional charges for hostel and other facilities.
              </p>
            </div>
          </div>

          {/* Important Dates */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Important Dates
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm">{admissionInfo.importantDates}</p>
            </div>
          </div>

          {/* Scholarships */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Available Scholarships
            </h3>
            <div className="flex flex-wrap gap-2">
              {admissionInfo.scholarships.map((scholarship, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {scholarship}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button 
              className="flex-1"
              onClick={() => window.open(college.website, '_blank')}
            >
              Visit College Website
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('/scholarships', '_blank')}
            >
              View Scholarships
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
            <strong>Note:</strong> Admission information is subject to change. Please verify details from the official college website and admission brochure before applying.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdmissionInfoModal;
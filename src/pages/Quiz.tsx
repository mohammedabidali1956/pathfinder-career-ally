import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Brain, BookOpen, Palette, Calculator, Wrench, Users } from "lucide-react";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "I enjoy solving mathematical problems and working with numbers.",
      category: "science"
    },
    {
      question: "I prefer reading literature and writing essays over solving equations.",
      category: "arts"
    },
    {
      question: "I am interested in business, finance, and economics.",
      category: "commerce"
    },
    {
      question: "I enjoy hands-on activities and working with tools or machinery.",
      category: "vocational"
    },
    {
      question: "I like conducting experiments and understanding how things work.",
      category: "science"
    },
    {
      question: "I enjoy creating art, music, or other creative expressions.",
      category: "arts"
    },
    {
      question: "I am good at managing money and understanding market trends.",
      category: "commerce"
    },
    {
      question: "I prefer practical skills over theoretical knowledge.",
      category: "vocational"
    },
    {
      question: "I enjoy studying physics, chemistry, or biology.",
      category: "science"
    },
    {
      question: "I like discussing social issues and human behavior.",
      category: "arts"
    }
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    const scores = { science: 0, arts: 0, commerce: 0, vocational: 0 };
    
    questions.forEach((q, index) => {
      scores[q.category as keyof typeof scores] += finalAnswers[index];
    });

    const maxScore = Math.max(...Object.values(scores));
    const recommendedStream = Object.keys(scores).find(
      key => scores[key as keyof typeof scores] === maxScore
    );

    setCurrentQuestion(recommendedStream as any);
    setShowResult(true);
  };

  const getStreamInfo = (stream: string) => {
    const streamData = {
      science: {
        icon: Calculator,
        title: "Science Stream",
        description: "Perfect for analytical minds who love problem-solving and research.",
        subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
        careers: ["Engineering", "Medicine", "Research", "Technology"]
      },
      arts: {
        icon: Palette,
        title: "Arts/Humanities Stream",
        description: "Ideal for creative and socially aware individuals.",
        subjects: ["History", "Literature", "Psychology", "Political Science"],
        careers: ["Law", "Journalism", "Social Work", "Teaching"]
      },
      commerce: {
        icon: BookOpen,
        title: "Commerce Stream",
        description: "Great for business-minded individuals with numerical aptitude.",
        subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
        careers: ["CA", "Banking", "Marketing", "Business Management"]
      },
      vocational: {
        icon: Wrench,
        title: "Vocational Training",
        description: "Perfect for hands-on learners who prefer practical skills.",
        subjects: ["IT", "Hospitality", "Healthcare", "Automotive"],
        careers: ["Technical Jobs", "Skilled Trades", "Entrepreneurship", "Service Industry"]
      }
    };
    return streamData[stream as keyof typeof streamData] || streamData.science;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const streamInfo = getStreamInfo(currentQuestion as any);
    const StreamIcon = streamInfo.icon;

    return (
      <div className="min-h-screen bg-gradient-card">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto shadow-hero">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-4 rounded-full bg-primary/10">
                <StreamIcon className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold text-primary">
                Congratulations!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-2">{streamInfo.title}</h3>
                <p className="text-muted-foreground">{streamInfo.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Recommended Subjects:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {streamInfo.subjects.map((subject) => (
                      <li key={subject} className="text-sm">{subject}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Career Opportunities:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {streamInfo.careers.map((career) => (
                      <li key={career} className="text-sm">{career}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-primary hover:bg-primary-hover"
                  onClick={() => console.log('Explore courses')}
                >
                  Explore Courses
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setShowResult(false);
                  }}
                >
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-hero">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <CardTitle className="text-2xl font-bold">Aptitude Assessment</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {currentQuestion + 1} of {questions.length}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <Brain className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-4">
                  {questions[currentQuestion].question}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left hover:bg-success/10 hover:border-success"
                  onClick={() => handleAnswer(5)}
                >
                  <div>
                    <div className="font-semibold">Strongly Agree</div>
                    <div className="text-sm text-muted-foreground">This perfectly describes me</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left hover:bg-primary/10 hover:border-primary"
                  onClick={() => handleAnswer(4)}
                >
                  <div>
                    <div className="font-semibold">Agree</div>
                    <div className="text-sm text-muted-foreground">This mostly describes me</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left hover:bg-muted/50"
                  onClick={() => handleAnswer(3)}
                >
                  <div>
                    <div className="font-semibold">Neutral</div>
                    <div className="text-sm text-muted-foreground">I'm not sure about this</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left hover:bg-education/10 hover:border-education"
                  onClick={() => handleAnswer(2)}
                >
                  <div>
                    <div className="font-semibold">Disagree</div>
                    <div className="text-sm text-muted-foreground">This doesn't describe me well</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 text-left hover:bg-destructive/10 hover:border-destructive"
                  onClick={() => handleAnswer(1)}
                >
                  <div>
                    <div className="font-semibold">Strongly Disagree</div>
                    <div className="text-sm text-muted-foreground">This doesn't describe me at all</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
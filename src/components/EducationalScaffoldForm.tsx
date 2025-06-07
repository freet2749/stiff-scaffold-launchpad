
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Code, 
  Lightbulb, 
  Target, 
  CheckCircle,
  Download,
  ExternalLink 
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { LearningPathSelector } from "./LearningPathSelector";
import { generateEducationalScaffold } from "@/lib/educationalScaffold";

export function EducationalScaffoldForm() {
  const [selectedPath, setSelectedPath] = useState<any>(null);
  const [projectName, setProjectName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const handleGenerateProject = () => {
    if (!projectName || !selectedPath) {
      toast.error("Missing Information", {
        description: "Please select a learning path and enter a project name"
      });
      return;
    }

    const content = generateEducationalScaffold({
      projectName,
      studentName,
      learningPath: selectedPath,
      currentStep
    });

    setGeneratedContent(content);
    
    toast.success("Learning Project Generated!", {
      description: "Your educational project structure is ready with learning materials"
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (!selectedPath) {
    return <LearningPathSelector onPathSelected={setSelectedPath} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Selected Path Summary */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {selectedPath.title}
              </CardTitle>
              <CardDescription>{selectedPath.description}</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setSelectedPath(null)}>
              Change Path
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Project Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Project Setup
          </CardTitle>
          <CardDescription>
            Configure your learning project with educational features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student-name">Your Name (Optional)</Label>
              <Input
                id="student-name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="my-learning-project"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Learning Progression</Label>
            <div className="flex items-center gap-4">
              {selectedPath.skills.map((skill: string, index: number) => (
                <div
                  key={skill}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                    index <= currentStep ? 'bg-primary/10 text-primary' : 'bg-muted'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  {index <= currentStep ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2" />
                  )}
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Button */}
      <Button onClick={handleGenerateProject} className="w-full h-12 text-lg">
        Generate Learning Project
      </Button>

      {/* Generated Content */}
      {generatedContent && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Your Learning Project
            </CardTitle>
            <CardDescription>
              Complete project structure with educational materials and exercises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="command" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="command">Setup Command</TabsTrigger>
                <TabsTrigger value="structure">Project Structure</TabsTrigger>
                <TabsTrigger value="exercises">Exercises</TabsTrigger>
                <TabsTrigger value="resources">Learning Resources</TabsTrigger>
              </TabsList>
              
              <TabsContent value="command" className="space-y-4">
                <Alert>
                  <Lightbulb className="h-4 w-4" />
                  <AlertDescription>
                    Run this command in your terminal to create your learning project with all educational materials
                  </AlertDescription>
                </Alert>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{generatedContent.command}</pre>
                </div>
                <Button onClick={() => copyToClipboard(generatedContent.command)} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Copy Setup Command
                </Button>
              </TabsContent>
              
              <TabsContent value="structure" className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Project Structure:</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                    <pre>{generatedContent.structure}</pre>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="exercises" className="space-y-4">
                <div className="grid gap-4">
                  {generatedContent.exercises.map((exercise: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{exercise.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge>{exercise.difficulty}</Badge>
                          <Badge variant="outline">{exercise.duration}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-3">{exercise.description}</p>
                        <div className="space-y-2">
                          <h5 className="font-medium">Learning Objectives:</h5>
                          <ul className="list-disc pl-5 space-y-1">
                            {exercise.objectives.map((obj: string, i: number) => (
                              <li key={i} className="text-sm">{obj}</li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {generatedContent.resources.map((resource: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          {resource.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm mb-3">{resource.description}</p>
                        <Badge>{resource.type}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

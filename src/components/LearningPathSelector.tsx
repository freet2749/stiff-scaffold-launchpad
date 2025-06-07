
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Star } from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  skills: string[];
  projects: string[];
  prerequisites?: string[];
}

interface LearningPathSelectorProps {
  onPathSelected: (path: LearningPath) => void;
  selectedPath?: LearningPath;
}

export function LearningPathSelector({ onPathSelected, selectedPath }: LearningPathSelectorProps) {
  const learningPaths: LearningPath[] = [
    {
      id: "php-basics",
      title: "PHP Fundamentals",
      description: "Learn PHP basics: variables, functions, arrays, and control structures",
      difficulty: "beginner",
      duration: "2-3 weeks",
      skills: ["Variables & Constants", "Functions", "Arrays", "Control Structures", "Forms"],
      projects: ["Calculator", "Contact Form", "Simple Blog"],
    },
    {
      id: "php-mvc",
      title: "PHP MVC Architecture",
      description: "Build complete MVC applications with proper separation of concerns",
      difficulty: "intermediate",
      duration: "4-6 weeks",
      skills: ["MVC Pattern", "Routing", "Database Integration", "Session Management"],
      projects: ["Task Manager", "User Authentication", "E-commerce"],
      prerequisites: ["PHP Fundamentals"]
    },
    {
      id: "modern-frontend",
      title: "Modern Frontend Development",
      description: "Learn React, TypeScript, and modern JavaScript ecosystem",
      difficulty: "intermediate",
      duration: "6-8 weeks",
      skills: ["React", "TypeScript", "State Management", "API Integration"],
      projects: ["Portfolio Site", "Weather App", "Todo App with API"],
    },
    {
      id: "fullstack-app",
      title: "Full-Stack Application",
      description: "Combine frontend and backend to build complete web applications",
      difficulty: "advanced",
      duration: "8-12 weeks",
      skills: ["API Design", "Database Design", "Authentication", "Deployment"],
      projects: ["Social Media App", "E-learning Platform", "Project Management Tool"],
      prerequisites: ["PHP MVC", "Modern Frontend"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold">Choose Your Learning Path</h3>
        <p className="text-muted-foreground">
          Select a structured learning path that matches your skill level and goals
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {learningPaths.map((path) => (
          <Card 
            key={path.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedPath?.id === path.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onPathSelected(path)}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{path.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {path.duration}
                    </div>
                  </div>
                </div>
                {selectedPath?.id === path.id && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
              <CardDescription>{path.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {path.prerequisites && (
                <div>
                  <h4 className="font-medium text-sm mb-2">Prerequisites:</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.prerequisites.map((prereq) => (
                      <Badge key={prereq} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h4 className="font-medium text-sm mb-2">Skills You'll Learn:</h4>
                <div className="flex flex-wrap gap-1">
                  {path.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Practice Projects:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {path.projects.map((project) => (
                    <li key={project} className="flex items-center gap-2">
                      <Star className="h-3 w-3" />
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

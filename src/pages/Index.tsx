
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { EducationalScaffoldForm } from "@/components/EducationalScaffoldForm";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Users, Target, Lightbulb, Award } from "lucide-react";

const Index = () => {
  const teachingFeatures = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Structured Learning Paths",
      description: "Follow carefully designed progressions from PHP basics to full-stack development"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Hands-On Projects",
      description: "Build real applications while learning - from calculators to complete MVC systems"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Student-Friendly",
      description: "Created by educators, for students - with clear explanations and step-by-step guidance"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Learning Objectives",
      description: "Every project comes with clear goals and success criteria"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Best Practices",
      description: "Learn industry standards and coding conventions from day one"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Progressive Difficulty",
      description: "Start with fundamentals and gradually build complex applications"
    }
  ];

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4">
          <Header />
          
          {/* Hero Section - Educational Focus */}
          <section className="py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    🎓 Learn by Building
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Master Web Development Through Practice
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A learning-focused project generator designed for computer science students. 
                    Build real applications while mastering PHP, MVC architecture, and modern web development.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="text-lg px-8 py-3">
                    <a href="#start-learning">Start Learning</a>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    View Learning Paths
                  </Button>
                </div>
                
                {/* Learning Stats */}
                <div className="flex gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4</div>
                    <div className="text-sm text-muted-foreground">Learning Paths</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Practice Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">50+</div>
                    <div className="text-sm text-muted-foreground">Code Examples</div>
                  </div>
                </div>
              </div>
              
              <div className="terminal-window h-[400px] flex items-center justify-center bg-card/50 backdrop-blur-sm">
                <div className="space-y-4 w-full p-6">
                  <div className="text-primary font-semibold mb-2">🎯 Learning Project Generated!</div>
                  <div className="terminal-prompt text-green-400">
                    $ php-learning-project my-mvc-app
                  </div>
                  <div className="text-muted-foreground">
                    📚 Creating educational structure...
                  </div>
                  <div className="text-muted-foreground">
                    ⚡ Adding learning exercises...
                  </div>
                  <div className="text-muted-foreground">
                    🗄️ Setting up database examples...
                  </div>
                  <div className="text-muted-foreground">
                    📝 Generating practice assignments...
                  </div>
                  <div className="text-green-500">
                    ✓ Ready to learn! Check README.md for instructions
                  </div>
                  <div className="terminal-prompt text-blue-400 flex">
                    $ cd my-mvc-app && php -S localhost:8000
                    <span className="animate-cursor-blink ml-1">|</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teaching-Focused Features */}
          <section className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                🚀 For Students, By Educators
              </div>
              <h2 className="text-3xl font-bold mb-3">Learn Web Development the Right Way</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Our educational approach combines theory with practice, helping you build real skills through guided projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachingFeatures.map((feature, index) => (
                <Card key={index} className="transition-all hover:shadow-lg hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Learning Path Preview */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Choose Your Learning Journey</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Structured paths designed to take you from beginner to advanced developer
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "PHP Fundamentals", level: "Beginner", duration: "2-3 weeks", projects: 3 },
                { title: "PHP MVC", level: "Intermediate", duration: "4-6 weeks", projects: 5 },
                { title: "Modern Frontend", level: "Intermediate", duration: "6-8 weeks", projects: 4 },
                { title: "Full-Stack", level: "Advanced", duration: "8-12 weeks", projects: 3 }
              ].map((path, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg">{path.title}</CardTitle>
                    <div className="flex justify-center gap-2">
                      <Badge variant="outline">{path.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div>⏱️ {path.duration}</div>
                      <div>🛠️ {path.projects} projects</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* How It Works - Educational Version */}
          <HowItWorks />
          
          {/* Main Learning Interface */}
          <section id="start-learning" className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                🎯 Start Your Journey
              </div>
              <h2 className="text-3xl font-bold mb-3">Create Your Learning Project</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Choose a learning path that matches your skill level and start building real applications
              </p>
            </div>
            
            <EducationalScaffoldForm />
          </section>
          
          {/* CTA Section */}
          <CTA />
        </div>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;

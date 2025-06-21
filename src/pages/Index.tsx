
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { ScaffoldForm } from "@/components/ScaffoldForm";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Terminal, Zap, Settings, Package, Rocket } from "lucide-react";

const Index = () => {
  const coreFeatures = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Multiple Project Types",
      description: "Support for Vite, Parcel, HTML/CSS/JS, PHP MVC, and more modern frameworks"
    },
    {
      icon: <Terminal className="h-8 w-8" />,
      title: "Ready-to-Use Commands",
      description: "Generate complete terminal commands with proper setup and configuration"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Modern Build Tools",
      description: "Integration with Vite, Parcel, Tailwind CLI, PostCSS, and other modern tools"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Smart Configuration",
      description: "Automatic setup of TypeScript, ESLint, testing frameworks, and more"
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "CSS Framework Support",
      description: "Choose from Tailwind, Bootstrap, Bulma, or vanilla CSS setups"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Production Ready",
      description: "Includes Docker, CI/CD templates, and deployment configurations"
    }
  ];

  const projectTypes = [
    { name: "Vite + React", description: "Modern React development", color: "bg-blue-500" },
    { name: "Vite + Vue", description: "Vue.js applications", color: "bg-green-500" },
    { name: "Parcel", description: "Zero-config bundler", color: "bg-orange-500" },
    { name: "Alpine.js", description: "Lightweight reactive framework", color: "bg-purple-500" },
    { name: "PHP MVC", description: "Complete MVC structure", color: "bg-indigo-500" },
    { name: "HTML/CSS/JS", description: "Static website setup", color: "bg-gray-500" }
  ];

  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4">
          <Header />
          
          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    🚀 Build Faster
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Generate Perfect Project Structures
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Create complete web project scaffolds with modern build tools, frameworks, and configurations. 
                    From simple HTML to complex MVC architectures.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="text-lg px-8 py-3">
                    <a href="#generator">Start Building</a>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    View Examples
                  </Button>
                </div>
                
                {/* Stats */}
                <div className="flex gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">10+</div>
                    <div className="text-sm text-muted-foreground">Project Types</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Build Tools</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">8+</div>
                    <div className="text-sm text-muted-foreground">CSS Frameworks</div>
                  </div>
                </div>
              </div>
              
              <div className="terminal-window h-[400px] flex items-center justify-center bg-card/50 backdrop-blur-sm">
                <div className="space-y-4 w-full p-6">
                  <div className="text-primary font-semibold mb-2">🎯 Project Generated!</div>
                  <div className="terminal-prompt text-green-400">
                    $ npm create vite@latest my-app -- --template react-ts
                  </div>
                  <div className="text-muted-foreground">
                    ⚡ Creating modern React project...
                  </div>
                  <div className="text-muted-foreground">
                    📦 Installing Tailwind CSS...
                  </div>
                  <div className="text-muted-foreground">
                    🔧 Setting up TypeScript...
                  </div>
                  <div className="text-muted-foreground">
                    ✨ Configuring ESLint & Prettier...
                  </div>
                  <div className="text-green-500">
                    ✓ Project ready! Run 'npm run dev' to start
                  </div>
                  <div className="terminal-prompt text-blue-400 flex">
                    $ cd my-app && npm run dev
                    <span className="animate-cursor-blink ml-1">|</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Features */}
          <section className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                🛠️ Powerful Features
              </div>
              <h2 className="text-3xl font-bold mb-3">Everything You Need to Start Building</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Generate complete project structures with modern tooling and best practices built-in
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((feature, index) => (
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

          {/* Supported Project Types */}
          <section className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Supported Project Types</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                From simple static sites to complex full-stack applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectTypes.map((type, index) => (
                <Card key={index} className="text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${type.color}`}></div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{type.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{type.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          
          {/* How It Works */}
          <HowItWorks />
          
          {/* Main Generator Interface */}
          <section id="generator" className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                🎯 Project Generator
              </div>
              <h2 className="text-3xl font-bold mb-3">Create Your Project</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Configure your project settings and generate the perfect scaffold command
              </p>
            </div>
            
            <ScaffoldForm />
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

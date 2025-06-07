
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { ScaffoldForm } from "@/components/ScaffoldForm";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
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
                    ⚡ Instant Project Scaffolding
                  </div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Scaffold your projects in seconds
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    StiffTools helps developers quickly generate structured project templates 
                    with complete MVC architecture, database integration, and modern tooling.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="text-lg px-8 py-3">
                    <a href="#get-started">Try It Now</a>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="terminal-window h-[350px] flex items-center justify-center bg-card/50 backdrop-blur-sm">
                <div className="space-y-4 w-full p-4">
                  <div className="terminal-prompt text-green-400">
                    $ npx create-stifftools-app my-mvc-app --with-db
                  </div>
                  <div className="text-muted-foreground">
                    📁 Creating project structure...
                  </div>
                  <div className="text-muted-foreground">
                    🔧 Installing dependencies...
                  </div>
                  <div className="text-muted-foreground">
                    🗄️ Setting up database models...
                  </div>
                  <div className="text-green-500">
                    ✓ Project successfully created!
                  </div>
                  <div className="terminal-prompt flex text-blue-400">
                    $ cd my-mvc-app && npm run dev
                    <span className="animate-cursor-blink ml-1">|</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <Features />
          
          {/* How It Works Section */}
          <HowItWorks />
          
          {/* Get Started Section */}
          <section id="get-started" className="py-16">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                🚀 Get Started
              </div>
              <h2 className="text-3xl font-bold mb-3">Generate Your Project</h2>
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

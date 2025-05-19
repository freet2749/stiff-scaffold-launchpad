
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
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4">
          <Header />
          
          {/* Hero Section */}
          <section className="py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                  Scaffold your MVC projects in seconds
                </h1>
                <p className="text-xl text-muted-foreground">
                  StiffTools helps developers quickly generate structured project templates 
                  with a simple command line interface. Save hours on project setup.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <a href="#get-started">Try It Now</a>
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="terminal-window h-[300px] flex items-center justify-center">
                <div className="space-y-4 w-full">
                  <div className="terminal-prompt">
                    npx stifftools create my-mvc-app
                  </div>
                  <div className="text-muted-foreground">
                    Creating project structure...
                  </div>
                  <div className="text-muted-foreground">
                    Installing dependencies...
                  </div>
                  <div className="text-green-500">
                    ✓ Project successfully created!
                  </div>
                  <div className="terminal-prompt flex">
                    cd my-mvc-app
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
          <section id="get-started" className="py-16 border-t border-b">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Get Started</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Configure your project and generate your scaffold command
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <ScaffoldForm />
            </div>
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

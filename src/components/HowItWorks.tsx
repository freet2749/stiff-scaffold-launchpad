
import { cn } from "@/lib/utils";

interface HowItWorksProps {
  className?: string;
}

export function HowItWorks({ className }: HowItWorksProps) {
  const steps = [
    {
      number: 1,
      title: "Define Your Project",
      description:
        "Enter your project name, description, and select the features you need.",
    },
    {
      number: 2,
      title: "Generate Command",
      description:
        "StiffTools creates a customized command that includes all your project requirements.",
    },
    {
      number: 3,
      title: "Run in Terminal",
      description:
        "Execute the command in your terminal and watch as your project structure is built in seconds.",
    },
  ];

  return (
    <section id="how-it-works" className={cn("py-16", className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">How It Works</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          StiffTools simplifies project scaffolding in just three easy steps
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="relative">
            <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
              {step.number}
            </div>
            <div className="border rounded-lg p-6 pt-10">
              <h3 className="text-xl font-medium mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


import { cn } from "@/lib/utils";

interface FeaturesProps {
  className?: string;
}

export function Features({ className }: FeaturesProps) {
  const features = [
    {
      title: "MVC Project Structure",
      description:
        "Generate a complete Model-View-Controller architecture with a single command",
    },
    {
      title: "Smart Dependencies",
      description:
        "Automatically includes only the dependencies you need based on your project requirements",
    },
    {
      title: "Best Practices",
      description:
        "All generated code follows modern development standards and patterns",
    },
    {
      title: "Customizable Templates",
      description:
        "Adapt the scaffold to match your team's coding standards and preferences",
    },
    {
      title: "Zero Config",
      description:
        "Works out of the box with sensible defaults - no complex setup required",
    },
    {
      title: "Language Agnostic",
      description:
        "Supports multiple programming languages and frameworks with the same workflow",
    },
  ];

  return (
    <section id="features" className={cn("py-16", className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Features</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          StiffTools accelerates your development workflow with powerful scaffolding capabilities
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 transition-all hover:border-primary hover:shadow-md"
          >
            <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

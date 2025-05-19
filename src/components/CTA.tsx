
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAProps {
  className?: string;
}

export function CTA({ className }: CTAProps) {
  return (
    <section className={cn("py-16 text-center", className)}>
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Ready to scaffold your next project?</h2>
        <p className="text-muted-foreground text-lg">
          Get started with StiffTools today and save hours on project setup.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="#get-started">Get Started</a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/stifftools/docs" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

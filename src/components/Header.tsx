
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("flex items-center justify-between py-4", className)}>
      <Logo />
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex gap-6">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="#get-started" className="hover:text-primary transition-colors">Get Started</a>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

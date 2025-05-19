
import { Logo } from "./Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-8 mt-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground mt-2">
              Fast MVC project scaffolding for developers
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div>
              <h4 className="font-medium mb-2">Resources</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Templates</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Examples</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Community</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">GitHub</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Discord</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} StiffTools. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

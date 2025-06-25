import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ScaffoldOptions, 
  generateScaffoldCommand 
} from "@/lib/generateScaffold";
import { toast } from "@/components/ui/use-toast";
import { SqlUploadSection } from "./SqlUploadSection";
import { FileUploadSection } from "./FileUploadSection";
import { enhanceScaffoldOptions } from "@/lib/sqlParser";

export function ScaffoldForm() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("vite-react");
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [osType, setOsType] = useState<'windows' | 'mac' | 'linux'>('windows');
  const [usesDatabase, setUsesDatabase] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [cssFramework, setCssFramework] = useState("");
  const [generatedCommand, setGeneratedCommand] = useState("");
  const [dbStructure, setDbStructure] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const projectTypes = [
    { 
      id: "vite-react", 
      label: "Vite + React", 
      description: "Modern React development with TypeScript and hot reload",
      category: "Frontend Frameworks"
    },
    { 
      id: "vite-vue", 
      label: "Vite + Vue", 
      description: "Vue.js with composition API and TypeScript support",
      category: "Frontend Frameworks"
    },
    { 
      id: "vite-svelte", 
      label: "Vite + Svelte", 
      description: "Svelte framework with modern build tooling",
      category: "Frontend Frameworks"
    },
    { 
      id: "vite-vanilla", 
      label: "Vite + Vanilla", 
      description: "Pure JavaScript/TypeScript with Vite bundling",
      category: "Frontend Frameworks"
    },
    { 
      id: "parcel", 
      label: "Parcel", 
      description: "Zero-configuration build tool for web applications",
      category: "Build Tools"
    },
    { 
      id: "alpine", 
      label: "Alpine.js", 
      description: "Lightweight reactive framework for HTML enhancement",
      category: "Lightweight"
    },
    { 
      id: "tailwind-cli", 
      label: "Tailwind CLI", 
      description: "Standalone Tailwind CSS with CLI compilation",
      category: "CSS First"
    },
    { 
      id: "astro", 
      label: "Astro", 
      description: "Static site generator with component islands",
      category: "Static Site"
    },
    { 
      id: "eleventy", 
      label: "Eleventy (11ty)", 
      description: "Simple static site generator with flexible templating",
      category: "Static Site"
    },
    { 
      id: "html", 
      label: "HTML/CSS/JS", 
      description: "Traditional static website with organized folder structure",
      category: "Static"
    },
    { 
      id: "cli", 
      label: "Node.js CLI", 
      description: "Command line interface application with Commander.js",
      category: "CLI"
    },
    { 
      id: "php", 
      label: "PHP MVC", 
      description: "Complete PHP MVC structure with database integration",
      category: "Backend"
    },
  ];

  const cssFrameworks = [
    { id: "tailwind", label: "Tailwind CSS", description: "Utility-first CSS framework" },
    { id: "bootstrap", label: "Bootstrap", description: "Popular CSS framework with components" },
    { id: "bulma", label: "Bulma", description: "Modern CSS framework based on Flexbox" },
    { id: "unocss", label: "UnoCSS", description: "Instant on-demand atomic CSS engine" },
  ];

  const coreFeatures = [
    { 
      id: "typescript", 
      label: "TypeScript", 
      description: "Static type checking for JavaScript" 
    },
    { 
      id: "eslint", 
      label: "ESLint", 
      description: "Code linting and quality checks" 
    },
    { 
      id: "prettier", 
      label: "Prettier", 
      description: "Code formatting and style consistency" 
    },
    { 
      id: "tests", 
      label: "Testing Setup", 
      description: "Unit and integration testing framework" 
    },
    { 
      id: "pwa", 
      label: "Progressive Web App", 
      description: "Service worker and offline capabilities" 
    },
    { 
      id: "docker", 
      label: "Docker", 
      description: "Containerization with Dockerfile" 
    },
  ];

  const handleFeatureToggle = (featureId: string) => {
    setFeatures((current) =>
      current.includes(featureId)
        ? current.filter((id) => id !== featureId)
        : [...current, featureId]
    );
  };

  const handleSqlParsed = (parsedStructure: any) => {
    setDbStructure(parsedStructure);
    if (!usesDatabase) {
      setUsesDatabase(true);
    }
  };

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleGenerate = () => {
    if (!projectName) {
      toast({
        title: "Project name required",
        description: "Please enter a project name to generate a scaffold command",
        variant: "destructive",
      });
      return;
    }

    let options: ScaffoldOptions = {
      projectName,
      description,
      projectType,
      language,
      osType,
      usesDatabase,
      features,
      cssFramework: cssFramework && cssFramework !== "none" ? cssFramework : undefined,
      uploadedFiles: uploadedFiles.map(f => f.name),
    };

    if (dbStructure && usesDatabase) {
      options = enhanceScaffoldOptions(options, dbStructure);
    }

    const command = generateScaffoldCommand(options);
    setGeneratedCommand(command);
    
    toast({
      title: "Command generated",
      description: "Your project scaffold command is ready to use",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCommand);
    toast({
      title: "Copied to clipboard!",
      description: "The scaffold command is now in your clipboard.",
    });
  };

  const selectedProjectType = projectTypes.find(t => t.id === projectType);
  const groupedProjectTypes = projectTypes.reduce((acc, type) => {
    if (!acc[type.category]) acc[type.category] = [];
    acc[type.category].push(type);
    return acc;
  }, {} as Record<string, typeof projectTypes>);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card rounded-lg border">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Project Scaffold Generator</h2>
          <p className="text-muted-foreground">Configure your project and generate the perfect setup command</p>
        </div>

        {/* Basic Info */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-base font-medium">Project Name</Label>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="my-awesome-project"
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="language" className="text-base font-medium">Language</Label>
            <Select value={language} onValueChange={(value: 'en' | 'fr') => setLanguage(value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="os-type" className="text-base font-medium">Operating System</Label>
            <Select value={osType} onValueChange={(value: 'windows' | 'mac' | 'linux') => setOsType(value)}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select OS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="windows">Windows</SelectItem>
                <SelectItem value="mac">macOS</SelectItem>
                <SelectItem value="linux">Linux</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Project Description with File Upload */}
        <div className="space-y-4">
          <Label htmlFor="description" className="text-base font-medium">Project Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project and any specific requirements..."
            className="min-h-[120px]"
          />
          <FileUploadSection onFilesUploaded={handleFilesUploaded} />
        </div>

        {/* Database Option */}
        <div className="space-y-4">
          <Label className="flex items-center gap-3 text-base font-medium">
            <Checkbox 
              checked={usesDatabase} 
              onCheckedChange={(checked) => setUsesDatabase(checked === true)} 
            />
            <span>Include Database Setup</span>
          </Label>
          {usesDatabase && (
            <SqlUploadSection onSqlParsed={handleSqlParsed} />
          )}
        </div>

        {/* Project Type */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Project Type</Label>
          <RadioGroup value={projectType} onValueChange={setProjectType}>
            <div className="space-y-6">
              {Object.entries(groupedProjectTypes).map(([category, types]) => (
                <div key={category} className="space-y-3">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    {category}
                  </h4>
                  <div className="grid gap-3">
                    {types.map((type) => (
                      <Label
                        key={type.id}
                        className="flex items-start gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                      >
                        <RadioGroupItem value={type.id} className="mt-1" />
                        <div className="space-y-1">
                          <div className="font-medium text-base">{type.label}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                      </Label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* CSS Framework */}
        <div className="space-y-4">
          <Label className="text-base font-medium">CSS Framework (Optional)</Label>
          <Select value={cssFramework} onValueChange={setCssFramework}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select a CSS framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {cssFrameworks.map((framework) => (
                <SelectItem key={framework.id} value={framework.id}>
                  {framework.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {cssFramework && cssFramework !== "none" && (
            <div className="p-3 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground">
                {cssFrameworks.find(f => f.id === cssFramework)?.description}
              </p>
            </div>
          )}
        </div>

        {/* Core Features */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Additional Features</Label>
          <div className="grid sm:grid-cols-2 gap-3">
            {coreFeatures.map((feature) => (
              <div key={feature.id} className="space-y-2">
                <Label
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                >
                  <Checkbox
                    checked={features.includes(feature.id)}
                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                  />
                  <span className="font-medium">{feature.label}</span>
                </Label>
                {features.includes(feature.id) && (
                  <div className="ml-6 p-3 bg-primary/5 border-l-2 border-primary rounded-r-md">
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button onClick={handleGenerate} className="w-full h-12 text-lg">
          Generate Scaffold Command
        </Button>

        {/* Generated Command */}
        {generatedCommand && (
          <div className="space-y-4 p-6 bg-muted/30 rounded-lg border">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Generated Command ({osType})</Label>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                Copy Command
              </Button>
            </div>
            <div className="terminal-command-container">
              <code className="terminal-command">
                {generatedCommand}
              </code>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                Run this command in your {osType} terminal to create your {selectedProjectType?.label} project.
              </p>
              {features.length > 0 && (
                <p>Included features: {features.join(", ")}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

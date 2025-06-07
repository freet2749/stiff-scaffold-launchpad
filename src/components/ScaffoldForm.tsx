
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
import { toast } from "@/components/ui/sonner";
import { SqlUploadSection } from "./SqlUploadSection";
import { FileUploadSection } from "./FileUploadSection";
import { enhanceScaffoldOptions } from "@/lib/sqlParser";

export function ScaffoldForm() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("vite");
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [usesDatabase, setUsesDatabase] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [cssFramework, setCssFramework] = useState("");
  const [generatedCommand, setGeneratedCommand] = useState("");
  const [dbStructure, setDbStructure] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const projectTypes = [
    { id: "vite", label: "Vite (Modern build tool)", description: "Modern frontend build tool with TypeScript" },
    { id: "html", label: "HTML/CSS/JS (Static)", description: "Basic static website with organized structure" },
    { id: "cli", label: "Node.js CLI", description: "Command line interface application" },
    { id: "postcss", label: "PostCSS", description: "PostCSS with build tools setup" },
    { id: "php", label: "PHP MVC", description: "Complete PHP MVC structure with organized folders" },
  ];

  const cssFrameworks = [
    { id: "tailwind", label: "Tailwind CSS", description: "Utility-first CSS framework" },
    { id: "bootstrap", label: "Bootstrap", description: "Popular CSS framework with components" },
    { id: "bulma", label: "Bulma", description: "Modern CSS framework based on Flexbox" },
    { id: "materialize", label: "Materialize", description: "CSS framework based on Material Design" },
  ];

  const coreFeatures = [
    { 
      id: "auth", 
      label: "Authentication", 
      description: "User login/logout system with session management and security features" 
    },
    { 
      id: "api", 
      label: "REST API", 
      description: "RESTful API endpoints with proper HTTP methods and JSON responses" 
    },
    { 
      id: "tests", 
      label: "Testing Suite", 
      description: "Unit and integration testing setup with testing frameworks" 
    },
    { 
      id: "docker", 
      label: "Docker Setup", 
      description: "Containerization with Dockerfile and docker-compose configuration" 
    },
    { 
      id: "typescript", 
      label: "TypeScript", 
      description: "Static type checking for JavaScript with TypeScript configuration" 
    },
    { 
      id: "pwa", 
      label: "Progressive Web App", 
      description: "Service worker, manifest, and offline capabilities for web apps" 
    },
    { 
      id: "eslint", 
      label: "ESLint", 
      description: "Code linting and formatting with ESLint and Prettier configuration" 
    },
    { 
      id: "routing", 
      label: "Routing System", 
      description: "URL routing and navigation management for single-page applications" 
    },
    { 
      id: "templating", 
      label: "Template Engine", 
      description: "Dynamic HTML generation with template engine integration" 
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
      toast.error("Project name required", {
        description: "Please enter a project name to generate a scaffold command"
      });
      return;
    }

    let options: ScaffoldOptions = {
      projectName,
      description,
      projectType,
      language,
      usesDatabase,
      features: cssFramework && cssFramework !== "none" ? [...features, cssFramework] : features,
      uploadedFiles: uploadedFiles.map(f => f.name),
    };

    if (dbStructure && usesDatabase) {
      options = enhanceScaffoldOptions(options, dbStructure);
    }

    const command = generateScaffoldCommand(options);
    setGeneratedCommand(command);
    
    toast.success("Command generated", {
      description: "Your project scaffold command is ready with the proper structure"
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCommand);
    toast.success("Copied to clipboard!", {
      description: "The scaffold command is now in your clipboard."
    });
  };

  const selectedProjectType = projectTypes.find(t => t.id === projectType);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-card rounded-lg border">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Project Scaffold Generator</h2>
          <p className="text-muted-foreground">Configure your project and generate the perfect command</p>
        </div>

        {/* Basic Info */}
        <div className="grid gap-6 sm:grid-cols-2">
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
        </div>

        {/* Project Description with File Upload */}
        <div className="space-y-4">
          <Label htmlFor="description" className="text-base font-medium">Project Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project structure and requirements..."
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
            <div className="grid gap-3">
              {projectTypes.map((type) => (
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
          <Label className="text-base font-medium">Core Features</Label>
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
              <Label className="text-base font-medium">Generated Command</Label>
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
                Run this command in your terminal to scaffold your {selectedProjectType?.label} project 
                {projectType === 'php' ? ' with complete MVC structure' : ''}.
              </p>
              {features.length > 0 && (
                <p>Selected features: {features.join(", ")}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

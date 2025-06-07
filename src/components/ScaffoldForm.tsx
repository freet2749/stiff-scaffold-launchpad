
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
import { enhanceScaffoldOptions } from "@/lib/sqlParser";

export function ScaffoldForm() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectType, setProjectType] = useState("vite");
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [usesDatabase, setUsesDatabase] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [generatedCommand, setGeneratedCommand] = useState("");
  const [dbStructure, setDbStructure] = useState<any>(null);

  const projectTypes = [
    { id: "vite", label: "Vite (Modern build tool)", description: "Modern frontend build tool with TypeScript" },
    { id: "html", label: "HTML/CSS/JS (Static)", description: "Basic static website with organized structure" },
    { id: "cli", label: "Node.js CLI", description: "Command line interface application" },
    { id: "postcss", label: "PostCSS (CSS framework)", description: "PostCSS with Tailwind CSS setup" },
    { id: "php", label: "PHP MVC", description: "Complete PHP MVC structure with organized folders" },
  ];

  const availableFeatures = [
    { id: "auth", label: "Authentication" },
    { id: "api", label: "REST API" },
    { id: "tests", label: "Testing Suite" },
    { id: "docker", label: "Docker Setup" },
    { id: "typescript", label: "TypeScript" },
    { id: "tailwind", label: "Tailwind CSS" },
    { id: "pwa", label: "Progressive Web App" },
    { id: "eslint", label: "ESLint" },
    { id: "routing", label: "Routing System" },
    { id: "templating", label: "Template Engine" },
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
      features,
    };

    if (dbStructure && usesDatabase) {
      options = enhanceScaffoldOptions(options, dbStructure);
    }

    const command = generateScaffoldCommand(options);
    setGeneratedCommand(command);
    
    toast.success("Command generated", {
      description: "Your project scaffold command is ready with the proper MVC structure"
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
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="my-awesome-project"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={(value: 'en' | 'fr') => setLanguage(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="flex items-center gap-2">
          <Checkbox 
            checked={usesDatabase} 
            onCheckedChange={(checked) => setUsesDatabase(checked === true)} 
          />
          <span>Include Database Setup</span>
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project structure and requirements..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-3">
        <Label>Project Type</Label>
        <RadioGroup value={projectType} onValueChange={setProjectType}>
          <div className="grid gap-3">
            {projectTypes.map((type) => (
              <Label
                key={type.id}
                className="flex items-start gap-3 p-4 border rounded-md cursor-pointer hover:bg-accent transition-colors"
              >
                <RadioGroupItem value={type.id} className="mt-1" />
                <div className="space-y-1">
                  <div className="font-medium">{type.label}</div>
                  <div className="text-sm text-muted-foreground">{type.description}</div>
                </div>
              </Label>
            ))}
          </div>
        </RadioGroup>
      </div>

      {usesDatabase && (
        <SqlUploadSection onSqlParsed={handleSqlParsed} />
      )}

      <div className="space-y-2">
        <Label>Features</Label>
        <div className="grid sm:grid-cols-2 gap-2">
          {availableFeatures.map((feature) => (
            <Label
              key={feature.id}
              className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent transition-colors"
            >
              <Checkbox
                checked={features.includes(feature.id)}
                onCheckedChange={() => handleFeatureToggle(feature.id)}
              />
              <span>{feature.label}</span>
            </Label>
          ))}
        </div>
      </div>

      <Button onClick={handleGenerate} className="w-full">
        Generate Scaffold Command
      </Button>

      {generatedCommand && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <Label>Generated Command</Label>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
          <div className="terminal-command-container">
            <code className="terminal-command">
              {generatedCommand}
            </code>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Run this command in your terminal to scaffold your {selectedProjectType?.label} project 
            {projectType === 'php' ? ' with complete MVC structure' : ''}.
          </p>
          <div className="bg-blue-50 border border-blue-200 dark:bg-blue-950/20 dark:border-blue-800 p-3 rounded-md mt-4">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              {projectType === 'php' 
                ? 'This command creates a complete PHP MVC structure with controllers, models, views, and routing system as shown in your architecture diagram.'
                : 'Commands are tailored to your selected project type and will create the appropriate file structure.'
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

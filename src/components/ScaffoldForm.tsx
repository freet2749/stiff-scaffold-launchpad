
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
  const [usesDatabase, setUsesDatabase] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);
  const [generatedCommand, setGeneratedCommand] = useState("");
  const [dbStructure, setDbStructure] = useState<any>(null);

  const availableFeatures = [
    { id: "auth", label: "Authentication" },
    { id: "api", label: "REST API" },
    { id: "tests", label: "Testing Suite" },
    { id: "docker", label: "Docker Setup" },
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
    // If database wasn't already enabled, turn it on since we have a SQL file
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
      usesDatabase,
      features,
    };

    // Enhance options with database structure if available
    if (dbStructure && usesDatabase) {
      options = enhanceScaffoldOptions(options, dbStructure);
    }

    const command = generateScaffoldCommand(options);
    setGeneratedCommand(command);
    
    toast.success("Command generated", {
      description: "Your project scaffold command is ready"
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCommand);
    toast.success("Copied to clipboard!", {
      description: "The scaffold command is now in your clipboard."
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="my-mvc-app"
          />
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project here..."
          className="min-h-[100px]"
        />
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
              className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-accent"
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

      <Button onClick={handleGenerate} className="w-full">Generate Scaffold Command</Button>

      {generatedCommand && (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <Label>Generated Command</Label>
            <Button variant="outline" size="sm" onClick={copyToClipboard}>
              Copy
            </Button>
          </div>
          <div className="terminal-window">
            <code className="terminal-prompt whitespace-pre-wrap break-all">
              {generatedCommand}
            </code>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Run this command in your terminal to scaffold your Next.js project with your selected options.
          </p>
          <div className="bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800 p-3 rounded-md mt-4">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              This command uses <code>create-next-app</code>, which is the official scaffolding tool for Next.js projects.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

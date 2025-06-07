
export interface ScaffoldOptions {
  projectName: string;
  description?: string;
  projectType?: string;
  usesDatabase?: boolean;
  features?: string[];
  database?: {
    structure?: any;
    modelNames?: string[];
  };
}

export function generateScaffoldCommand(options: ScaffoldOptions): string {
  const { projectName, projectType = "vite", usesDatabase, features = [], database } = options;
  
  let command = "";
  
  // Generate command based on project type
  switch (projectType) {
    case "vite":
      command = `npm create vite@latest ${projectName}`;
      break;
    case "html":
      command = `mkdir ${projectName} && cd ${projectName} && echo "<!DOCTYPE html><html><head><title>${projectName}</title></head><body><h1>Welcome to ${projectName}</h1></body></html>" > index.html`;
      break;
    case "cli":
      command = `mkdir ${projectName} && cd ${projectName} && npm init -y`;
      break;
    case "postcss":
      command = `npm create vite@latest ${projectName} -- --template vanilla && cd ${projectName} && npm install postcss autoprefixer`;
      break;
    case "php":
      command = `mkdir ${projectName} && cd ${projectName} && echo "<?php echo 'Welcome to ${projectName}'; ?>" > index.php`;
      break;
    case "nextjs":
      command = `npx create-next-app ${projectName} --typescript`;
      break;
    default:
      command = `npm create vite@latest ${projectName}`;
  }
  
  // Add database-related setup for supported frameworks
  if (usesDatabase) {
    if (projectType === "nextjs") {
      command += " --with-prisma";
    } else if (projectType === "php") {
      command += " && echo 'Database setup: Configure your preferred PHP database connection' > database-setup.txt";
    } else {
      command += " && echo 'Database setup: Install your preferred database package' > database-setup.txt";
    }
    
    // Add models based on the table structure
    if (database?.modelNames && database.modelNames.length > 0) {
      command += ` # Models: ${database.modelNames.join(", ")}`;
    }
  }
  
  // Add features based on project type
  if (features.length > 0) {
    if (projectType === "nextjs") {
      const featureMap: Record<string, string> = {
        "auth": " --with-auth",
        "api": " --with-api",
        "tests": " --with-jest",
        "docker": " --with-docker"
      };
      
      features.forEach(feature => {
        if (featureMap[feature]) {
          command += featureMap[feature];
        }
      });
    } else {
      command += ` # Features to add: ${features.join(", ")}`;
    }
  }
  
  return command;
}

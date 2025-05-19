
export interface ScaffoldOptions {
  projectName: string;
  description?: string;
  usesDatabase?: boolean;
  features?: string[];
  database?: {
    structure?: any;
    modelNames?: string[];
  };
}

export function generateScaffoldCommand(options: ScaffoldOptions): string {
  const { projectName, usesDatabase, features = [], database } = options;
  
  // Use create-next-app which is a valid npm package
  let command = `npx create-next-app ${projectName}`;
  
  // Add TypeScript flag by default
  command += " --typescript";
  
  // Add database-related flags
  if (usesDatabase) {
    command += " --with-prisma";
    
    // If we have parsed database structure, add more specific flags
    if (database?.structure) {
      const tableCount = database.structure.tables.length;
      
      // Add models based on the table structure
      if (database.modelNames && database.modelNames.length > 0) {
        command += ` --models=${database.modelNames.join(",")}`;
      }
    }
  }
  
  // Add features
  if (features.length > 0) {
    // Map our features to Next.js compatible flags
    const featureMap: Record<string, string> = {
      "auth": "--with-auth",
      "api": "--with-api",
      "tests": "--with-jest",
      "docker": "--with-docker"
    };
    
    features.forEach(feature => {
      if (featureMap[feature]) {
        command += ` ${featureMap[feature]}`;
      }
    });
  }
  
  return command;
}

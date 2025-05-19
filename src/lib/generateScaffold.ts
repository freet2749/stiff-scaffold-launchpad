
export interface ScaffoldOptions {
  projectName: string;
  description?: string;
  usesDatabase?: boolean;
  features?: string[];
}

export function generateScaffoldCommand(options: ScaffoldOptions): string {
  const { projectName, usesDatabase, features = [] } = options;
  
  // Basic command structure
  let command = `npx stifftools create ${projectName}`;
  
  // Add database flag
  if (usesDatabase) {
    command += " --with-db";
  }
  
  // Add features
  if (features.length > 0) {
    command += ` --features=${features.join(",")}`;
  }
  
  return command;
}


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
  
  // Basic command structure
  let command = `npx stifftools create ${projectName}`;
  
  // Add database flag
  if (usesDatabase) {
    command += " --with-db";
    
    // If we have parsed database structure, add more specific flags
    if (database?.structure) {
      const tableCount = database.structure.tables.length;
      const relationshipCount = database.structure.relationships.length;
      
      command += ` --db-tables=${tableCount}`;
      
      if (relationshipCount > 0) {
        command += ` --db-relationships=${relationshipCount}`;
      }
      
      // Add models based on the table structure
      if (database.modelNames && database.modelNames.length > 0) {
        command += ` --models=${database.modelNames.join(",")}`;
      }
    }
  }
  
  // Add features
  if (features.length > 0) {
    command += ` --features=${features.join(",")}`;
  }
  
  return command;
}

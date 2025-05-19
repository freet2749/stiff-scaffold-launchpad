
interface TableColumn {
  name: string;
  type: string;
  constraints: string[];
}

interface Table {
  name: string;
  columns: TableColumn[];
}

interface ForeignKey {
  table: string;
  column: string;
  referencesTable: string;
  referencesColumn: string;
}

interface DatabaseStructure {
  tables: Table[];
  relationships: ForeignKey[];
}

export function parseSqlFile(sqlContent: string): DatabaseStructure {
  const structure: DatabaseStructure = {
    tables: [],
    relationships: []
  };
  
  // Basic SQL parsing logic - this is a simplified version and might need enhancements
  // for more complex SQL schemas
  try {
    // Extract CREATE TABLE statements
    const createTableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?[`"']?(\w+)[`"']?\s*\(([\s\S]*?)\);/gim;
    let match;
    
    while ((match = createTableRegex.exec(sqlContent)) !== null) {
      const tableName = match[1];
      const tableDefinition = match[2];
      
      const table: Table = {
        name: tableName,
        columns: []
      };
      
      // Parse columns
      const columnDefinitions = tableDefinition.split(',')
        .map(col => col.trim())
        .filter(col => col && !col.startsWith('PRIMARY KEY') && !col.startsWith('FOREIGN KEY'));
      
      columnDefinitions.forEach(colDef => {
        const colMatch = colDef.match(/[`"']?(\w+)[`"']?\s+([\w\(\)]+)(.*)?/i);
        if (colMatch) {
          const colName = colMatch[1];
          const colType = colMatch[2];
          const constraintsText = colMatch[3] || '';
          
          const constraints: string[] = [];
          if (constraintsText.includes('NOT NULL')) constraints.push('NOT NULL');
          if (constraintsText.includes('PRIMARY KEY')) constraints.push('PRIMARY KEY');
          if (constraintsText.includes('UNIQUE')) constraints.push('UNIQUE');
          if (constraintsText.includes('AUTO_INCREMENT')) constraints.push('AUTO_INCREMENT');
          
          table.columns.push({
            name: colName,
            type: colType,
            constraints
          });
        }
      });
      
      structure.tables.push(table);
      
      // Look for foreign keys
      const foreignKeyRegex = /FOREIGN\s+KEY\s+\(\s*[`"']?(\w+)[`"']?\s*\)\s+REFERENCES\s+[`"']?(\w+)[`"']?\s*\(\s*[`"']?(\w+)[`"']?\s*\)/gi;
      let fkMatch;
      
      while ((fkMatch = foreignKeyRegex.exec(tableDefinition)) !== null) {
        const column = fkMatch[1];
        const referencesTable = fkMatch[2];
        const referencesColumn = fkMatch[3];
        
        structure.relationships.push({
          table: tableName,
          column,
          referencesTable,
          referencesColumn
        });
      }
    }
    
    return structure;
  } catch (error) {
    console.error("Error parsing SQL:", error);
    throw new Error("Failed to parse SQL file");
  }
}

// Helper function to generate model names from table names
export function generateModelName(tableName: string): string {
  // Convert plural to singular (very basic)
  let singular = tableName;
  if (singular.endsWith('s')) {
    singular = singular.slice(0, -1);
  }
  
  // Capitalize and camel case
  return singular
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

// Helper to enhance scaffold options with database structure
export function enhanceScaffoldOptions(options: any, dbStructure: DatabaseStructure): any {
  return {
    ...options,
    database: {
      structure: dbStructure,
      modelNames: dbStructure.tables.map(table => generateModelName(table.name))
    }
  };
}

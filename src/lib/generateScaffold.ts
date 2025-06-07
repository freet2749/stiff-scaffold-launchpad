
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
  language?: 'en' | 'fr';
}

const translations = {
  en: {
    welcome: "Welcome to",
    databaseSetup: "Database setup: Configure your preferred database connection",
    installPackage: "Database setup: Install your preferred database package",
    models: "Models",
    features: "Features to add"
  },
  fr: {
    welcome: "Bienvenue dans",
    databaseSetup: "Configuration base de données: Configurez votre connexion de base de données préférée",
    installPackage: "Configuration base de données: Installez votre package de base de données préféré",
    models: "Modèles",
    features: "Fonctionnalités à ajouter"
  }
};

export function generateScaffoldCommand(options: ScaffoldOptions): string {
  const { projectName, projectType = "vite", usesDatabase, features = [], database, language = 'en' } = options;
  const t = translations[language];
  
  let command = "";
  
  // Generate command based on project type
  switch (projectType) {
    case "vite":
      command = `npm create vite@latest ${projectName} -- --template vanilla-ts`;
      break;
      
    case "html":
      command = `mkdir ${projectName} && cd ${projectName} && ` +
        `mkdir css js images && ` +
        `echo "<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><link rel='stylesheet' href='css/style.css'></head><body><header><h1>${t.welcome} ${projectName}</h1></header><main><p>Your content here</p></main><footer><p>&copy; 2024 ${projectName}</p></footer><script src='js/main.js'></script></body></html>" > index.html && ` +
        `echo "/* ${projectName} Styles */" > css/style.css && ` +
        `echo "// ${projectName} JavaScript" > js/main.js`;
      break;
      
    case "cli":
      command = `mkdir ${projectName} && cd ${projectName} && ` +
        `npm init -y && ` +
        `mkdir src bin && ` +
        `echo "#!/usr/bin/env node" > bin/${projectName} && ` +
        `echo "console.log('${t.welcome} ${projectName} CLI!');" > src/index.js && ` +
        `chmod +x bin/${projectName}`;
      break;
      
    case "postcss":
      command = `npm create vite@latest ${projectName} -- --template vanilla && cd ${projectName} && ` +
        `npm install postcss autoprefixer tailwindcss && ` +
        `mkdir src/styles && ` +
        `echo "@tailwind base; @tailwind components; @tailwind utilities;" > src/styles/main.css`;
      break;
      
    case "php":
      // Create comprehensive PHP MVC structure
      command = `mkdir ${projectName} && cd ${projectName} && ` +
        // Create directory structure
        `mkdir -p app/config app/controllers app/models app/routers app/views/templates/partials core public && ` +
        
        // Create public/index.php (entry point)
        `echo "<?php require_once '../core/init.php'; ?>" > public/index.php && ` +
        
        // Create core/init.php
        `echo "<?php
session_start();
require_once 'connexion.php';
require_once '../app/config/params.php';
require_once '../app/routers/index.php';
?>" > core/init.php && ` +
        
        // Create core/connexion.php
        `echo "<?php
// Database connection
// Configure your database settings here
class Database {
    private static \\$instance = null;
    
    public static function getInstance() {
        if (self::\\$instance === null) {
            // Add your database connection here
            // Example: self::\\$instance = new PDO('mysql:host=localhost;dbname=yourdb', 'username', 'password');
        }
        return self::\\$instance;
    }
}
?>" > core/connexion.php && ` +
        
        // Create app/config/params.php
        `echo "<?php
// Application parameters
\\$content = '';
define('APP_NAME', '${projectName}');
define('BASE_URL', '/');
?>" > app/config/params.php && ` +
        
        // Create app/routers/index.php
        `echo "<?php
// Router configuration
// Add your routes here
// Example: if (\\$_GET['action'] ?? '' === 'home') { /* handle home */ }
?>" > app/routers/index.php && ` +
        
        // Create app/views/templates/index.php
        `echo "<!DOCTYPE html>
<html lang='${language}'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title><?= APP_NAME ?></title>
</head>
<body>
    <header>
        <h1>${t.welcome} <?= APP_NAME ?></h1>
    </header>
    <main>
        <?= \\$content ?>
    </main>
    <footer>
        <p>&copy; <?= date('Y') ?> <?= APP_NAME ?></p>
    </footer>
</body>
</html>" > app/views/templates/index.php && ` +
        
        // Create a sample controller
        `echo "<?php
class PagesController {
    public function homeAction() {
        global \\$content;
        \\$content = '<h2>Accueil</h2><p>Contenu de la page d\\'accueil</p>';
    }
}
?>" > app/controllers/PagesController.php`;
      break;
      
    default:
      command = `npm create vite@latest ${projectName}`;
  }
  
  // Add database-related setup for supported frameworks
  if (usesDatabase) {
    if (projectType === "php") {
      command += ` && echo "# ${t.databaseSetup}" > database-setup.txt`;
    } else {
      command += ` && echo "# ${t.installPackage}" > database-setup.txt`;
    }
    
    // Add models based on the table structure
    if (database?.modelNames && database.modelNames.length > 0) {
      command += ` # ${t.models}: ${database.modelNames.join(", ")}`;
    }
  }
  
  // Add features based on project type
  if (features.length > 0) {
    command += ` # ${t.features}: ${features.join(", ")}`;
  }
  
  return command;
}

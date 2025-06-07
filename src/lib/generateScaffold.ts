
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
  const { projectName, projectType = "vite", usesDatabase, features = [], database, language = 'en', uploadedFiles = [] } = options;
  const t = translations[language];
  
  let command = "";
  let dependencies: string[] = [];
  
  // Generate command based on project type
  switch (projectType) {
    case "vite":
      command = `npm create vite@latest ${projectName} -- --template vanilla-ts`;
      dependencies.push("npm install");
      
      // Add CSS framework
      if (features.includes("tailwind")) {
        dependencies.push("npm install -D tailwindcss postcss autoprefixer");
        dependencies.push("npx tailwindcss init -p");
      } else if (features.includes("bootstrap")) {
        dependencies.push("npm install bootstrap");
      }
      
      // Add other features
      if (features.includes("typescript")) dependencies.push("npm install -D typescript @types/node");
      if (features.includes("eslint")) dependencies.push("npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin");
      if (features.includes("tests")) dependencies.push("npm install -D vitest @testing-library/dom");
      break;
      
    case "html":
      command = `mkdir ${projectName} && cd ${projectName} && ` +
        `mkdir css js images assets && ` +
        `echo "<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><link rel='stylesheet' href='css/style.css'></head><body><header><nav><h1>${t.welcome} ${projectName}</h1></nav></header><main><section id='content'><p>Your content here</p></section></main><footer><p>&copy; 2024 ${projectName}</p></footer><script src='js/main.js'></script></body></html>" > index.html && ` +
        `echo "/* ${projectName} Styles */ * { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: Arial, sans-serif; line-height: 1.6; } header { background: #333; color: white; padding: 1rem; } main { padding: 2rem; min-height: 80vh; } footer { background: #333; color: white; text-align: center; padding: 1rem; }" > css/style.css && ` +
        `echo "// ${projectName} JavaScript console.log('${t.welcome} ${projectName}!');" > js/main.js`;
        
      // Add CSS framework for HTML projects
      if (features.includes("bootstrap")) {
        command += ` && echo '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">' >> index.html`;
      }
      break;
      
    case "cli":
      command = `mkdir ${projectName} && cd ${projectName} && ` +
        `npm init -y && ` +
        `mkdir src bin lib && ` +
        `echo "#!/usr/bin/env node" > bin/${projectName} && ` +
        `echo "const { program } = require('commander'); program.version('1.0.0').description('${projectName} CLI'); program.command('start').description('Start the application').action(() => { console.log('${t.welcome} ${projectName} CLI!'); }); program.parse();" > src/index.js && ` +
        `chmod +x bin/${projectName} && ` +
        `npm install commander`;
      break;
      
    case "postcss":
      command = `npm create vite@latest ${projectName} -- --template vanilla && cd ${projectName} && ` +
        `npm install postcss autoprefixer tailwindcss && ` +
        `mkdir src/styles src/components && ` +
        `echo "@tailwind base; @tailwind components; @tailwind utilities;" > src/styles/main.css && ` +
        `npx tailwindcss init -p`;
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
class Database {
    private static \\$instance = null;
    private \\$pdo;
    
    private function __construct() {
        try {
            \\$host = 'localhost';
            \\$dbname = '${projectName}_db';
            \\$username = 'root';
            \\$password = '';
            \\$this->pdo = new PDO(\\\"mysql:host=\\$host;dbname=\\$dbname\\\", \\$username, \\$password);
            \\$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException \\$e) {
            die('Database connection failed: ' . \\$e->getMessage());
        }
    }
    
    public static function getInstance() {
        if (self::\\$instance === null) {
            self::\\$instance = new self();
        }
        return self::\\$instance;
    }
    
    public function getConnection() {
        return \\$this->pdo;
    }
}
?>" > core/connexion.php && ` +
        
        // Create app/config/params.php
        `echo "<?php
// Application parameters
\\$content = '';
define('APP_NAME', '${projectName}');
define('BASE_URL', '/');
define('ASSETS_URL', BASE_URL . 'public/assets/');
?>" > app/config/params.php && ` +
        
        // Create app/routers/index.php
        `echo "<?php
// Router configuration
\\$action = \\$_GET['action'] ?? 'home';
\\$controller = \\$_GET['controller'] ?? 'pages';

// Basic routing
switch (\\$controller) {
    case 'pages':
        require_once '../app/controllers/PagesController.php';
        \\$pagesController = new PagesController();
        switch (\\$action) {
            case 'home':
                \\$pagesController->homeAction();
                break;
            default:
                \\$pagesController->homeAction();
                break;
        }
        break;
    default:
        require_once '../app/controllers/PagesController.php';
        \\$pagesController = new PagesController();
        \\$pagesController->homeAction();
        break;
}

// Load template
require_once '../app/views/templates/index.php';
?>" > app/routers/index.php && ` +
        
        // Create app/views/templates/index.php
        `echo "<!DOCTYPE html>
<html lang='${language}'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title><?= APP_NAME ?></title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        header { background: #333; color: white; padding: 1rem; }
        nav h1 { margin: 0; }
        main { padding: 2rem; min-height: 80vh; }
        footer { background: #333; color: white; text-align: center; padding: 1rem; }
    </style>
</head>
<body>
    <header>
        <nav>
            <h1>${t.welcome} <?= APP_NAME ?></h1>
        </nav>
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
        \\$content = '<h2>${language === 'fr' ? 'Accueil' : 'Home'}</h2><p>${language === 'fr' ? 'Bienvenue dans votre application MVC PHP!' : 'Welcome to your PHP MVC application!'}</p>';
    }
}
?>" > app/controllers/PagesController.php`;

        // Add database models if SQL was uploaded
        if (database?.modelNames && database.modelNames.length > 0) {
          database.modelNames.forEach((modelName: string) => {
            command += ` && echo "<?php
class ${modelName} {
    private \\$db;
    
    public function __construct() {
        \\$this->db = Database::getInstance()->getConnection();
    }
    
    public function findAll() {
        \\$stmt = \\$this->db->query('SELECT * FROM ${modelName.toLowerCase()}s');
        return \\$stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function findById(\\$id) {
        \\$stmt = \\$this->db->prepare('SELECT * FROM ${modelName.toLowerCase()}s WHERE id = ?');
        \\$stmt->execute([\\$id]);
        return \\$stmt->fetch(PDO::FETCH_ASSOC);
    }
}
?>" > app/models/${modelName}.php`;
          });
        }
      break;
      
    default:
      command = `npm create vite@latest ${projectName}`;
  }
  
  // Add database-related setup for supported frameworks
  if (usesDatabase) {
    if (projectType === "php") {
      command += ` && echo "# ${t.databaseSetup}" > README.md`;
    } else {
      command += ` && cd ${projectName} && ${t.installPackage}`;
      if (projectType === "vite" || projectType === "postcss") {
        dependencies.push("npm install prisma @prisma/client");
        dependencies.push("npx prisma init");
      }
    }
    
    // Add models based on the table structure
    if (database?.modelNames && database.modelNames.length > 0) {
      command += ` # ${t.models}: ${database.modelNames.join(", ")}`;
    }
  }
  
  // Add dependencies and setup commands
  if (dependencies.length > 0 && projectType !== "html" && projectType !== "php") {
    command += ` && cd ${projectName} && ${dependencies.join(" && ")}`;
  }
  
  // Add features based on project type
  if (features.length > 0) {
    const featureDescriptions = features.filter(f => !["tailwind", "bootstrap", "bulma", "materialize"].includes(f));
    if (featureDescriptions.length > 0) {
      command += ` # ${t.features}: ${featureDescriptions.join(", ")}`;
    }
  }
  
  // Add note about uploaded files
  if (uploadedFiles.length > 0) {
    command += ` # Additional files: ${uploadedFiles.join(", ")}`;
  }
  
  return command;
}

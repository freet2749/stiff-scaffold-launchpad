export interface ScaffoldOptions {
  projectName: string;
  description?: string;
  projectType?: string;
  usesDatabase?: boolean;
  features?: string[];
  cssFramework?: string;
  buildTool?: string;
  database?: {
    structure?: any;
    modelNames?: string[];
  };
  language?: 'en' | 'fr';
  uploadedFiles?: string[];
}

const translations = {
  en: {
    welcome: "Welcome to",
    databaseSetup: "Database setup: Configure your preferred database connection",
    installPackage: "Database setup: Install your preferred database package",
    models: "Models",
    features: "Features to add",
    created: "Created",
    installing: "Installing dependencies",
    configuring: "Configuring"
  },
  fr: {
    welcome: "Bienvenue dans",
    databaseSetup: "Configuration base de données: Configurez votre connexion de base de données préférée",
    installPackage: "Configuration base de données: Installez votre package de base de données préféré",
    models: "Modèles",
    features: "Fonctionnalités à ajouter",
    created: "Créé",
    installing: "Installation des dépendances",
    configuring: "Configuration"
  }
};

export function generateScaffoldCommand(options: ScaffoldOptions): string {
  const { 
    projectName, 
    projectType = "vite-react", 
    usesDatabase, 
    features = [], 
    cssFramework,
    buildTool,
    database, 
    language = 'en', 
    uploadedFiles = [] 
  } = options;
  
  const t = translations[language];
  let command = "";
  let dependencies: string[] = [];
  let postInstallCommands: string[] = [];
  
  // Generate command based on project type and build tool
  switch (projectType) {
    case "vite-react":
      command = `npm create vite@latest ${projectName} -- --template react-ts`;
      dependencies.push("cd " + projectName);
      dependencies.push("npm install");
      break;
      
    case "vite-vue":
      command = `npm create vite@latest ${projectName} -- --template vue-ts`;
      dependencies.push("cd " + projectName);
      dependencies.push("npm install");
      break;
      
    case "vite-svelte":
      command = `npm create vite@latest ${projectName} -- --template svelte-ts`;
      dependencies.push("cd " + projectName);
      dependencies.push("npm install");
      break;
      
    case "vite-vanilla":
      command = `npm create vite@latest ${projectName} -- --template vanilla-ts`;
      dependencies.push("cd " + projectName);
      dependencies.push("npm install");
      break;
      
    case "parcel":
      command = `mkdir ${projectName} && cd ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install --save-dev parcel");
      dependencies.push("mkdir src");
      postInstallCommands.push(`echo "<!DOCTYPE html><html><head><title>${projectName}</title></head><body><div id='app'></div><script type='module' src='./src/index.ts'></script></body></html>" > index.html`);
      postInstallCommands.push(`echo "console.log('${t.welcome} ${projectName}!');" > src/index.ts`);
      break;
      
    case "alpine":
      command = `mkdir ${projectName} && cd ${projectName}`;
      postInstallCommands.push(`echo "<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><script defer src='https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js'></script></head><body><div x-data='{ message: \\"${t.welcome} ${projectName}\\" }'><h1 x-text='message'></h1></div></body></html>" > index.html`);
      break;
      
    case "tailwind-cli":
      command = `mkdir ${projectName} && cd ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install -D tailwindcss");
      dependencies.push("npx tailwindcss init");
      postInstallCommands.push("mkdir src");
      postInstallCommands.push(`echo "@tailwind base; @tailwind components; @tailwind utilities;" > src/input.css`);
      postInstallCommands.push(`echo "<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><link href='./dist/output.css' rel='stylesheet'></head><body><h1 class='text-3xl font-bold underline'>${t.welcome} ${projectName}</h1></body></html>" > index.html`);
      break;
      
    case "astro":
      command = `npm create astro@latest ${projectName}`;
      dependencies.push("cd " + projectName);
      dependencies.push("npm install");
      break;
      
    case "eleventy":
      command = `mkdir ${projectName} && cd ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install --save-dev @11ty/eleventy");
      postInstallCommands.push("mkdir src");
      postInstallCommands.push(`echo "# ${projectName}" > src/index.md`);
      break;
      
    case "html":
      command = `mkdir ${projectName} && cd ${projectName}`;
      postInstallCommands.push("mkdir css js images assets");
      postInstallCommands.push(`echo "<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><link rel='stylesheet' href='css/style.css'></head><body><header><nav><h1>${t.welcome} ${projectName}</h1></nav></header><main><section id='content'><p>Your content here</p></section></main><footer><p>&copy; 2024 ${projectName}</p></footer><script src='js/main.js'></script></body></html>" > index.html`);
      postInstallCommands.push(`echo "/* ${projectName} Styles */ * { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: Arial, sans-serif; line-height: 1.6; } header { background: #333; color: white; padding: 1rem; } main { padding: 2rem; min-height: 80vh; } footer { background: #333; color: white; text-align: center; padding: 1rem; }" > css/style.css`);
      postInstallCommands.push(`echo "// ${projectName} JavaScript\\nconsole.log('${t.welcome} ${projectName}!');" > js/main.js`);
      break;
      
    case "cli":
      command = `mkdir ${projectName} && cd ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install commander");
      postInstallCommands.push("mkdir src bin lib");
      postInstallCommands.push(`echo "#!/usr/bin/env node" > bin/${projectName}`);
      postInstallCommands.push(`echo "const { program } = require('commander'); program.version('1.0.0').description('${projectName} CLI'); program.command('start').description('Start the application').action(() => { console.log('${t.welcome} ${projectName} CLI!'); }); program.parse();" > src/index.js`);
      postInstallCommands.push(`chmod +x bin/${projectName}`);
      break;
      
    case "php":
      command = `mkdir ${projectName} && cd ${projectName} && ` +
        `mkdir -p app/config app/controllers app/models app/routers app/views/templates/partials core public && ` +
        `echo "<?php require_once '../core/init.php'; ?>" > public/index.php && ` +
        `echo "<?php
session_start();
require_once 'connexion.php';
require_once '../app/config/params.php';
require_once '../app/routers/index.php';
?>" > core/init.php && ` +
        `echo "<?php
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
        `echo "<?php
\\$content = '';
define('APP_NAME', '${projectName}');
define('BASE_URL', '/');
define('ASSETS_URL', BASE_URL . 'public/assets/');
?>" > app/config/params.php && ` +
        `echo "<?php
\\$action = \\$_GET['action'] ?? 'home';
\\$controller = \\$_GET['controller'] ?? 'pages';

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

require_once '../app/views/templates/index.php';
?>" > app/routers/index.php && ` +
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
        `echo "<?php
class PagesController {
    public function homeAction() {
        global \\$content;
        \\$content = '<h2>${language === 'fr' ? 'Accueil' : 'Home'}</h2><p>${language === 'fr' ? 'Bienvenue dans votre application MVC PHP!' : 'Welcome to your PHP MVC application!'}</p>';
    }
}
?>" > app/controllers/PagesController.php`;
      break;
      
    default:
      command = `npm create vite@latest ${projectName} -- --template react-ts`;
      dependencies.push("cd " + projectName);
      dependencies.push("npm install");
  }
  
  // Add CSS framework setup
  if (cssFramework && cssFramework !== "none") {
    switch (cssFramework) {
      case "tailwind":
        if (!projectType.includes("tailwind") && projectType !== "php" && projectType !== "html") {
          dependencies.push("npm install -D tailwindcss postcss autoprefixer");
          dependencies.push("npx tailwindcss init -p");
        }
        break;
      case "bootstrap":
        if (projectType === "html") {
          postInstallCommands.push(`echo '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">' >> index.html`);
        } else if (projectType !== "php") {
          dependencies.push("npm install bootstrap");
        }
        break;
      case "bulma":
        if (projectType === "html") {
          postInstallCommands.push(`echo '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">' >> index.html`);
        } else if (projectType !== "php") {
          dependencies.push("npm install bulma");
        }
        break;
      case "unocss":
        if (projectType !== "php" && projectType !== "html") {
          dependencies.push("npm install -D unocss");
        }
        break;
    }
  }
  
  // Add additional features
  features.forEach(feature => {
    switch (feature) {
      case "typescript":
        if (!projectType.includes("ts") && projectType !== "php" && projectType !== "html") {
          dependencies.push("npm install -D typescript @types/node");
        }
        break;
      case "eslint":
        if (projectType !== "php" && projectType !== "html") {
          dependencies.push("npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin");
        }
        break;
      case "prettier":
        if (projectType !== "php" && projectType !== "html") {
          dependencies.push("npm install -D prettier");
        }
        break;
      case "tests":
        if (projectType.includes("vite")) {
          dependencies.push("npm install -D vitest @testing-library/react @testing-library/jest-dom");
        } else if (projectType !== "php" && projectType !== "html") {
          dependencies.push("npm install -D jest @types/jest");
        }
        break;
      case "pwa":
        if (projectType.includes("vite")) {
          dependencies.push("npm install -D vite-plugin-pwa");
        }
        break;
      case "docker":
        postInstallCommands.push(`echo "FROM node:18-alpine\\nWORKDIR /app\\nCOPY package*.json ./\\nRUN npm install\\nCOPY . .\\nEXPOSE 3000\\nCMD [\\"npm\\", \\"run\\", \\"dev\\"]" > Dockerfile`);
        break;
    }
  });
  
  // Add database setup
  if (usesDatabase) {
    if (projectType === "php") {
      command += ` && echo "# ${t.databaseSetup}" > README.md`;
    } else if (projectType !== "html") {
      dependencies.push("npm install prisma @prisma/client");
      dependencies.push("npx prisma init");
    }
    
    if (database?.modelNames && database.modelNames.length > 0) {
      command += ` # ${t.models}: ${database.modelNames.join(", ")}`;
    }
  }
  
  // Combine all commands
  let fullCommand = command;
  
  if (dependencies.length > 0) {
    fullCommand += " && " + dependencies.join(" && ");
  }
  
  if (postInstallCommands.length > 0) {
    fullCommand += " && " + postInstallCommands.join(" && ");
  }
  
  // Add final setup message
  if (features.length > 0) {
    fullCommand += ` # ${t.features}: ${features.join(", ")}`;
  }
  
  if (uploadedFiles.length > 0) {
    fullCommand += ` # Additional files: ${uploadedFiles.join(", ")}`;
  }
  
  return fullCommand;
}

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
      command = `mkdir ${projectName} && cd ${projectName}`;
      
      // Create directory structure
      postInstallCommands.push("mkdir app");
      postInstallCommands.push("mkdir app\\config");
      postInstallCommands.push("mkdir app\\controllers");
      postInstallCommands.push("mkdir app\\models");
      postInstallCommands.push("mkdir app\\routers");
      postInstallCommands.push("mkdir app\\views");
      postInstallCommands.push("mkdir app\\views\\templates");
      postInstallCommands.push("mkdir app\\views\\templates\\partials");
      postInstallCommands.push("mkdir core");
      postInstallCommands.push("mkdir public");
      
      // Create files with Windows-compatible commands
      postInstallCommands.push(`echo ^<?php require_once '../core/init.php'; ?^> > public\\index.php`);
      
      postInstallCommands.push(`(echo ^<?php & echo session_start(); & echo require_once 'connexion.php'; & echo require_once '../app/config/params.php'; & echo require_once '../app/routers/index.php'; & echo ?^>) > core\\init.php`);
      
      postInstallCommands.push(`(echo ^<?php & echo class Database { & echo     private static $instance = null; & echo     private $pdo; & echo. & echo     private function __construct() { & echo         try { & echo             $host = 'localhost'; & echo             $dbname = '${projectName}_db'; & echo             $username = 'root'; & echo             $password = ''; & echo             $this-^>pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password); & echo             $this-^>pdo-^>setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); & echo         } catch(PDOException $e) { & echo             die('Database connection failed: ' . $e-^>getMessage()); & echo         } & echo     } & echo. & echo     public static function getInstance() { & echo         if (self::$instance === null) { & echo             self::$instance = new self(); & echo         } & echo         return self::$instance; & echo     } & echo. & echo     public function getConnection() { & echo         return $this-^>pdo; & echo     } & echo } & echo ?^>) > core\\connexion.php`);
      
      postInstallCommands.push(`(echo ^<?php & echo $content = ''; & echo define('APP_NAME', '${projectName}'); & echo define('BASE_URL', '/'); & echo define('ASSETS_URL', BASE_URL . 'public/assets/'); & echo ?^>) > app\\config\\params.php`);
      
      postInstallCommands.push(`(echo ^<?php & echo $action = $_GET['action'] ?? 'home'; & echo $controller = $_GET['controller'] ?? 'pages'; & echo. & echo switch ($controller) { & echo     case 'pages': & echo         require_once '../app/controllers/PagesController.php'; & echo         $pagesController = new PagesController(); & echo         switch ($action) { & echo             case 'home': & echo                 $pagesController-^>homeAction(); & echo                 break; & echo             default: & echo                 $pagesController-^>homeAction(); & echo                 break; & echo         } & echo         break; & echo     default: & echo         require_once '../app/controllers/PagesController.php'; & echo         $pagesController = new PagesController(); & echo         $pagesController-^>homeAction(); & echo         break; & echo } & echo. & echo require_once '../app/views/templates/index.php'; & echo ?^>) > app\\routers\\index.php`);
      
      postInstallCommands.push(`(echo ^<!DOCTYPE html^> & echo ^<html lang='${language}'^> & echo ^<head^> & echo     ^<meta charset='UTF-8'^> & echo     ^<meta name='viewport' content='width=device-width, initial-scale=1.0'^> & echo     ^<title^>^<?= APP_NAME ?^>^</title^> & echo     ^<style^> & echo         * { margin: 0; padding: 0; box-sizing: border-box; } & echo         body { font-family: Arial, sans-serif; line-height: 1.6; } & echo         header { background: #333; color: white; padding: 1rem; } & echo         nav h1 { margin: 0; } & echo         main { padding: 2rem; min-height: 80vh; } & echo         footer { background: #333; color: white; text-align: center; padding: 1rem; } & echo     ^</style^> & echo ^</head^> & echo ^<body^> & echo     ^<header^> & echo         ^<nav^> & echo             ^<h1^>${t.welcome} ^<?= APP_NAME ?^>^</h1^> & echo         ^</nav^> & echo     ^</header^> & echo     ^<main^> & echo         ^<?= $content ?^> & echo     ^</main^> & echo     ^<footer^> & echo         ^<p^>^&copy; ^<?= date('Y') ?^> ^<?= APP_NAME ?^>^</p^> & echo     ^</footer^> & echo ^</body^> & echo ^</html^>) > app\\views\\templates\\index.php`);
      
      postInstallCommands.push(`(echo ^<?php & echo class PagesController { & echo     public function homeAction() { & echo         global $content; & echo         $content = '^<h2^>${language === 'fr' ? 'Accueil' : 'Home'}^</h2^>^<p^>${language === 'fr' ? 'Bienvenue dans votre application MVC PHP!' : 'Welcome to your PHP MVC application!'}^</p^>'; & echo     } & echo } & echo ?^>) > app\\controllers\\PagesController.php`);
      
      postInstallCommands.push(`echo # ${projectName} PHP MVC Project > README.md`);
      postInstallCommands.push(`echo. >> README.md`);
      postInstallCommands.push(`echo ## Setup Instructions >> README.md`);
      postInstallCommands.push(`echo 1. Create a database named '${projectName}_db' >> README.md`);
      postInstallCommands.push(`echo 2. Configure database settings in core/connexion.php >> README.md`);
      postInstallCommands.push(`echo 3. Start your web server (XAMPP, WAMP, etc.) >> README.md`);
      postInstallCommands.push(`echo 4. Access your project at http://localhost/yourproject/public >> README.md`);
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

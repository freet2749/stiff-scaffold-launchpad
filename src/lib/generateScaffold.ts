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
  osType?: 'windows' | 'mac' | 'linux';
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

// Helper function to get OS-specific commands
function getOSCommands(osType: 'windows' | 'mac' | 'linux' = 'windows') {
  const isWindows = osType === 'windows';
  
  return {
    mkdir: isWindows ? 'mkdir' : 'mkdir -p',
    pathSeparator: isWindows ? '\\' : '/',
    echoCommand: isWindows ? 'echo' : 'echo',
    changeDir: 'cd',
    and: isWindows ? ' && ' : ' && ',
    pipe: isWindows ? ' > ' : ' > ',
    fileExtension: isWindows ? '.bat' : '.sh'
  };
}

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
    osType = 'windows',
    uploadedFiles = [] 
  } = options;
  
  const t = translations[language];
  const cmd = getOSCommands(osType);
  let command = "";
  let dependencies: string[] = [];
  let postInstallCommands: string[] = [];
  
  // Generate command based on project type and build tool
  switch (projectType) {
    case "vite-react":
      command = `npm create vite@latest ${projectName} -- --template react-ts`;
      dependencies.push(`${cmd.changeDir} ${projectName}`);
      dependencies.push("npm install");
      break;
      
    case "vite-vue":
      command = `npm create vite@latest ${projectName} -- --template vue-ts`;
      dependencies.push(`${cmd.changeDir} ${projectName}`);
      dependencies.push("npm install");
      break;
      
    case "vite-svelte":
      command = `npm create vite@latest ${projectName} -- --template svelte-ts`;
      dependencies.push(`${cmd.changeDir} ${projectName}`);
      dependencies.push("npm install");
      break;
      
    case "vite-vanilla":
      command = `npm create vite@latest ${projectName} -- --template vanilla-ts`;
      dependencies.push(`${cmd.changeDir} ${projectName}`);
      dependencies.push("npm install");
      break;
      
    case "parcel":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install --save-dev parcel");
      dependencies.push(`${cmd.mkdir} src`);
      postInstallCommands.push(`${cmd.echoCommand} "<!DOCTYPE html><html><head><title>${projectName}</title></head><body><div id='app'></div><script type='module' src='./src/index.ts'></script></body></html>"${cmd.pipe}index.html`);
      postInstallCommands.push(`${cmd.echoCommand} "console.log('${t.welcome} ${projectName}!');"${cmd.pipe}src${cmd.pathSeparator}index.ts`);
      break;
      
    case "alpine":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      postInstallCommands.push(`${cmd.echoCommand} "<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><script defer src='https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js'></script></head><body><div x-data='{ message: \\"${t.welcome} ${projectName}\\" }'><h1 x-text='message'></h1></div></body></html>"${cmd.pipe}index.html`);
      break;
      
    case "tailwind-cli":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install -D tailwindcss");
      dependencies.push("npx tailwindcss init");
      postInstallCommands.push(`${cmd.mkdir} src`);
      postInstallCommands.push(`${cmd.echoCommand} "@tailwind base; @tailwind components; @tailwind utilities;"${cmd.pipe}src${cmd.pathSeparator}input.css`);
      postInstallCommands.push(`${cmd.echoCommand} "<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><link href='./dist/output.css' rel='stylesheet'></head><body><h1 class='text-3xl font-bold underline'>${t.welcome} ${projectName}</h1></body></html>"${cmd.pipe}index.html`);
      break;
      
    case "astro":
      command = `npm create astro@latest ${projectName}`;
      dependencies.push(`${cmd.changeDir} ${projectName}`);
      dependencies.push("npm install");
      break;
      
    case "eleventy":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install --save-dev @11ty/eleventy");
      postInstallCommands.push(`${cmd.mkdir} src`);
      postInstallCommands.push(`${cmd.echoCommand} "# ${projectName}"${cmd.pipe}src${cmd.pathSeparator}index.md`);
      break;
      
    case "html":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      postInstallCommands.push(`${cmd.mkdir} css js images assets`);
      postInstallCommands.push(`${cmd.echoCommand} "<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><link rel='stylesheet' href='css${cmd.pathSeparator}style.css'></head><body><header><nav><h1>${t.welcome} ${projectName}</h1></nav></header><main><section id='content'><p>Your content here</p></section></main><footer><p>&copy; 2024 ${projectName}</p></footer><script src='js${cmd.pathSeparator}main.js'></script></body></html>"${cmd.pipe}index.html`);
      postInstallCommands.push(`${cmd.echoCommand} "/* ${projectName} Styles */ * { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: Arial, sans-serif; line-height: 1.6; } header { background: #333; color: white; padding: 1rem; } main { padding: 2rem; min-height: 80vh; } footer { background: #333; color: white; text-align: center; padding: 1rem; }"${cmd.pipe}css${cmd.pathSeparator}style.css`);
      postInstallCommands.push(`${cmd.echoCommand} "// ${projectName} JavaScript\\nconsole.log('${t.welcome} ${projectName}!');"${cmd.pipe}js${cmd.pathSeparator}main.js`);
      break;
      
    case "cli":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install commander");
      postInstallCommands.push(`${cmd.mkdir} src bin lib`);
      postInstallCommands.push(`${cmd.echoCommand} "#!/usr/bin/env node"${cmd.pipe}bin${cmd.pathSeparator}${projectName}`);
      postInstallCommands.push(`${cmd.echoCommand} "const { program } = require('commander'); program.version('1.0.0').description('${projectName} CLI'); program.command('start').description('Start the application').action(() => { console.log('${t.welcome} ${projectName} CLI!'); }); program.parse();"${cmd.pipe}src${cmd.pathSeparator}index.js`);
      if (!cmd.pathSeparator.includes('\\')) {
        postInstallCommands.push(`chmod +x bin${cmd.pathSeparator}${projectName}`);
      }
      break;
      
    case "php":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      
      // Create directory structure with OS-specific paths
      const dirs = [
        "app",
        `app${cmd.pathSeparator}config`,
        `app${cmd.pathSeparator}controllers`,
        `app${cmd.pathSeparator}models`,
        `app${cmd.pathSeparator}routers`,
        `app${cmd.pathSeparator}views`,
        `app${cmd.pathSeparator}views${cmd.pathSeparator}templates`,
        `app${cmd.pathSeparator}views${cmd.pathSeparator}templates${cmd.pathSeparator}partials`,
        "core",
        "public"
      ];
      
      dirs.forEach(dir => {
        postInstallCommands.push(`${cmd.mkdir} ${dir}`);
      });
      
      // Create files with OS-specific syntax
      if (osType === 'windows') {
        // Windows-specific commands with proper escaping
        postInstallCommands.push(`echo ^<?php require_once '../core/init.php'; ?^>${cmd.pipe}public${cmd.pathSeparator}index.php`);
        
        postInstallCommands.push(`(echo ^<?php & echo session_start(); & echo require_once 'connexion.php'; & echo require_once '../app/config/params.php'; & echo require_once '../app/routers/index.php'; & echo ?^>)${cmd.pipe}core${cmd.pathSeparator}init.php`);
        
        // Database connection file
        postInstallCommands.push(`(echo ^<?php class Database { private static $instance = null; private $pdo; private function __construct() { try { $host = 'localhost'; $dbname = '${projectName}_db'; $username = 'root'; $password = ''; $this-^>pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password); $this-^>pdo-^>setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); } catch(PDOException $e) { die('Database connection failed: ' . $e-^>getMessage()); } } public static function getInstance() { if (self::$instance === null) { self::$instance = new self(); } return self::$instance; } public function getConnection() { return $this-^>pdo; } } ?^>)${cmd.pipe}core${cmd.pathSeparator}connexion.php`);
      } else {
        // Unix/Linux/Mac commands
        postInstallCommands.push(`echo '<?php require_once "../core/init.php"; ?>'${cmd.pipe}public${cmd.pathSeparator}index.php`);
        
        postInstallCommands.push(`cat > core${cmd.pathSeparator}init.php << 'EOF'
<?php
session_start();
require_once 'connexion.php';
require_once '../app/config/params.php';
require_once '../app/routers/index.php';
?>
EOF`);
        
        postInstallCommands.push(`cat > core${cmd.pathSeparator}connexion.php << 'EOF'
<?php
class Database {
    private static $instance = null;
    private $pdo;
    
    private function __construct() {
        try {
            $host = 'localhost';
            $dbname = '${projectName}_db';
            $username = 'root';
            $password = '';
            $this->pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            die('Database connection failed: ' . $e->getMessage());
        }
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    public function getConnection() {
        return $this->pdo;
    }
}
?>
EOF`);
      }
      
      postInstallCommands.push(`${cmd.echoCommand} "# ${projectName} PHP MVC Project"${cmd.pipe}README.md`);
      postInstallCommands.push(`${cmd.echoCommand} ""${cmd.pipe}README.md`);
      postInstallCommands.push(`${cmd.echoCommand} "## Setup Instructions"${cmd.pipe}README.md`);
      postInstallCommands.push(`${cmd.echoCommand} "1. Create a database named '${projectName}_db'"${cmd.pipe}README.md`);
      postInstallCommands.push(`${cmd.echoCommand} "2. Configure database settings in core${cmd.pathSeparator}connexion.php"${cmd.pipe}README.md`);
      postInstallCommands.push(`${cmd.echoCommand} "3. Start your web server (XAMPP, WAMP, etc.)"${cmd.pipe}README.md`);
      postInstallCommands.push(`${cmd.echoCommand} "4. Access your project at http://localhost/yourproject/public"${cmd.pipe}README.md`);
      break;
      
    default:
      command = `npm create vite@latest ${projectName} -- --template react-ts`;
      dependencies.push(`${cmd.changeDir} ${projectName}`);
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
          postInstallCommands.push(`${cmd.echoCommand} '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">' >> index.html`);
        } else if (projectType !== "php") {
          dependencies.push("npm install bootstrap");
        }
        break;
      case "bulma":
        if (projectType === "html") {
          postInstallCommands.push(`${cmd.echoCommand} '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">' >> index.html`);
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
        postInstallCommands.push(`${cmd.echoCommand} "FROM node:18-alpine\\nWORKDIR /app\\nCOPY package*.json ./\\nRUN npm install\\nCOPY . .\\nEXPOSE 3000\\nCMD [\\"npm\\", \\"run\\", \\"dev\\"]"${cmd.pipe}Dockerfile`);
        break;
    }
  });
  
  // Add database setup
  if (usesDatabase) {
    if (projectType === "php") {
      command += ` && ${cmd.echoCommand} "# ${t.databaseSetup}"${cmd.pipe}README.md`;
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
    fullCommand += cmd.and + dependencies.join(cmd.and);
  }
  
  if (postInstallCommands.length > 0) {
    fullCommand += cmd.and + postInstallCommands.join(cmd.and);
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

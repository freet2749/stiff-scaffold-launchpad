
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
    and: ' && ',
    pipe: ' > ',
    createFile: (content: string, file: string) => {
      if (isWindows) {
        // For Windows, we need to handle special characters differently
        const escapedContent = content
          .replace(/\$/g, '$$')  // Escape dollar signs
          .replace(/"/g, '\\"'); // Escape quotes
        return `echo "${escapedContent}" > ${file}`;
      } else {
        return `echo '${content}' > ${file}`;
      }
    }
  };
}

export function generateScaffoldCommand(options: ScaffoldOptions): string {
  const { 
    projectName, 
    projectType = "html", 
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
  let commands: string[] = [];
  let dependencies: string[] = [];
  
  // Start with creating and entering the project directory
  commands.push(`${cmd.mkdir} ${projectName}`);
  commands.push(`${cmd.changeDir} ${projectName}`);
  
  // Generate commands based on project type
  switch (projectType) {
    case "html":
      // Create directories
      commands.push(`${cmd.mkdir} css`);
      commands.push(`${cmd.mkdir} js`);
      commands.push(`${cmd.mkdir} images`);
      commands.push(`${cmd.mkdir} assets`);
      
      // Create HTML file
      const htmlContent = `<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><link rel='stylesheet' href='css${cmd.pathSeparator}style.css'></head><body><header><nav><h1>${t.welcome} ${projectName}</h1></nav></header><main><section id='content'><p>Your content here</p></section></main><footer><p>&copy; 2024 ${projectName}</p></footer><script src='js${cmd.pathSeparator}main.js'></script></body></html>`;
      commands.push(cmd.createFile(htmlContent, 'index.html'));
      
      // Create CSS file
      const cssContent = `/* ${projectName} Styles */ * { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: Arial, sans-serif; line-height: 1.6; } header { background: #333; color: white; padding: 1rem; } main { padding: 2rem; min-height: 80vh; } footer { background: #333; color: white; text-align: center; padding: 1rem; }`;
      commands.push(cmd.createFile(cssContent, `css${cmd.pathSeparator}style.css`));
      
      // Create JS file
      const jsContent = `// ${projectName} JavaScript\\nconsole.log('${t.welcome} ${projectName}!');`;
      commands.push(cmd.createFile(jsContent, `js${cmd.pathSeparator}main.js`));
      break;
      
    case "nodejs":
      dependencies.push("npm init -y");
      dependencies.push("npm install express");
      
      commands.push(`${cmd.mkdir} routes`);
      commands.push(`${cmd.mkdir} views`);
      commands.push(`${cmd.mkdir} public`);
      
      const serverContent = `const express = require('express'); const app = express(); const PORT = 3000; app.use(express.static('public')); app.get('/', (req, res) => { res.send('<h1>${t.welcome} ${projectName}!</h1>'); }); app.listen(PORT, () => { console.log('Server running on http://localhost:' + PORT); });`;
      commands.push(cmd.createFile(serverContent, 'server.js'));
      break;
      
    case "alpine":
      const alpineContent = `<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><script defer src='https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js'></script></head><body><div x-data='{ message: \\\"${t.welcome} ${projectName}\\\" }'><h1 x-text='message'></h1></div></body></html>`;
      commands.push(cmd.createFile(alpineContent, 'index.html'));
      break;

    case "wordpress":
      commands.push(`${cmd.mkdir} assets`);
      commands.push(`${cmd.mkdir} css`);
      commands.push(`${cmd.mkdir} js`);
      commands.push(`${cmd.mkdir} images`);
      
      const wpStyleContent = `/*\\nTheme Name: ${projectName}\\nDescription: Custom WordPress theme\\nVersion: 1.0\\n*/`;
      commands.push(cmd.createFile(wpStyleContent, 'style.css'));
      
      const headerContent = `<!DOCTYPE html><html <?php language_attributes(); ?>><head><meta charset='<?php bloginfo('charset'); ?>'><meta name='viewport' content='width=device-width, initial-scale=1'><title><?php wp_title(); ?></title><?php wp_head(); ?></head><body <?php body_class(); ?>><?php wp_body_open(); ?>`;
      commands.push(cmd.createFile(headerContent, 'header.php'));
      
      const indexContent = `<?php get_header(); ?><main><h1>${t.welcome} <?php bloginfo('name'); ?></h1></main><?php get_footer(); ?>`;
      commands.push(cmd.createFile(indexContent, 'index.php'));
      
      const footerContent = `<?php wp_footer(); ?></body></html>`;
      commands.push(cmd.createFile(footerContent, 'footer.php'));
      break;
      
    case "php":
      // Create directory structure
      const dirs = [
        "app",
        `app${cmd.pathSeparator}config`,
        `app${cmd.pathSeparator}controllers`,
        `app${cmd.pathSeparator}models`,
        `app${cmd.pathSeparator}routers`,
        `app${cmd.pathSeparator}views`,
        `app${cmd.pathSeparator}views${cmd.pathSeparator}templates`,
        "core",
        "public"
      ];
      
      dirs.forEach(dir => {
        commands.push(`${cmd.mkdir} ${dir}`);
      });
      
      // Create PHP files with proper content
      const publicIndexContent = `<?php require_once '../core/init.php'; ?>`;
      commands.push(cmd.createFile(publicIndexContent, `public${cmd.pathSeparator}index.php`));
      
      const initContent = `<?php session_start(); require_once 'connexion.php'; require_once '../app/config/params.php'; require_once '../app/routers/index.php'; ?>`;
      commands.push(cmd.createFile(initContent, `core${cmd.pathSeparator}init.php`));
      
      const dbContent = `<?php class Database { private static $instance = null; private $pdo; private function __construct() { try { $host = 'localhost'; $dbname = '${projectName}_db'; $username = 'root'; $password = ''; $this->pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password); $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); } catch(PDOException $e) { die('Database connection failed: ' . $e->getMessage()); } } public static function getInstance() { if (self::$instance === null) { self::$instance = new self(); } return self::$instance; } public function getConnection() { return $this->pdo; } } ?>`;
      commands.push(cmd.createFile(dbContent, `core${cmd.pathSeparator}connexion.php`));
      
      commands.push(cmd.createFile(`# ${projectName} PHP MVC Project`, 'README.md'));
      break;
      
    default:
      commands.push(cmd.createFile(`# ${projectName}`, 'README.md'));
  }
  
  // Add CSS framework setup
  if (cssFramework && cssFramework !== "none") {
    switch (cssFramework) {
      case "bootstrap":
        if (projectType === "nodejs") {
          dependencies.push("npm install bootstrap");
        }
        break;
      case "tailwind":
        if (projectType === "nodejs") {
          dependencies.push("npm install -D tailwindcss");
          dependencies.push("npx tailwindcss init");
        }
        break;
    }
  }
  
  // Add simple features
  features.forEach(feature => {
    switch (feature) {
      case "prettier":
        if (projectType === "nodejs") {
          dependencies.push("npm install -D prettier");
        }
        break;
      case "eslint":
        if (projectType === "nodejs") {
          dependencies.push("npm install -D eslint");
        }
        break;
      case "docker":
        if (projectType === "nodejs") {
          const dockerContent = `FROM node:18-alpine\\nWORKDIR /app\\nCOPY package*.json ./\\nRUN npm install\\nCOPY . .\\nEXPOSE 3000\\nCMD ["node", "server.js"]`;
          commands.push(cmd.createFile(dockerContent, 'Dockerfile'));
        } else {
          const dockerContent = `FROM nginx:alpine\\nCOPY . /usr/share/nginx/html\\nEXPOSE 80`;
          commands.push(cmd.createFile(dockerContent, 'Dockerfile'));
        }
        break;
      case "git":
        commands.push("git init");
        const gitignoreContent = `node_modules/\\n*.log\\n.env\\n.DS_Store`;
        commands.push(cmd.createFile(gitignoreContent, '.gitignore'));
        break;
    }
  });
  
  // Add database setup
  if (usesDatabase && projectType === "php") {
    const dbSetupContent = `# ${t.databaseSetup}`;
    commands.push(cmd.createFile(dbSetupContent, 'database_setup.md'));
  }
  
  // Combine all commands
  let allCommands = commands;
  
  // Add dependencies after main commands
  if (dependencies.length > 0) {
    allCommands = allCommands.concat(dependencies);
  }
  
  return allCommands.join(cmd.and);
}

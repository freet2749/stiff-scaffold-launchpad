
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
  let command = "";
  let dependencies: string[] = [];
  let postInstallCommands: string[] = [];
  
  // Generate command based on project type
  switch (projectType) {
    case "html":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      postInstallCommands.push(`${cmd.mkdir} css js images assets`);
      postInstallCommands.push(`${cmd.echoCommand} "<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><link rel='stylesheet' href='css${cmd.pathSeparator}style.css'></head><body><header><nav><h1>${t.welcome} ${projectName}</h1></nav></header><main><section id='content'><p>Your content here</p></section></main><footer><p>&copy; 2024 ${projectName}</p></footer><script src='js${cmd.pathSeparator}main.js'></script></body></html>"${cmd.pipe}index.html`);
      postInstallCommands.push(`${cmd.echoCommand} "/* ${projectName} Styles */ * { box-sizing: border-box; margin: 0; padding: 0; } body { font-family: Arial, sans-serif; line-height: 1.6; } header { background: #333; color: white; padding: 1rem; } main { padding: 2rem; min-height: 80vh; } footer { background: #333; color: white; text-align: center; padding: 1rem; }"${cmd.pipe}css${cmd.pathSeparator}style.css`);
      postInstallCommands.push(`${cmd.echoCommand} "// ${projectName} JavaScript\\nconsole.log('${t.welcome} ${projectName}!');"${cmd.pipe}js${cmd.pathSeparator}main.js`);
      break;
      
    case "nodejs":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install express");
      postInstallCommands.push(`${cmd.mkdir} routes views public`);
      postInstallCommands.push(`${cmd.echoCommand} "const express = require('express'); const app = express(); const PORT = 3000; app.use(express.static('public')); app.get('/', (req, res) => { res.send('<h1>${t.welcome} ${projectName}!</h1>'); }); app.listen(PORT, () => { console.log('Server running on http://localhost:' + PORT); });"${cmd.pipe}server.js`);
      break;
      
    case "alpine":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      postInstallCommands.push(`${cmd.echoCommand} "<!DOCTYPE html><html lang='${language}'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${projectName}</title><script defer src='https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js'></script></head><body><div x-data='{ message: \\"${t.welcome} ${projectName}\\" }'><h1 x-text='message'></h1></div></body></html>"${cmd.pipe}index.html`);
      break;
      
    case "eleventy":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      dependencies.push("npm init -y");
      dependencies.push("npm install --save-dev @11ty/eleventy");
      postInstallCommands.push(`${cmd.mkdir} src`);
      postInstallCommands.push(`${cmd.echoCommand} "# ${projectName}"${cmd.pipe}src${cmd.pathSeparator}index.md`);
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

    case "wordpress":
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      postInstallCommands.push(`${cmd.mkdir} assets css js images`);
      postInstallCommands.push(`${cmd.echoCommand} "<?php /*\\nTheme Name: ${projectName}\\nDescription: Custom WordPress theme\\nVersion: 1.0\\n*/"${cmd.pipe}style.css`);
      postInstallCommands.push(`${cmd.echoCommand} "<!DOCTYPE html><html <?php language_attributes(); ?>><head><meta charset='<?php bloginfo('charset'); ?>'><meta name='viewport' content='width=device-width, initial-scale=1'><title><?php wp_title(); ?></title><?php wp_head(); ?></head><body <?php body_class(); ?>><?php wp_body_open(); ?>"${cmd.pipe}header.php`);
      postInstallCommands.push(`${cmd.echoCommand} "<?php get_header(); ?><main><h1>${t.welcome} <?php bloginfo('name'); ?></h1></main><?php get_footer(); ?>"${cmd.pipe}index.php`);
      postInstallCommands.push(`${cmd.echoCommand} "<?php wp_footer(); ?></body></html>"${cmd.pipe}footer.php`);
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
        "core",
        "public"
      ];
      
      dirs.forEach(dir => {
        postInstallCommands.push(`${cmd.mkdir} ${dir}`);
      });
      
      // Create files with better Windows compatibility
      if (osType === 'windows') {
        // Use batch files for Windows
        postInstallCommands.push(`echo ^<?php require_once '../core/init.php'; ?^>${cmd.pipe}public${cmd.pathSeparator}index.php`);
        postInstallCommands.push(`echo ^<?php session_start(); require_once 'connexion.php'; require_once '../app/config/params.php'; require_once '../app/routers/index.php'; ?^>${cmd.pipe}core${cmd.pathSeparator}init.php`);
      } else {
        // Unix/Linux/Mac commands
        postInstallCommands.push(`echo '<?php require_once "../core/init.php"; ?>'${cmd.pipe}public${cmd.pathSeparator}index.php`);
        postInstallCommands.push(`echo '<?php session_start(); require_once "connexion.php"; require_once "../app/config/params.php"; require_once "../app/routers/index.php"; ?>'${cmd.pipe}core${cmd.pathSeparator}init.php`);
      }
      
      postInstallCommands.push(`${cmd.echoCommand} "# ${projectName} PHP MVC Project"${cmd.pipe}README.md`);
      break;
      
    default:
      command = `${cmd.mkdir} ${projectName}${cmd.and}${cmd.changeDir} ${projectName}`;
      postInstallCommands.push(`${cmd.echoCommand} "# ${projectName}"${cmd.pipe}README.md`);
  }
  
  // Add CSS framework setup
  if (cssFramework && cssFramework !== "none") {
    switch (cssFramework) {
      case "bootstrap":
        if (projectType === "html") {
          postInstallCommands.push(`${cmd.echoCommand} '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">' >> index.html`);
        } else if (projectType === "nodejs") {
          dependencies.push("npm install bootstrap");
        }
        break;
      case "bulma":
        if (projectType === "html") {
          postInstallCommands.push(`${cmd.echoCommand} '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">' >> index.html`);
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
        if (projectType === "nodejs" || projectType === "cli") {
          dependencies.push("npm install -D prettier");
        }
        break;
      case "eslint":
        if (projectType === "nodejs" || projectType === "cli") {
          dependencies.push("npm install -D eslint");
        }
        break;
      case "docker":
        if (projectType === "nodejs") {
          postInstallCommands.push(`${cmd.echoCommand} "FROM node:18-alpine\\nWORKDIR /app\\nCOPY package*.json ./\\nRUN npm install\\nCOPY . .\\nEXPOSE 3000\\nCMD [\\"node\\", \\"server.js\\"]"${cmd.pipe}Dockerfile`);
        } else {
          postInstallCommands.push(`${cmd.echoCommand} "FROM nginx:alpine\\nCOPY . /usr/share/nginx/html\\nEXPOSE 80"${cmd.pipe}Dockerfile`);
        }
        break;
      case "git":
        postInstallCommands.push("git init");
        postInstallCommands.push(`${cmd.echoCommand} "node_modules/\\n*.log\\n.env\\n.DS_Store"${cmd.pipe}.gitignore`);
        break;
    }
  });
  
  // Add database setup
  if (usesDatabase) {
    if (projectType === "php") {
      postInstallCommands.push(`${cmd.echoCommand} "# ${t.databaseSetup}"${cmd.pipe}README.md`);
    } else if (projectType === "nodejs") {
      dependencies.push("npm install mysql2");
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

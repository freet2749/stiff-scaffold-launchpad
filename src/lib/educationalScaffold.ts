interface EducationalOptions {
  projectName: string;
  studentName?: string;
  learningPath: any;
  currentStep: number;
}

interface Exercise {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  objectives: string[];
  files: string[];
}

interface LearningResource {
  title: string;
  description: string;
  type: string;
  url?: string;
}

interface EducationalContent {
  command: string;
  structure: string;
  exercises: Exercise[];
  resources: LearningResource[];
}

export function generateEducationalScaffold(options: EducationalOptions): EducationalContent {
  const { projectName, studentName, learningPath, currentStep } = options;
  
  // Generate educational content based on learning path
  switch (learningPath.id) {
    case "php-basics":
      return generatePHPBasicsProject(projectName, studentName, currentStep);
    case "php-mvc":
      return generatePHPMVCProject(projectName, studentName, currentStep);
    case "modern-frontend":
      return generateFrontendProject(projectName, studentName, currentStep);
    case "fullstack-app":
      return generateFullStackProject(projectName, studentName, currentStep);
    default:
      return generateDefaultProject(projectName, studentName);
  }
}

function generatePHPBasicsProject(projectName: string, studentName?: string, step: number = 0): EducationalContent {
  const exercises: Exercise[] = [
    {
      title: "Variables and Constants Practice",
      description: "Learn to declare and use variables, constants, and understand PHP data types",
      difficulty: "Beginner",
      duration: "30 mins",
      objectives: [
        "Understand PHP variable syntax",
        "Practice with different data types",
        "Learn the difference between variables and constants",
        "Use var_dump() for debugging"
      ],
      files: ["01-variables.php", "02-constants.php", "exercises/variable-practice.php"]
    },
    {
      title: "Functions and Control Structures",
      description: "Master PHP functions, if statements, loops, and logical operators",
      difficulty: "Beginner",
      duration: "45 mins",
      objectives: [
        "Create and call custom functions",
        "Use if/else statements effectively",
        "Practice with for and while loops",
        "Understand function parameters and return values"
      ],
      files: ["03-functions.php", "04-control-structures.php", "exercises/calculator.php"]
    },
    {
      title: "Arrays and Form Handling",
      description: "Work with arrays and process HTML form data with PHP",
      difficulty: "Beginner",
      duration: "60 mins",
      objectives: [
        "Understand indexed and associative arrays",
        "Use array functions (count, in_array, etc.)",
        "Process GET and POST data",
        "Validate and sanitize user input"
      ],
      files: ["05-arrays.php", "06-forms.php", "contact-form.html", "process-form.php"]
    }
  ];

  const resources: LearningResource[] = [
    {
      title: "PHP Official Documentation",
      description: "Complete reference for PHP syntax and functions",
      type: "Documentation"
    },
    {
      title: "PHP Syntax Cheat Sheet",
      description: "Quick reference for common PHP patterns",
      type: "Cheat Sheet"
    },
    {
      title: "Form Validation Best Practices",
      description: "Learn how to properly validate user input",
      type: "Tutorial"
    }
  ];

  const command = `mkdir ${projectName} && cd ${projectName} && ` +
    // Create directory structure
    `mkdir exercises solutions assets css js && ` +
    
    // Create README with learning objectives
    `echo "# ${projectName} - PHP Learning Project
${studentName ? `Student: ${studentName}` : ''}

## Learning Objectives
- Master PHP fundamentals: variables, functions, arrays
- Understand form processing and validation
- Practice with control structures and logical operators
- Build real-world projects step by step

## Getting Started
1. Start with 01-variables.php
2. Complete each exercise in order
3. Check your solutions against the solutions folder
4. Build the final calculator project

## Exercises
${exercises.map((ex, i) => `${i + 1}. ${ex.title} (${ex.duration})`).join('\n')}

## Need Help?
- Check the comments in each file
- Review the examples before attempting exercises
- Don't skip the fundamentals!
" > README.md && ` +

    // Create the learning files
    `echo "<?php
/*
 * Exercise 1: Variables and Constants
 * Learn the basics of PHP data types and variable handling
 */

// TODO: Declare variables of different types
// \$name = 'Your name here';
// \$age = 0;
// \$isStudent = true;
// \$height = 0.0;

// TODO: Try var_dump() to see variable information
// var_dump(\$name);

// TODO: Create constants
// define('SCHOOL_NAME', 'Your School');
// const MAX_STUDENTS = 30;

echo '<h1>PHP Variables Practice</h1>';
// Your code here...
?>" > 01-variables.php && ` +

    `echo "<?php
/*
 * Exercise 2: Functions Practice
 * Learn to create and use functions
 */

// TODO: Create a function to calculate area of rectangle
function calculateArea(\$length, \$width) {
    // Your code here
    return 0;
}

// TODO: Create a function to check if number is even
function isEven(\$number) {
    // Your code here
    return false;
}

// TODO: Create a function to greet user
function greetUser(\$name, \$timeOfDay = 'day') {
    // Your code here
    return '';
}

// Test your functions
echo '<h1>Function Practice Results</h1>';
// Test calculateArea(5, 3)
// Test isEven(7)
// Test greetUser('Alice', 'morning')
?>" > 03-functions.php && ` +

    `echo "<?php
/*
 * Calculator Exercise - Apply what you've learned!
 * Create a simple calculator using functions
 */

function add(\$a, \$b) {
    return \$a + \$b;
}

function subtract(\$a, \$b) {
    return \$a - \$b;
}

function multiply(\$a, \$b) {
    return \$a * \$b;
}

function divide(\$a, \$b) {
    if (\$b == 0) {
        return 'Error: Cannot divide by zero';
    }
    return \$a / \$b;
}

// TODO: Create a main calculator function that takes operation and numbers
function calculator(\$operation, \$num1, \$num2) {
    // Your code here
    // Use switch statement to handle different operations
}

// Test your calculator
echo '<h1>Calculator Results</h1>';
echo 'Addition: 5 + 3 = ' . calculator('add', 5, 3) . '<br>';
echo 'Division: 10 / 2 = ' . calculator('divide', 10, 2) . '<br>';
?>" > exercises/calculator.php && ` +

    // Create solutions
    `echo "<?php
// Solution: Complete calculator function
function calculator(\$operation, \$num1, \$num2) {
    switch (\$operation) {
        case 'add':
            return add(\$num1, \$num2);
        case 'subtract':
            return subtract(\$num1, \$num2);
        case 'multiply':
            return multiply(\$num1, \$num2);
        case 'divide':
            return divide(\$num1, \$num2);
        default:
            return 'Error: Unknown operation';
    }
}
?>" > solutions/calculator-solution.php && ` +

    // Create basic HTML form
    `echo "<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Contact Form - PHP Practice</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        form { background: #f4f4f4; padding: 20px; border-radius: 5px; }
        input, textarea { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 3px; }
        button { background: #007cba; color: white; padding: 12px 24px; border: none; border-radius: 3px; cursor: pointer; }
        button:hover { background: #005a87; }
    </style>
</head>
<body>
    <h1>Contact Form Practice</h1>
    <form action='process-form.php' method='POST'>
        <input type='text' name='name' placeholder='Your Name' required>
        <input type='email' name='email' placeholder='Your Email' required>
        <textarea name='message' placeholder='Your Message' rows='5' required></textarea>
        <button type='submit'>Send Message</button>
    </form>
</body>
</html>" > contact-form.html && ` +

    `echo "<?php
/*
 * Form Processing Exercise
 * Learn to handle form data safely
 */

if (\$_SERVER['REQUEST_METHOD'] == 'POST') {
    // TODO: Get and sanitize form data
    \$name = htmlspecialchars(\$_POST['name'] ?? '');
    \$email = filter_var(\$_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    \$message = htmlspecialchars(\$_POST['message'] ?? '');
    
    // TODO: Validate data
    \$errors = [];
    
    if (empty(\$name)) {
        \$errors[] = 'Name is required';
    }
    
    if (!filter_var(\$email, FILTER_VALIDATE_EMAIL)) {
        \$errors[] = 'Valid email is required';
    }
    
    if (empty(\$message)) {
        \$errors[] = 'Message is required';
    }
    
    // Display results
    if (empty(\$errors)) {
        echo '<h1>Message Received!</h1>';
        echo '<p>Thank you, ' . \$name . '. We will reply to ' . \$email . '</p>';
        echo '<p>Your message: ' . \$message . '</p>';
    } else {
        echo '<h1>Please fix these errors:</h1>';
        foreach (\$errors as \$error) {
            echo '<p style=\"color: red;\">' . \$error . '</p>';
        }
        echo '<a href=\"contact-form.html\">Go back</a>';
    }
} else {
    echo 'No form data received';
}
?>" > process-form.php`;

  const structure = `${projectName}/
├── README.md              # Learning objectives and guide
├── 01-variables.php       # Variables and constants practice
├── 03-functions.php       # Functions exercise
├── contact-form.html      # HTML form for practice
├── process-form.php       # Form processing exercise
├── exercises/
│   ├── calculator.php     # Calculator project
│   └── variable-practice.php
├── solutions/
│   └── calculator-solution.php
├── assets/
├── css/
└── js/`;

  return { command, structure, exercises, resources };
}

function generatePHPMVCProject(projectName: string, studentName?: string, step: number = 0): EducationalContent {
  const exercises: Exercise[] = [
    {
      title: "Understanding MVC Architecture",
      description: "Learn the Model-View-Controller pattern and why it's important",
      difficulty: "Intermediate",
      duration: "45 mins",
      objectives: [
        "Understand separation of concerns",
        "Learn the role of Models, Views, and Controllers",
        "See how data flows in MVC applications",
        "Practice with simple routing"
      ],
      files: ["app/controllers/HomeController.php", "app/views/home.php", "app/models/User.php"]
    },
    {
      title: "Database Integration",
      description: "Connect your MVC app to a database and create models",
      difficulty: "Intermediate",
      duration: "60 mins",
      objectives: [
        "Set up PDO database connection",
        "Create database models",
        "Implement CRUD operations",
        "Handle database errors properly"
      ],
      files: ["core/Database.php", "app/models/Task.php", "database/schema.sql"]
    }
  ];

  const resources: LearningResource[] = [
    {
      title: "MVC Pattern Explained",
      description: "Comprehensive guide to understanding MVC architecture",
      type: "Tutorial"
    },
    {
      title: "PDO Database Tutorial",
      description: "Learn secure database operations with PDO",
      type: "Documentation"
    }
  ];

  // Similar structure to existing PHP generation but with educational content
  const command = generatePHPMVCCommand(projectName, studentName);
  
  const structure = `${projectName}/
├── README.md                    # MVC Learning Guide
├── public/
│   └── index.php               # Entry point
├── app/
│   ├── controllers/
│   │   ├── HomeController.php  # Home page logic
│   │   └── TaskController.php  # CRUD operations
│   ├── models/
│   │   ├── User.php           # User model with examples
│   │   └── Task.php           # Task model for practice
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.php       # Main template
│   │   ├── home/
│   │   │   └── index.php      # Home view
│   │   └── tasks/
│   │       ├── index.php      # Task list
│   │       └── create.php     # Create task form
│   └── config/
│       └── config.php         # App configuration
├── core/
│   ├── Database.php           # Database connection
│   ├── Router.php             # URL routing
│   └── Controller.php         # Base controller
└── database/
    ├── schema.sql             # Database structure
    └── sample-data.sql        # Test data`;

  return { command, structure, exercises, resources };
}

function generatePHPMVCCommand(projectName: string, studentName?: string): string {
  const command = `mkdir ${projectName} && cd ${projectName} && ` +
    `mkdir -p app/controllers app/models app/views/layouts app/views/home app/views/tasks app/config core public database && ` +
    
    // Create educational README
    `echo "# ${projectName} - PHP MVC Learning Project
${studentName ? `Student: ${studentName}` : ''}

## What You'll Learn
- Model-View-Controller (MVC) architecture pattern
- Proper separation of concerns in web applications
- Database integration with PDO
- URL routing and clean URLs
- Session management and user authentication

## Project Structure
This project follows the MVC pattern:
- **Models**: Handle data and business logic (app/models/)
- **Views**: Handle presentation and UI (app/views/)
- **Controllers**: Handle user input and coordinate between models and views (app/controllers/)
- **Core**: Framework code that powers the application (core/)

## Getting Started
1. Set up a local server (XAMPP, WAMP, or built-in PHP server)
2. Create a MySQL database named '${projectName}_db'
3. Import database/schema.sql
4. Configure database settings in app/config/config.php
5. Visit your project in the browser

## Learning Exercises
1. Start by understanding the file structure
2. Trace how a request flows through the application
3. Create new controllers and views
4. Add database models
5. Implement CRUD operations

## Tips for Success
- Read the comments in each file carefully
- Start small and build incrementally
- Test each feature as you build it
- Don't be afraid to experiment!
" > README.md && ` +

    // Create core framework files with educational comments
    `echo "<?php
/*
 * Database Connection Class
 * 
 * This class implements the Singleton pattern to ensure
 * only one database connection exists throughout the application.
 * 
 * Learning objectives:
 * - Understand the Singleton design pattern
 * - Learn secure database connections with PDO
 * - Practice error handling
 */

class Database {
    private static \\$instance = null;
    private \\$pdo;
    
    // Private constructor prevents direct instantiation
    private function __construct() {
        try {
            \\$host = 'localhost';
            \\$dbname = '${projectName}_db';
            \\$username = 'root';
            \\$password = '';
            
            // Create PDO connection with error handling
            \\$this->pdo = new PDO(\\\"mysql:host=\\$host;dbname=\\$dbname;charset=utf8\\\", \\$username, \\$password);
            \\$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            \\$this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            
        } catch(PDOException \\$e) {
            die('Database connection failed: ' . \\$e->getMessage());
        }
    }
    
    // Get the single instance of Database
    public static function getInstance() {
        if (self::\\$instance === null) {
            self::\\$instance = new self();
        }
        return self::\\$instance;
    }
    
    // Get the PDO connection
    public function getConnection() {
        return \\$this->pdo;
    }
    
    // Prevent cloning of the instance
    private function __clone() {}
    
    // Prevent unserialization of the instance
    public function __wakeup() {}
}
?>" > core/Database.php`;

  // Add more detailed MVC files with educational content...
  return command;
}

function generateFrontendProject(projectName: string, studentName?: string, step: number = 0): EducationalContent {
  // Implementation for modern frontend learning path
  const exercises: Exercise[] = [
    {
      title: "React Components and Props",
      description: "Build reusable components and learn prop passing",
      difficulty: "Intermediate",
      duration: "60 mins",
      objectives: [
        "Create functional components",
        "Pass data with props",
        "Handle events",
        "Use React DevTools"
      ],
      files: ["src/components/UserCard.tsx", "src/components/Button.tsx"]
    }
  ];

  const resources: LearningResource[] = [
    {
      title: "React Official Tutorial",
      description: "Interactive tutorial from the React team",
      type: "Tutorial"
    }
  ];

  const command = `npm create vite@latest ${projectName} -- --template react-ts && cd ${projectName} && npm install`;
  const structure = `${projectName}/\n├── src/\n│   ├── components/\n│   └── App.tsx\n└── package.json`;

  return { command, structure, exercises, resources };
}

function generateFullStackProject(projectName: string, studentName?: string, step: number = 0): EducationalContent {
  // Implementation for full-stack learning path
  const exercises: Exercise[] = [];
  const resources: LearningResource[] = [];
  const command = `mkdir ${projectName}`;
  const structure = `${projectName}/`;

  return { command, structure, exercises, resources };
}

function generateDefaultProject(projectName: string, studentName?: string): EducationalContent {
  const exercises: Exercise[] = [];
  const resources: LearningResource[] = [];
  const command = `mkdir ${projectName}`;
  const structure = `${projectName}/`;

  return { command, structure, exercises, resources };
}

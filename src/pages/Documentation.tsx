
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const Documentation = () => {
  return (
    <ThemeProvider defaultTheme="system">
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4">
          <Header />
          
          <section className="py-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold mb-6">Documentation</h1>
              
              <Tabs defaultValue="getting-started" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                  <TabsTrigger value="commands">Commands</TabsTrigger>
                  <TabsTrigger value="examples">Examples</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                </TabsList>
                
                <TabsContent value="getting-started">
                  <Card>
                    <CardHeader>
                      <CardTitle>Getting Started with StiffTools</CardTitle>
                      <CardDescription>Learn how to scaffold your MVC projects in seconds</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <section>
                        <h3 className="text-xl font-semibold mb-3">Installation</h3>
                        <p className="mb-3">Install StiffTools globally using npm:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>npm install -g stifftools</code>
                        </pre>
                        
                        <p className="mt-4 mb-3">Or use it directly with npx:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>npx stifftools create my-project</code>
                        </pre>
                      </section>
                      
                      <section>
                        <h3 className="text-xl font-semibold mb-3">Basic Usage</h3>
                        <p className="mb-3">Create a new MVC project:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>stifftools create my-project</code>
                        </pre>
                        
                        <p className="mt-4">This will create a basic MVC project structure with the following folders:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                          <li>controllers - For your application controllers</li>
                          <li>models - For your data models</li>
                          <li>views - For your application views</li>
                          <li>public - For static assets</li>
                          <li>config - Configuration files</li>
                        </ul>
                      </section>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="commands">
                  <Card>
                    <CardHeader>
                      <CardTitle>Command Reference</CardTitle>
                      <CardDescription>Complete reference for all StiffTools commands</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <section>
                        <h3 className="text-xl font-semibold mb-3">Create Command</h3>
                        <p className="mb-3">The create command scaffolds a new project:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>stifftools create [project-name] [options]</code>
                        </pre>
                        
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Options:</h4>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><code>--with-db</code> - Includes database configuration</li>
                            <li><code>--features=auth,api,tests</code> - Adds specific features</li>
                            <li><code>--template=basic|advanced</code> - Selects project template</li>
                          </ul>
                        </div>
                      </section>
                      
                      <Separator className="my-6" />
                      
                      <section>
                        <h3 className="text-xl font-semibold mb-3">Generate Command</h3>
                        <p className="mb-3">Generate specific components for an existing project:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>stifftools generate [type] [name] [options]</code>
                        </pre>
                        
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Types:</h4>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><code>controller</code> - Creates a new controller</li>
                            <li><code>model</code> - Creates a new data model</li>
                            <li><code>view</code> - Creates a new view template</li>
                          </ul>
                        </div>
                      </section>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="examples">
                  <Card>
                    <CardHeader>
                      <CardTitle>Examples</CardTitle>
                      <CardDescription>Sample projects and use cases</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <section>
                        <h3 className="text-xl font-semibold mb-3">Basic Web App</h3>
                        <p className="mb-3">Create a basic web application with authentication:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>stifftools create my-web-app --features=auth</code>
                        </pre>
                      </section>
                      
                      <section>
                        <h3 className="text-xl font-semibold mb-3">REST API</h3>
                        <p className="mb-3">Create a REST API with database integration:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>stifftools create my-api --features=api --with-db</code>
                        </pre>
                      </section>
                      
                      <section className="bg-muted p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-3">Example Project Structure</h3>
                        <pre className="overflow-x-auto">
                          <code>{`my-project/
├── controllers/
│   ├── homeController.js
│   └── userController.js
├── models/
│   └── userModel.js
├── views/
│   ├── home/
│   │   └── index.html
│   └── users/
│       ├── login.html
│       └── profile.html
├── public/
│   ├── css/
│   ├── js/
│   └── img/
├── config/
│   └── database.js
└── index.js`}</code>
                        </pre>
                      </section>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="api">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Reference</CardTitle>
                      <CardDescription>Documentation for the StiffTools API</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <section>
                        <h3 className="text-xl font-semibold mb-3">Programmatic Usage</h3>
                        <p className="mb-3">You can use StiffTools programmatically in your Node.js applications:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>{`const stifftools = require('stifftools');

// Create a new project
stifftools.create({
  name: 'my-project',
  withDatabase: true,
  features: ['auth', 'api']
});`}</code>
                        </pre>
                      </section>
                      
                      <section>
                        <h3 className="text-xl font-semibold mb-3">Configuration API</h3>
                        <p className="mb-3">You can customize StiffTools with a configuration file:</p>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code>{`// stifftools.config.js
module.exports = {
  templates: {
    controller: './templates/custom-controller.js',
    model: './templates/custom-model.js'
  },
  defaultFeatures: ['auth', 'api'],
  databaseAdapter: 'mongodb'
};`}</code>
                        </pre>
                      </section>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="mt-12 text-center">
                <h3 className="text-xl font-medium mb-4">Need more help?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" asChild>
                    <a href="https://github.com/stifftools/docs/issues" target="_blank" rel="noopener noreferrer">
                      Report an Issue
                    </a>
                  </Button>
                  <Button asChild>
                    <a href="/#get-started">Try StiffTools Now</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Documentation;

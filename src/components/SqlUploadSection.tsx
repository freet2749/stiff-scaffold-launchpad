
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Upload, FileCode2, CheckCircle } from "lucide-react";
import { parseSqlFile } from "@/lib/sqlParser";

interface SqlUploadSectionProps {
  onSqlParsed: (dbStructure: any) => void;
}

export function SqlUploadSection({ onSqlParsed }: SqlUploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [parsed, setParsed] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setParsed(false);
    }
  };
  
  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a SQL file to upload",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    try {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          const dbStructure = parseSqlFile(content);
          onSqlParsed(dbStructure);
          setParsed(true);
          toast({
            title: "SQL file parsed successfully",
            description: `We've analyzed your database structure with ${dbStructure.tables.length} tables.`,
          });
        } catch (error) {
          console.error("Error parsing SQL:", error);
          toast({
            title: "Error parsing SQL file",
            description: "The SQL file format could not be processed. Please ensure it's valid SQL.",
            variant: "destructive",
          });
        } finally {
          setUploading(false);
        }
      };
      
      reader.onerror = () => {
        toast({
          title: "Error reading file",
          description: "There was an error reading the file. Please try again.",
          variant: "destructive",
        });
        setUploading(false);
      };
      
      reader.readAsText(file);
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "An error occurred",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive",
      });
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border border-dashed border-input rounded-lg p-6 text-center bg-muted/20">
        <div className="flex flex-col items-center gap-2">
          {parsed ? (
            <CheckCircle className="h-10 w-10 text-green-500" />
          ) : (
            <FileCode2 className="h-10 w-10 text-muted-foreground" />
          )}
          
          <h3 className="font-medium text-lg">
            {parsed ? "SQL File Parsed" : "Upload Database SQL File"}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            {parsed 
              ? "We've analyzed your database structure to help tailor your project." 
              : "Upload your SQL schema to help us understand your database structure."
            }
          </p>
          
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <div className="flex-1">
              <Input
                id="sql-file"
                type="file"
                accept=".sql"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
            <Button 
              onClick={handleUpload} 
              disabled={!file || uploading || parsed}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {uploading ? "Processing..." : "Parse SQL"}
            </Button>
          </div>
        </div>
      </div>
      
      {parsed && (
        <p className="text-sm text-muted-foreground">
          We'll tailor your scaffold command based on your database structure.
        </p>
      )}
    </div>
  );
}


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Upload, File, X, FileText, Image } from "lucide-react";

interface FileUploadSectionProps {
  onFilesUploaded: (files: File[]) => void;
}

export function FileUploadSection({ onFilesUploaded }: FileUploadSectionProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const acceptedTypes = {
    'application/pdf': '.pdf',
    'image/jpeg': '.jpg,.jpeg',
    'image/png': '.png',
    'image/gif': '.gif',
    'text/plain': '.txt'
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => 
      Object.keys(acceptedTypes).includes(file.type)
    );
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Some files were rejected",
        description: "Only PDF, images (JPG, PNG, GIF), and text files are allowed.",
        variant: "destructive",
      });
    }

    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesUploaded(updatedFiles);

    if (validFiles.length > 0) {
      toast({
        title: "Files uploaded",
        description: `${validFiles.length} file(s) added to your project description.`,
      });
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesUploaded(updatedFiles);
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="h-4 w-4" />;
    } else if (file.type === 'application/pdf') {
      return <FileText className="h-4 w-4" />;
    } else {
      return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? "border-primary bg-primary/5" 
            : "border-input hover:border-primary/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
        <h3 className="font-medium mb-2">Upload Project Files</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop or click to upload PDF, images, or text files
        </p>
        <input
          type="file"
          multiple
          accept={Object.values(acceptedTypes).join(',')}
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
        />
        <Button variant="outline" asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            Choose Files
          </label>
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Uploaded Files:</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
              >
                <div className="flex items-center gap-2">
                  {getFileIcon(file)}
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

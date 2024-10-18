"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CsvDragDrop() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
      setError(null);
    } else {
      setError("Please upload a CSV file");
      setFile(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
  });

  const handleUpload = () => {
    if (file) {
      // Here you would typically send the file to your server or process it
      console.log("Uploading file:", file.name);
      // Add your file upload logic here
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto ">
      <CardHeader>
        <CardTitle>CSV File Upload</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-primary bg-primary/10"
              : "border-muted hover:border-primary"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag & drop a CSV file here, or click to select one
          </p>
        </div>

        {file && (
          <Alert variant="default" className="mt-4">
            <FileText className="h-4 w-4" />
            <AlertTitle>File selected</AlertTitle>
            <AlertDescription>{file.name}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} className="w-full" disabled={!file}>
          Upload CSV
        </Button>
      </CardFooter>
    </Card>
  );
}

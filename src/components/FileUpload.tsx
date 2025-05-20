import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, X, File as FileIcon } from 'lucide-react';
import { Document } from '../types';

interface FileUploadProps {
  onFilesUploaded: (files: Document[]) => void;
}

export default function FileUpload({ onFilesUploaded }: FileUploadProps) {
  const [documents, setDocuments] = useState<Document[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newDocuments: Document[] = acceptedFiles.map(file => ({
      id: `${file.name}-${Date.now()}`,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
      size: file.size,
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': [],
    },
    multiple: true,
  });

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleCompare = () => {
    if (documents.length >= 2) {
      onFilesUploaded(documents);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed p-8 rounded-lg text-center mb-6 transition-colors duration-200 cursor-pointer
          ${isDragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/30' 
            : 'border-gray-300 dark:border-dark-400 hover:border-primary-400 dark:hover:border-primary-600'
          }
          bg-light-100 dark:bg-dark-200`}
      >
        <input {...getInputProps()} />
        <FileUp className="mx-auto h-12 w-12 text-primary-500 mb-2" />
        <p className="text-gray-700 dark:text-gray-200 mb-1">
          {isDragActive
            ? "Drop the files here..."
            : "Drag & drop documents here, or click to select files"
          }
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Supported formats: PDF, JPG, PNG
        </p>
      </div>

      {documents.length > 0 && (
        <div className="bg-light-100 dark:bg-dark-200 rounded-lg p-4 shadow-md transition-colors duration-300">
          <h3 className="font-medium text-gray-800 dark:text-white mb-4">
            Uploaded Documents ({documents.length})
          </h3>
          
          <div className="space-y-3 mb-6">
            {documents.map(doc => (
              <div 
                key={doc.id} 
                className="flex items-center justify-between p-3 bg-light-200 dark:bg-dark-300 rounded-md animate-slide-up"
              >
                <div className="flex items-center space-x-3">
                  <FileIcon className="h-5 w-5 text-primary-600 dark:text-primary-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{doc.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(doc.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => removeDocument(doc.id)}
                  className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-dark-400 transition-colors"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleCompare}
            disabled={documents.length < 2}
            className={`w-full py-3 rounded-md font-medium transition-colors duration-200
              ${documents.length < 2
                ? 'bg-gray-300 text-gray-500 dark:bg-dark-400 dark:text-gray-400 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600'
              }`}
          >
            {documents.length < 2
              ? "Upload at least 2 documents to compare"
              : `Compare ${documents.length} documents`
            }
          </button>
        </div>
      )}
    </div>
  );
}
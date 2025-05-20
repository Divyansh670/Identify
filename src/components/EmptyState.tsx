import { FileText, Upload } from 'lucide-react';

interface EmptyStateProps {
  onCreateNew: () => void;
}

export default function EmptyState({ onCreateNew }: EmptyStateProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center p-8 animate-fade-in">
      <div className="bg-light-100 dark:bg-dark-200 rounded-lg p-8 shadow-md transition-colors duration-300">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
          <FileText className="h-8 w-8 text-primary-600 dark:text-primary-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome to Identify
        </h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload two or more documents to check for similarities in content and handwriting.
        </p>
        
        <button
          onClick={onCreateNew}
          className="px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 inline-flex items-center transition-colors duration-200"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Documents
        </button>
      </div>
    </div>
  );
}
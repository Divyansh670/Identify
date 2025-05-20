import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ComparisonResults from './components/ComparisonResults';
import EmptyState from './components/EmptyState';
import { Document, ComparisonResult } from './types';
import { compareDocuments } from './utils/compareDocuments';

function App() {
  const [step, setStep] = useState<'upload' | 'results'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const handleFilesUploaded = async (documents: Document[]) => {
    setIsLoading(true);
    try {
      const comparisonResult = await compareDocuments(documents);
      setResult(comparisonResult);
      setStep('results');
    } catch (error) {
      console.error('Error comparing documents:', error);
      // Handle error 
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('upload');
    setShowUpload(true);
  };

  const handleCreateNew = () => {
    setShowUpload(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-300 dark:bg-dark-100 transition-colors duration-300">
        <Header />
        
        <main className="container mx-auto py-8 px-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300">Analyzing documents...</p>
            </div>
          ) : (
            <>
              {step === 'upload' ? (
                showUpload ? (
                  <FileUpload onFilesUploaded={handleFilesUploaded} />
                ) : (
                  <EmptyState onCreateNew={handleCreateNew} />
                )
              ) : (
                result && <ComparisonResults result={result} onBack={handleBack} />
              )}
            </>
          )}
        </main>
        
        <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Identify - Document Comparison Tool</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
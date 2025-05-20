import { ArrowLeft, Download, FileCheck } from 'lucide-react';
import { ComparisonResult } from '../types';

interface ComparisonResultsProps {
  result: ComparisonResult;
  onBack: () => void;
}

export default function ComparisonResults({ result, onBack }: ComparisonResultsProps) {
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getColorClass = (percentage: number) => {
    if (percentage >= 80) return 'text-red-600 dark:text-red-400';
    if (percentage >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-primary-600 dark:text-primary-500 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Upload
      </button>

      <div className="bg-light-100 dark:bg-dark-200 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
        <div className="bg-primary-600 dark:bg-primary-800 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Document Comparison Results</h2>
            <span className="text-sm">{formatDate(result.timestamp)}</span>
          </div>
          <p className="text-primary-100 mt-1">
            Comparison of {result.documents.length} documents
          </p>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-light-200 dark:bg-dark-300 p-5 rounded-lg text-center">
              <h3 className="text-gray-600 dark:text-gray-300 mb-2">Content Similarity</h3>
              <p className={`text-3xl font-bold ${getColorClass(result.contentSimilarity)}`}>
                {formatPercentage(result.contentSimilarity)}
              </p>
            </div>
            
            <div className="bg-light-200 dark:bg-dark-300 p-5 rounded-lg text-center">
              <h3 className="text-gray-600 dark:text-gray-300 mb-2">Handwriting Similarity</h3>
              <p className={`text-3xl font-bold ${getColorClass(result.handwritingSimilarity)}`}>
                {formatPercentage(result.handwritingSimilarity)}
              </p>
            </div>
            
            <div className="bg-light-200 dark:bg-dark-300 p-5 rounded-lg text-center">
              <h3 className="text-gray-600 dark:text-gray-300 mb-2">Overall Match</h3>
              <p className={`text-3xl font-bold ${getColorClass(result.overallSimilarity)}`}>
                {formatPercentage(result.overallSimilarity)}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Detailed Analysis
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-light-200 dark:bg-dark-300 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Matched Phrases</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">
                    {result.details.matchedPhrases}
                  </p>
                </div>
                
                <div className="p-3 bg-light-200 dark:bg-dark-300 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Matched Words</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">
                    {result.details.matchedWords}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-light-200 dark:bg-dark-300 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Style Consistency</p>
                  <p className={`text-lg font-medium ${getColorClass(result.details.styleConsistency || 0)}`}>
                    {formatPercentage(result.details.styleConsistency || 0)}
                  </p>
                </div>
                
                <div className="p-3 bg-light-200 dark:bg-dark-300 rounded-md">
                  <p className="text-sm text-gray-600 dark:text-gray-300">Character Formation</p>
                  <p className={`text-lg font-medium ${getColorClass(result.details.characterFormation || 0)}`}>
                    {formatPercentage(result.details.characterFormation || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Compared Documents
            </h3>
            
            <div className="space-y-3">
              {result.documents.map((doc, index) => (
                <div 
                  key={doc.id} 
                  className="flex items-center justify-between p-3 bg-light-200 dark:bg-dark-300 rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-sm font-medium">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{doc.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(doc.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <FileCheck className="h-5 w-5 text-primary-600 dark:text-primary-500" />
                </div>
              ))}
            </div>
          </div>

          <button 
            className="w-full py-3 rounded-md font-medium bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 flex items-center justify-center transition-colors duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
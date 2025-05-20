import { Document, ComparisonResult } from '../types';

// This is a simulated comparison function for demo purposes
// In a real application, this would be connected to a backend service
// that performs actual document analysis

export function generateRandomComparison(documents: Document[]): ComparisonResult {
  if (documents.length < 2) {
    throw new Error('At least two documents are required for comparison');
  }

  // Generate random similarity scores as a placeholder
  const contentSimilarity = Math.random() * 100;
  const handwritingSimilarity = Math.random() * 100;
  const overallSimilarity = (contentSimilarity + handwritingSimilarity) / 2;

  // Generate randomized details
  const details = {
    matchedPhrases: Math.floor(Math.random() * 50),
    matchedWords: Math.floor(Math.random() * 200),
    styleConsistency: Math.random() * 100,
    characterFormation: Math.random() * 100,
  };

  return {
    id: `comp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    documents,
    contentSimilarity,
    handwritingSimilarity,
    overallSimilarity,
    timestamp: new Date(),
    details,
  };
}

export function compareDocuments(documents: Document[]): Promise<ComparisonResult> {
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(generateRandomComparison(documents));
    }, 2000); // 2 second delay to simulate processing
  });
}
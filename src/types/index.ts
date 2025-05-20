export interface Document {
  id: string;
  file: File;
  preview: string;
  name: string;
  type: string;
  size: number;
}

export interface ComparisonResult {
  id: string;
  documents: Document[];
  contentSimilarity: number;
  handwritingSimilarity: number;
  overallSimilarity: number;
  timestamp: Date;
  details: {
    matchedPhrases?: number;
    matchedWords?: number;
    styleConsistency?: number;
    characterFormation?: number;
  };
}

export type ThemeMode = 'light' | 'dark';
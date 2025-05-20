import { Sun, Moon, FileCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="w-full px-6 py-4 transition-colors duration-300 bg-light-200 dark:bg-dark-100 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <FileCheck className="h-8 w-8 text-primary-600 dark:text-primary-500" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Identify</h1>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-light-300 dark:bg-dark-300 text-gray-800 dark:text-white hover:bg-light-400 dark:hover:bg-dark-400 transition-colors duration-200"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}
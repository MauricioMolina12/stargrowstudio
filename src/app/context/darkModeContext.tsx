'use client';

import { createContext, useContext } from 'react';
import useDarkMode from '@/app/hooks/useDarkMode';

const DarkModeContext = createContext<ReturnType<typeof useDarkMode> | null>(null);

export const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const darkMode = useDarkMode();
  return (
    <DarkModeContext.Provider value={darkMode}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkModeContext must be used within a DarkModeProvider');
  }
  return context;
};

'use client';

import { createContext, useContext } from 'react';
import { useComponentMeeting } from '@/app/hooks/useComponentMeeting';

const MeetingContext = createContext<ReturnType<typeof useComponentMeeting> | null>(null);

export const MeetingProvider = ({ children }: { children: React.ReactNode }) => {
  const meeting = useComponentMeeting();

  return (
    <MeetingContext.Provider value={meeting}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error('useMeeting must be used within a MeetingProvider');
  }
  return context;
};

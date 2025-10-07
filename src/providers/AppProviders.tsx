'use client';

import { DarkModeProvider } from "@/app/context/darkModeContext";
import { MeetingProvider } from "@/app/context/MeetingContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <DarkModeProvider>
            <MeetingProvider>
                {children}
            </MeetingProvider>
        </DarkModeProvider>
    );
}

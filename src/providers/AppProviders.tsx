'use client';

import { MeetingProvider } from "@/app/context/MeetingContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <MeetingProvider>
            {children}
        </MeetingProvider>
    );
}

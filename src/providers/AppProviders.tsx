'use client';

import { DarkModeProvider } from "@/app/context/darkModeContext";
import { MeetingProvider } from "@/app/context/MeetingContext";
import { ToastProvider } from "@/app/components/shared/Toast/ToastProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <DarkModeProvider>
            <MeetingProvider>
                <ToastProvider>
                    {children}
                </ToastProvider>
            </MeetingProvider>
        </DarkModeProvider>
    );
}

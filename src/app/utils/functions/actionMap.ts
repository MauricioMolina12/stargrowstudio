import { scrollVertical } from "./banner";

export const actionMap: Record<string, () => void> = {
    StartHome: () => scrollVertical(window.innerHeight - 100),
};
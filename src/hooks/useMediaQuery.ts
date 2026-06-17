import { useSyncExternalStore } from "react";

export const useMediaQuery = (query: string) => {
  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia(query);

    mediaQuery.addEventListener("change", callback);

    return () => mediaQuery.removeEventListener("change", callback);
  };

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
};

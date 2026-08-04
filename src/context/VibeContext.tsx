"use client";

import { createContext, useContext, useState } from "react";

type VibeContextType = {
  vibe: string;
  setVibe: (vibe: string) => void;
};

const VibeContext = createContext<VibeContextType>({
  vibe: "",
  setVibe: () => {},
});

export function VibeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [vibe, setVibe] = useState("");

  return (
    <VibeContext.Provider value={{ vibe, setVibe }}>
      {children}
    </VibeContext.Provider>
  );
}

export function useVibe() {
  return useContext(VibeContext);
}

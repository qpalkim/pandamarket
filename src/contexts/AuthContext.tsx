import { createContext } from "react";
import type { BaseUser } from "@/types/user";

interface AuthContextValue {
  isLoggedIn: boolean;
  user: BaseUser | null;
  setUser: React.Dispatch<React.SetStateAction<BaseUser | null>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

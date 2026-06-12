import { createContext } from "react";
import type { UserResponse } from "@/types/user";

interface AuthContextValue {
  isLoggedIn: boolean;
  user: UserResponse | null;
  setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

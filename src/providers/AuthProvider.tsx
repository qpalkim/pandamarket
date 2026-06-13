import { useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import type { BaseUser } from "@/types/user";
import { getMyProfile } from "@/api/user";
import { ACCESS_TOKEN_KEY } from "@/constants/storage";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<BaseUser | null>(null);

  const isLoggedIn = !!user;

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!accessToken) return;

    const fetchUser = async () => {
      try {
        const data = await getMyProfile();
        setUser(data);
      } catch {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

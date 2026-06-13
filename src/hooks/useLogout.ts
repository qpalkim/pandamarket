import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "@/constants/storage";
import { useAuth } from "./useAuth";

export default function useLogout() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setUser(null);
    navigate("/login");
  };
}

import { useAuth } from "@/hooks/useAuth";
import GuestHeader from "./GuestHeader";
import AuthHeader from "./AuthHeader";

export default function Header() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <AuthHeader /> : <GuestHeader />;
}

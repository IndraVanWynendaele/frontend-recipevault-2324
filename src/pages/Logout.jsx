import { useEffect } from "react";
import { useAuth } from "../contexts/Auth.context";
import { Center } from "@chakra-ui/react";

export default function Logout() {
  const { isAuthed, logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  if (isAuthed) {
    return <Center>Logging out...</Center>;
  }

  return <Center>Successfully logged out!</Center>;
}

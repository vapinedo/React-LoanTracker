import appFirebase from "@firebaseConfig";
import { getAuth, signOut } from "firebase/auth";

const AUTH_DATA = getAuth(appFirebase);

export default function useUsers() {
  const logout = async () => {
    await signOut(AUTH_DATA);
  }

  return { logout };
}
import { useState } from "react";
import appFirebase from "./firebaseConfig";
import Navbar from "@shared/components/Navbar";
import HomePage from "./feature/home/pages/HomePage";
import LoginPage from "./feature/auth/pages/LoginPage";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(appFirebase);

export default function App() {

  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (firebaseUser) => {
    firebaseUser 
      ? setUser(firebaseUser)
      : setUser(null);
  })

  return (
    <section>
      <Navbar />
      {user ? <HomePage userEmail={user.email} /> : <LoginPage />}
    </section>
  );
}

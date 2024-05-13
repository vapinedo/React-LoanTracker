import { useState } from "react";
import firebaseApp from "@firebaseConfig";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";

const AUTH_DATA = getAuth(firebaseApp);

export default function useAuth() {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState<User | null>(null);

    onAuthStateChanged(AUTH_DATA, (firebaseUser) => {
        firebaseUser
            ? setIsUserLoggedIn(firebaseUser)
            : setIsUserLoggedIn(null);
    })

    const signIn = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(AUTH_DATA, email, password);
            const firebaseIdToken = await userCredential.user.getIdToken();
            verifyToken(firebaseIdToken);
        } catch (error) {
            console.log("Error al hacer login", error);
        }
    };

    const signUp = async (email: string, passsword: string) => {
        try {
            const user = await createUserWithEmailAndPassword(AUTH_DATA, email, passsword);
            console.log('User signed up successfully:', user.user.uid);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const logout = async () => {
        return await signOut(AUTH_DATA);
    }

    const verifyToken = async (token: string) => {
        const baseUrl = "http://localhost:8000/verify-token/";
        const url = new URL(baseUrl);
        url.searchParams.append('token', token);

        const payload = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            }
            // No need to include body for a POST request with query parameters
          };

          try {
            const response = await fetch(url.href, payload);
        
            if (!response.ok) {
              const errorText = await response.text(); // Get error response body
              throw new Error(`Network response was not ok: ${errorText}`);
            }
        
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error("Fetch error:", error);
          }
    };

    return { isUserLoggedIn, signUp, signIn, logout, verifyToken }
}
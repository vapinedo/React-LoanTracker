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
            await signInWithEmailAndPassword(AUTH_DATA, email, password);
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

    return { isUserLoggedIn, signUp, signIn, logout }
}
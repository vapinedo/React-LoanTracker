import { useState } from "react";
import firebaseApp from "@firebaseConfig";
import { doc, setDoc, getFirestore } from "firebase/firestore"; 
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";

const COLLECTION = "users";
const db = getFirestore(firebaseApp);
const AUTH_DATA = getAuth(firebaseApp);

const newDocument = {
    name: "Pedro Jimenez",
    state: "CA",
    country: "Colombia"
};

export default function useUsers() {

    const [user, setUser] = useState<User | null>(null);

    const create = async () => {
        try {
            const response = await setDoc(doc(db, COLLECTION, "2"), newDocument);
            console.log({response});
        } catch (error) {
            console.log("Error al hacer login", error);
        }
    };

    // const create = async (email: string, passsword: string) => {
    //     try {
    //         const user = await createUserWithEmailAndPassword(AUTH_DATA, email, passsword);
    //         console.log({user});
    //     } catch (error) {
    //         console.log("Error al hacer login", error);
    //     }
    // };

    const isUserLoggedIn = () => {
        onAuthStateChanged(AUTH_DATA, (firebaseUser) => {
            firebaseUser 
              ? setUser(firebaseUser)
              : setUser(null);
          })
        return user;
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(AUTH_DATA, email, password);
        } catch (error) {
            console.log("Error al hacer login", error);
        }
    };

    const logout = async () => {
        return await signOut(AUTH_DATA);
    }

    return { create, login, logout, isUserLoggedIn };
}
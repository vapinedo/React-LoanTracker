import appFirebase from "@firebaseConfig";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const AUTH_DATA = getAuth(appFirebase);

export default function useUsers() {

    const create = async (email: string, passsword: string) => {
        try {
            const user = await createUserWithEmailAndPassword(AUTH_DATA, email, passsword);
            console.log({user});
        } catch (error) {
            console.log("Error al hacer login", error);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(AUTH_DATA, email, password);
        } catch (error) {
            console.log("Error al hacer login", error);
        }
    };

    const logout = async () => {
        await signOut(AUTH_DATA);
    }

    return { create, login, logout };
}
import firebaseApp from "@firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";

const COLLECTION = "users";
const db = getFirestore(firebaseApp);
const AUTH_DATA = getAuth(firebaseApp);

const newDocument = {
    name: "Pedro Jimenez",
    state: "CA",
    country: "Colombia"
};

export default function useUsers() {

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
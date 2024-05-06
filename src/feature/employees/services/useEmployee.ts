import firebaseApp from "@firebaseConfig";
import { v4 as createUuid } from 'uuid';
import { doc, setDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";
import { Employee } from "../models/Employee";

const COLLECTION = "EMPLOYEES";
const db = getFirestore(firebaseApp);

export default function useEmployee() {

    const createEmployee = async (employee: Employee) => {
        try {
            const UUID = createUuid();
            employee.uuid = UUID;
            const response = await setDoc(doc(db, COLLECTION, UUID), employee);
            console.log({response});
        } catch (error) {
            console.log(error);
        }
    };

    return { createEmployee };
}
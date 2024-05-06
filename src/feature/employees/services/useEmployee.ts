import { v4 as createUuid } from 'uuid';
import firebaseApp from "@firebaseConfig";
import { Employee } from "../models/Employee";
import { doc, getDocs, setDoc } from "firebase/firestore"; 
import { collection, getFirestore } from "firebase/firestore";

const COLLECTION = "EMPLOYEES";
const db = getFirestore(firebaseApp);

export default function useEmployee() {

    const getAllEmployees = async () => {
        const employees: any[] = [];
        try {
            const querySnapshot = await getDocs(collection(db, COLLECTION));
            querySnapshot.forEach((doc) => {
                employees.push(doc.data());
            });
        } catch (error) {
            console.log(error);
        }
        return employees;
    };

    const createEmployee = async (employee: Employee) => {
        try {
            const UUID = createUuid();
            employee.uuid = UUID;
            await setDoc(doc(db, COLLECTION, UUID), employee);
        } catch (error) {
            console.log(error);
        }
    };

    return { getAllEmployees, createEmployee };
}
import { v4 as createUuid } from 'uuid';
import firebaseApp from "@firebaseConfig";
import { Employee } from "../models/Employee";
import { doc, getDocs, getDoc, setDoc, collection, getFirestore, runTransaction } from "firebase/firestore";
import toast from 'react-hot-toast';

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

    const getEmployeeById = async (documentId: string) => {
        let employee = null;
        try {
            const docRef = doc(db, COLLECTION, documentId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                employee = docSnap.data();
            }
        } catch (error) {
            console.log(error);
        }
        return employee;
    };

    const createEmployee = async (document: Employee) => {
        try {
            const documentId = createUuid();
            document.id = documentId;
            await setDoc(doc(db, COLLECTION, documentId), document);
        } catch (error) {
            console.log(error);
        }
    };

    const updateEmployee = async (document: any) => {
        const docRef = doc(db, COLLECTION, document.id);
        try {
            await runTransaction(db, async (transaction) => {
                const sfDoc = await transaction.get(docRef);
                if (!sfDoc.exists()) {
                    throw "No existe el empleado que quiere editar";
                }
                transaction.update(docRef, document);
                toast.success("Empleado actualizado exitosamente!");
            });
        } catch (error) {
            console.error(error);
        }
    };

    return {
        getAllEmployees,
        getEmployeeById,
        createEmployee,
        updateEmployee
    };
}
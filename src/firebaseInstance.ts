import { getFirestore } from 'firebase/firestore';
import firebaseApp from '@firebaseConfig'; // Asegúrate de importar tu configuración de Firebase

const db = getFirestore(firebaseApp);

export default db;
import { Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../../../../firebaseConfig";

const AUTH = getAuth(appFirebase);

export default function HomePage(props: any) {
    return (
        <div>
            <p>Home Page {props.userEmail}</p>
            <Button
                type="button"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => signOut(AUTH)}
            >
                Cerrar Sesión
            </Button>
        </div>

    )
}
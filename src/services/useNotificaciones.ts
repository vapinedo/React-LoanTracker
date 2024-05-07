import Swal from "sweetalert2";

export default function useNotificaciones() {

    const dialogConfirm = (text: string) => {
        return Swal.fire({
            title: "Estás seguro?",
            text: text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar"
          })
    }

    return { dialogConfirm };
}
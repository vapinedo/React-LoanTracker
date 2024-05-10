export default function useDatetime() {

    const monthNames = [
        "Enero", "Febrero", "Marzo",
        "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre",
        "Octubre", "Noviembre", "Diciembre"
    ];

    const getHumanDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const formattedDate = `${monthNames[monthIndex]} ${String(day).padStart(2, '0')} de ${year}`;
        return formattedDate;
    };

    return {
        getHumanDate,
    };
}
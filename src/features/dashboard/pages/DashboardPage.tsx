import { useEffect } from "react";
import useDashboardStore from "@stores/useDashboardStore";
import IconSVG from "@components/IconSVG";
import MiniCard from "@features/dashboard/components/MiniCard";

export default function DashboardPage() {
    const { totalClientes, totalEmpleados, totalPrestamos, loading, error, fetchTotals } = useDashboardStore();

    useEffect(() => {
        fetchTotals();
    }, []);

    return (
        <section>
            <div className="row">
                <div className="col-md-4">
                    <MiniCard
                        data={loading ? '...' : error ? 'Error' : totalClientes}
                        title="Clientes"
                        icon={<IconSVG width="32" height="32" />}
                    />
                </div>

                <div className="col-md-4">
                    <MiniCard
                        data={loading ? '...' : error ? 'Error' : totalEmpleados}
                        title="Empleados"
                        icon={<IconSVG width="32" height="32" />}
                    />
                </div>

                <div className="col-md-4">
                    <MiniCard
                        data={loading ? '...' : error ? 'Error' : totalPrestamos}
                        title="Prestamos"
                        icon={<IconSVG width="32" height="32" />}
                    />
                </div>
            </div>
        </section>
    );
}

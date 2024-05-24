import IconSVG from "@components/IconSVG";
import MiniCard from "@features/dashboard/components/MiniCard";

export default function DashboardPage() {
    return (
        <section>
            <div className="row">
                <div className="col-md-4">
                    <MiniCard
                        data="200"
                        title="Clientes"
                        icon={<IconSVG width="32" height="32" />}
                    />
                </div>

                <div className="col-md-4">
                    <MiniCard
                        data="12"
                        title="Empleados"
                        icon={<IconSVG width="32" height="32" />}
                    />
                </div>

                <div className="col-md-4">
                    <MiniCard
                        data="270"
                        title="Prestamos"
                        icon={<IconSVG width="32" height="32" />}
                    />
                </div>
            </div>
        </section>
    )
}
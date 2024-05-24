import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Enero', ventas: 4000 },
    { name: 'Febrero', ventas: 3000 },
    { name: 'Marzo', ventas: 5000 },
    // Agrega más datos según sea necesario
];

export default function Chart() {
    return (
        <LineChart width={400} height={300} data={data}>
            <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
        </LineChart>
    )
}
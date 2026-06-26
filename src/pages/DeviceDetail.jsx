import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import devices from "../data/devices";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function DeviceDetail() {
    const { id } = useParams();

    const device = devices.find(
        (d) => d.id === id
    );
    const [alerts, setAlerts] = useState([
        {
            id: 1,
            message: "High Temperature Alert",
            acknowledged: false,
        },
        {
            id: 2,
            message: "Connection Lost",
            acknowledged: false,
        },
        {
            id: 3,
            message: "Battery Low",
            acknowledged: false,
        },
    ]);
    const acknowledgeAlert = (id) => {
        setAlerts((prevAlerts) =>
            prevAlerts.map((alert) =>
                alert.id === id
                    ? { ...alert, acknowledged: true }
                    : alert
            )
        );
    };

    if (!device) {
        return <h2>Device Not Found</h2>;
    }

    const chartData = [
        { time: "10:00", value: 20 },
        { time: "11:00", value: 25 },
        { time: "12:00", value: 22 },
        { time: "13:00", value: 30 },
        { time: "14:00", value: 28 },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <Link to="/">⬅ Back</Link>

            <h1>{device.name}</h1>

            <h3>Device Information</h3>

            <p><strong>ID:</strong> {device.id}</p>
            <p><strong>Zone:</strong> {device.zone}</p>
            <p><strong>Type:</strong> {device.type}</p>
            <p><strong>Status:</strong> {device.status}</p>

            <h3>Sensor Readings</h3>

            <LineChart
                width={600}
                height={300}
                data={chartData}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                    type="monotone"
                    dataKey="value"
                />
            </LineChart>

            <h3>Recent Alerts</h3>

            <div>
                {alerts.map((alert) => (
                    <div
                        key={alert.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        <p>{alert.message}</p>

                        {alert.acknowledged ? (
                            <span style={{ color: "green", fontWeight: "bold" }}>
                                ✓ Acknowledged
                            </span>
                        ) : (
                            <button
                                onClick={() => acknowledgeAlert(alert.id)}
                            >
                                Acknowledge
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>

    );
}

export default DeviceDetail;
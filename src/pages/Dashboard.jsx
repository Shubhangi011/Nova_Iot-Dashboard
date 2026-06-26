
import { useState, useEffect } from "react";
import devicesData from "../data/devices";
import StatusBadge from "../components/StatusBadge";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const onlineCount = devicesData.filter(
    (d) => d.status === "Online"
).length;

const warningCount = devicesData.filter(
    (d) => d.status === "Warning"
).length;

const criticalCount = devicesData.filter(
    (d) => d.status === "Critical"
).length;

const offlineCount = devicesData.filter(
    (d) => d.status === "Offline"
).length;

function Dashboard() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [devices, setDevices] = useState(devicesData);

    const filteredDevices = devices.filter((device) => {
        const matchesSearch =
            device.name.toLowerCase().includes(search.toLowerCase()) ||
            device.id.toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "All" ||
            device.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setDevices((prevDevices) => {
                const updated = [...prevDevices];

                const randomIndex = Math.floor(
                    Math.random() * updated.length
                );

                const statuses = [
                    "Online",
                    "Warning",
                    "Critical",
                    "Offline",
                ];

                const newStatus =
                    statuses[
                    Math.floor(Math.random() * statuses.length)
                    ];

                updated[randomIndex] = {
                    ...updated[randomIndex],
                    status: newStatus,
                };

                if (newStatus === "Critical") {
                    toast.error(
                        `⚠ ${updated[randomIndex].id} became Critical`
                    );
                }

                return updated;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Nova IoT Fleet Health Dashboard</h1>

            <input
                type="text"
                placeholder="Search Device..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: "10px",
                    width: "300px",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            />
            <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                    padding: "10px",
                    marginLeft: "10px",
                }}
            >
                <option value="All">All Status</option>
                <option value="Online">Online</option>
                <option value="Warning">Warning</option>
                <option value="Critical">Critical</option>
                <option value="Offline">Offline</option>
            </select>
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                }}
            >
                <div className="card">
                    <h3>🟢 Online</h3>
                    <h2>{onlineCount}</h2>
                </div>

                <div className="card">
                    <h3>🟡 Warning</h3>
                    <h2>{warningCount}</h2>
                </div>

                <div className="card">
                    <h3>🔴 Critical</h3>
                    <h2>{criticalCount}</h2>
                </div>

                <div className="card">
                    <h3>⚫ Offline</h3>
                    <h2>{offlineCount}</h2>
                </div>
            </div>

            <table
                border="1"
                cellPadding="10"
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Zone</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredDevices.slice(0, 100).map((device) => (
                        <tr key={device.id}>
                            <td>
                                <Link to={`/device/${device.id}`}>
                                    {device.id}
                                </Link>
                            </td>
                            <td>{device.name}</td>
                            <td>{device.zone}</td>
                            <td>{device.type}</td>
                            <td>
                                <StatusBadge status={device.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
}

export default Dashboard;
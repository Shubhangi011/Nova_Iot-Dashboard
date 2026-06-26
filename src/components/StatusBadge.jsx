// src/components/StatusBadge.jsx

function StatusBadge({ status }) {
  const colors = {
    Online: "#16a34a",
    Warning: "#eab308",
    Critical: "#dc2626",
    Offline: "#6b7280",
  };

  return (
    <span
      style={{
        backgroundColor: colors[status],
        padding: "6px 12px",
        borderRadius: "20px",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
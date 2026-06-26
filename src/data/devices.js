const statuses = ["Online", "Warning", "Critical", "Offline"];
const zones = ["Warehouse A", "Warehouse B", "Cold Storage", "Production"];
const types = ["Temperature", "Humidity", "Pressure", "Power"];

const devices = Array.from({ length: 1000 }, (_, index) => ({
  id: `DEV${String(index + 1).padStart(4, "0")}`,
  name: `Sensor ${index + 1}`,
  zone: zones[Math.floor(Math.random() * zones.length)],
  type: types[Math.floor(Math.random() * types.length)],
  status: statuses[Math.floor(Math.random() * statuses.length)],
  lastUpdated: new Date().toLocaleString(),
}));

export default devices;
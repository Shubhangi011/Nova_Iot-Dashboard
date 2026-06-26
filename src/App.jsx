import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DeviceDetail from "./pages/DeviceDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/device/:id" element={<DeviceDetail />} />
    </Routes>
  );
}

export default App;
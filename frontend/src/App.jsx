import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import SuppliersPage from './pages/SuppliersPage';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import ReportsPage from './pages/ReportsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/clientes" element={<ClientsPage />} />
      <Route path="/proveedores" element={<SuppliersPage />} />
      <Route path="/inventarios" element={<InventoryPage />} />
      <Route path="/ventas" element={<SalesPage />} />
      <Route path="/reportes" element={<ReportsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

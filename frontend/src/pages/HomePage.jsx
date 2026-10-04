import Header from '../components/Header';
import ModuleCard from '../components/ModuleCard';
import { Users, Truck, Boxes, BadgeDollarSign, ChartNoAxesCombined, DatabaseZap, ShieldCheck, Layers3 } from 'lucide-react';

const modules = [
  { title: 'Módulo de clientes', description: 'Filtros acumulativos, tabla paginada y detalle completo del cliente.', icon: Users, to: '/clientes' },
  { title: 'Módulo de proveedores', description: 'Consulta de proveedores, categorías, entrega y datos financieros.', icon: Truck, to: '/proveedores' },
  { title: 'Módulo de inventarios', description: 'Productos, grupos, existencias, precios, proveedor y ubicación.', icon: Boxes, to: '/inventarios' },
  { title: 'Módulo de ventas', description: 'Facturas, rangos de fecha y monto, cliente y detalle de líneas.', icon: BadgeDollarSign, to: '/ventas' },
  { title: 'Reportes y datos estadísticos', description: 'Diez consultas analíticas preparadas para Stored Procedures.', icon: ChartNoAxesCombined, to: '/reportes' },
];

function HomePage() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">PROYECTO BASES DE DATOS II · WIDEWORLDIMPORTERS</p>
          <h1 id="page-title">Panel de módulos</h1>
          <p>Interfaz principal para gestionar consultas, filtros, paginación, detalles y reportes. La capa web se prepara para enviar parámetros y presentar la respuesta de SQL Server sin trasladar la lógica de negocio al frontend.</p>
        </section>

        <section className="module-grid" aria-label="Módulos del sistema">
          {modules.map((module) => <ModuleCard key={module.title} {...module} />)}
          <ModuleCard empty />
        </section>

        <section className="architecture-strip" aria-label="Principios del proyecto">
          <div><DatabaseZap size={22}/><strong>Stored Procedures</strong><span>Búsqueda y transformación en SQL Server.</span></div>
          <div><ShieldCheck size={22}/><strong>Sinónimos</strong><span>Acceso desacoplado a los objetos de la base.</span></div>
          <div><Layers3 size={22}/><strong>Escalable</strong><span>Frontend, API y scripts separados por responsabilidad.</span></div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;

import { ArrowLeft, Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function ModulePlaceholder({ title }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Link className="back-link" to="/"><ArrowLeft size={18} /> Volver al panel</Link>
        <section className="placeholder-panel">
          <Construction size={34} aria-hidden="true" />
          <p className="eyebrow">MÓDULO PREPARADO</p>
          <h1>{title}</h1>
          <p>
            Esta ruta ya está creada para implementar las consultas, filtros y paginación específicos
            del módulo sin afectar la página principal.
          </p>
        </section>
      </main>
    </div>
  );
}

export default ModulePlaceholder;

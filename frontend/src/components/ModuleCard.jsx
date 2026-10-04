import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function ModuleCard({ title, description, icon: Icon, to, empty = false }) {
  if (empty) {
    return (
      <article className="module-card empty-card" aria-label="Espacio reservado para un futuro módulo">
        <div className="empty-symbol">+</div>
        <h2>Próximo módulo</h2>
        <p>Espacio reservado para ampliar el sistema.</p>
      </article>
    );
  }

  return (
    <Link to={to} className="module-card" aria-label={`Abrir ${title}`}>
      <div className="card-top-row">
        <span className="card-icon" aria-hidden="true"><Icon size={25} /></span>
        <ArrowUpRight size={21} className="open-icon" aria-hidden="true" />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <span className="card-link">Abrir módulo</span>
    </Link>
  );
}

export default ModuleCard;

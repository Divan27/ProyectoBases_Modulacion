import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from './Header';

function PageShell({ eyebrow, title, description, children, actions }) {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content module-main">
        <Link className="back-link" to="/"><ArrowLeft size={18} /> Volver al panel</Link>
        <div className="page-heading-row">
          <section className="module-heading">
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{description}</p>
          </section>
          {actions && <div className="page-actions">{actions}</div>}
        </div>
        {children}
      </main>
    </div>
  );
}

export default PageShell;

import { Database, Home } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  ['Clientes', '/clientes'],
  ['Proveedores', '/proveedores'],
  ['Inventarios', '/inventarios'],
  ['Ventas', '/ventas'],
  ['Reportes', '/reportes'],
];

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Ir al inicio">
          <span className="brand-icon" aria-hidden="true"><Database size={24} /></span>
          <span>
            <strong>Modulación de consultas</strong>
            <small>WideWorldImporters · SQL Server</small>
          </span>
        </Link>

        <div className="team" aria-label="Integrantes del proyecto">
          <span>Integrantes</span>
          <strong>Dilan Zamora Sánchez</strong>
          <strong>Daryll Martínez Rodríguez</strong>
        </div>
      </div>

      <nav className="main-nav" aria-label="Navegación principal">
        <div className="nav-inner">
          <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <Home size={16} /> Inicio
          </NavLink>
          {links.map(([label, to]) => (
            <NavLink key={to} to={to} className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;

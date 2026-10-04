import { RotateCcw, Search } from 'lucide-react';

function FilterPanel({ children, onApply, onReset, resultCount, note }) {
  return (
    <section className="filter-panel" aria-label="Filtros de consulta">
      <div className="filter-heading">
        <div>
          <p className="section-kicker">FILTROS</p>
          <h2>Refinar resultados</h2>
        </div>
        {typeof resultCount === 'number' && (
          <span className="result-count">{resultCount} resultado{resultCount === 1 ? '' : 's'}</span>
        )}
      </div>
      <div className="filters-grid">{children}</div>
      {note && <p className="filter-note">{note}</p>}
      <div className="filter-actions">
        <button type="button" className="button secondary" onClick={onReset}>
          <RotateCcw size={17} /> Restaurar filtros
        </button>
        <button type="button" className="button primary" onClick={onApply}>
          <Search size={17} /> Consultar
        </button>
      </div>
    </section>
  );
}

export default FilterPanel;

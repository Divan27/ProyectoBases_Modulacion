import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ page, pageSize, total, onPageChange, onPageSizeChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const visible = [];
  for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i += 1) visible.push(i);

  return (
    <div className="pagination-bar" aria-label="Paginación de resultados">
      <div className="pagination-summary">Mostrando <strong>{start}-{end}</strong> de <strong>{total}</strong></div>
      <div className="pagination-controls">
        <button type="button" className="page-button" disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Página anterior">
          <ChevronLeft size={17} />
        </button>
        {visible[0] > 1 && <span className="pagination-dots">…</span>}
        {visible.map((number) => (
          <button key={number} type="button" className={number === page ? 'page-button current' : 'page-button'} onClick={() => onPageChange(number)} aria-current={number === page ? 'page' : undefined}>
            {number}
          </button>
        ))}
        {visible[visible.length - 1] < totalPages && <span className="pagination-dots">…</span>}
        <button type="button" className="page-button" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)} aria-label="Página siguiente">
          <ChevronRight size={17} />
        </button>
      </div>
      <label className="page-size-control">
        Filas
        <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          {[5, 10, 15, 25].map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </label>
    </div>
  );
}

export default Pagination;

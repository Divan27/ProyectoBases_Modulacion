import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import PageShell from './PageShell';
import FilterPanel from './FilterPanel';
import DataTable from './DataTable';
import Pagination from './Pagination';

function ModuleTablePage({ config, data, filterData, renderFilters, renderDetail, tableColumns }) {
  const [filters, setFilters] = useState(config.initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(config.initialFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState('');

  const filtered = useMemo(() => filterData(data, appliedFilters), [data, appliedFilters, filterData]);
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const applyFilters = () => {
    setAppliedFilters(filters);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters(config.initialFilters);
    setAppliedFilters(config.initialFilters);
    setPage(1);
  };

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  const placeholderAction = () => {
    setNotice('La interfaz está preparada. Esta acción se conectará al procedimiento almacenado correspondiente en la siguiente etapa.');
    window.setTimeout(() => setNotice(''), 3800);
  };

  return (
    <PageShell
      eyebrow={config.eyebrow}
      title={config.title}
      description={config.description}
      actions={<button type="button" className="button dark" onClick={placeholderAction}><Plus size={18} /> Nuevo registro</button>}
    >
      {notice && <div className="notice-banner" role="status">{notice}</div>}
      <FilterPanel onApply={applyFilters} onReset={resetFilters} resultCount={filtered.length} note="Los filtros son acumulativos. En la versión final estos parámetros serán enviados al Stored Procedure del módulo.">
        {renderFilters({ filters, updateFilter })}
      </FilterPanel>

      <section className="results-panel" aria-label="Resultados">
        <div className="results-heading">
          <div>
            <p className="section-kicker">RESULTADOS</p>
            <h2>{config.tableTitle}</h2>
          </div>
          <span className="sort-note">Orden predeterminado: {config.sortLabel}</span>
        </div>
        <DataTable columns={tableColumns} rows={rows} onView={setSelected} caption={config.tableTitle} />
        <Pagination page={page} pageSize={pageSize} total={filtered.length} onPageChange={setPage} onPageSizeChange={(value) => { setPageSize(value); setPage(1); }} />
      </section>

      {renderDetail({ selected, setSelected, placeholderAction })}
    </PageShell>
  );
}

export default ModuleTablePage;

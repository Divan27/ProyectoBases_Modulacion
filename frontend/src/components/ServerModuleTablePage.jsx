import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';

import PageShell from './PageShell';
import FilterPanel from './FilterPanel';
import DataTable from './DataTable';
import Pagination from './Pagination';


function ServerModuleTablePage({
  config,
  loadData,
  loadDetail,
  renderFilters,
  renderDetail,
  tableColumns,
  getRowKey
}) {

  const [filters, setFilters] =
    useState(config.initialFilters);

  const [appliedFilters, setAppliedFilters] =
    useState(config.initialFilters);

  const [page, setPage] =
    useState(1);

  const [pageSize, setPageSize] =
    useState(10);

  const [rows, setRows] =
    useState([]);

  const [total, setTotal] =
    useState(0);

  const [selected, setSelected] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [notice, setNotice] =
    useState('');

  const [error, setError] =
    useState('');


  useEffect(() => {

    async function consultar() {

      try {

        setLoading(true);
        setError('');

        const result =
          await loadData({
            filters: appliedFilters,
            page,
            pageSize
          });

        setRows(result.datos || []);
        setTotal(result.total || 0);

      } catch (err) {

        console.error(err);

        setRows([]);
        setTotal(0);

        setError(
          err.message ||
          'No se pudieron obtener los datos.'
        );

      } finally {

        setLoading(false);

      }
    }

    consultar();

  }, [
    loadData,
    appliedFilters,
    page,
    pageSize
  ]);


  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    setPage(1);
  };


  const resetFilters = () => {
    setFilters({ ...config.initialFilters });
    setAppliedFilters({
      ...config.initialFilters
    });
    setPage(1);
  };


  const updateFilter = (key, value) => {

    setFilters((current) => ({
      ...current,
      [key]: value
    }));

  };


  const viewDetail = async (row) => {

    try {

      setError('');

      if (!loadDetail) {
        setSelected(row);
        return;
      }

      const detail =
        await loadDetail(row);

      setSelected(detail);

    } catch (err) {

      console.error(err);

      setError(
        err.message ||
        'No se pudo obtener el detalle.'
      );

    }
  };


  const placeholderAction = () => {

    setNotice(
      'Esta operación se conectará posteriormente al procedimiento almacenado correspondiente.'
    );

    window.setTimeout(
      () => setNotice(''),
      3500
    );
  };


  return (
    <PageShell
      eyebrow={config.eyebrow}
      title={config.title}
      description={config.description}
      actions={
        <button
          type="button"
          className="button dark"
          onClick={placeholderAction}
        >
          <Plus size={18} />
          Nuevo registro
        </button>
      }
    >

      {notice && (
        <div
          className="notice-banner"
          role="status"
        >
          {notice}
        </div>
      )}

      {error && (
        <div
          className="notice-banner"
          role="alert"
        >
          {error}
        </div>
      )}


      <FilterPanel
        onApply={applyFilters}
        onReset={resetFilters}
        resultCount={total}
        note="Los filtros y la paginación se envían a SQL Server mediante el API."
      >

        {renderFilters({
          filters,
          updateFilter
        })}

      </FilterPanel>


      <section
        className="results-panel"
        aria-label="Resultados"
      >

        <div className="results-heading">

          <div>

            <p className="section-kicker">
              RESULTADOS
            </p>

            <h2>
              {config.tableTitle}
            </h2>

          </div>

          <span className="sort-note">
            Orden predeterminado:
            {' '}
            {config.sortLabel}
          </span>

        </div>


        {loading && (
          <div
            className="notice-banner"
            role="status"
          >
            Consultando información...
          </div>
        )}


        <DataTable
          columns={tableColumns}
          rows={rows}
          onView={viewDetail}
          getRowKey={getRowKey}
          caption={config.tableTitle}
        />


        <Pagination
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          onPageSizeChange={(value) => {
            setPageSize(value);
            setPage(1);
          }}
        />

      </section>


      {renderDetail({
        selected,
        setSelected,
        placeholderAction
      })}

    </PageShell>
  );
}


export default ServerModuleTablePage;
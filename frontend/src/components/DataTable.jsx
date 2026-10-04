import { Eye, Inbox } from 'lucide-react';

function DataTable({ columns, rows, onView, getRowKey = (row) => row.id, caption = 'Resultados de consulta' }) {
  if (!rows.length) {
    return (
      <div className="empty-results" role="status">
        <Inbox size={34} />
        <h3>No se encontraron resultados</h3>
        <p>Modifique o restaure los filtros para realizar una nueva consulta.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
            {onView && <th scope="col" className="action-column">Acción</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((column) => (
                <td key={column.key} data-label={column.label}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
              {onView && (
                <td data-label="Acción" className="action-cell">
                  <button type="button" className="table-action" onClick={() => onView(row)}>
                    <Eye size={16} /> Ver detalles
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;

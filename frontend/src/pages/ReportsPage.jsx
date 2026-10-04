import { useMemo, useState } from 'react';
import { BarChart3, Play, RotateCcw } from 'lucide-react';
import PageShell from '../components/PageShell';
import DataTable from '../components/DataTable';
import Pagination from '../components/Pagination';
import { buildReportRows, reportDefinitions, validYears, customerCategories, supplierCategories, productGroups, suppliers, products } from '../data/mockData';

const columnSets = {
  1:[['proveedor','Proveedor'],['categoria','Categoría'],['minimo','Mínimo'],['maximo','Máximo'],['promedio','Promedio']],
  2:[['cliente','Cliente'],['categoria','Categoría'],['minimo','Mínimo'],['maximo','Máximo'],['promedio','Promedio']],
  3:[['posicion','Posición'],['anio','Año'],['producto','Producto'],['ganancia','Ganancia']],
  4:[['posicion','Posición'],['anio','Año'],['cliente','Cliente'],['facturas','Facturas'],['total','Total facturado']],
  5:[['posicion','Posición'],['anio','Año'],['proveedor','Proveedor'],['ordenes','Órdenes'],['total','Monto total']],
  6:[['categoria','Categoría'],['2014','2014'],['2015','2015'],['2016','2016']],
  7:[['cliente','Cliente'],['mes','Mes'],['primera','Primera factura'],['ultima','Última factura'],['total','Total'],['minima','Mínima'],['maxima','Máxima']],
  8:[['proveedor','Proveedor'],['mes','Mes'],['primera','Primera factura'],['ultima','Última factura'],['total','Total'],['minima','Mínima'],['maxima','Máxima']],
  9:[['producto','Producto'],['categoria','Categoría'],['proveedor','Proveedor'],['dias','Días rotación']],
  10:[['posicion','Posición'],['metodo','Método de envío'],['destino','Destino'],['ventas','Ventas'],['porcentaje','Participación']],
};

const makeColumns = (id) => columnSets[id].map(([key,label])=>({key,label}));
const blankFilters={supplier:'',supplierCategory:'',client:'',clientCategory:'',year:'',yearFrom:'',yearTo:'',month:'',productCategory:'',subcategory:'',product:''};

function ReportFilterField({name,value,onChange}){
  const labelMap={supplier:'Proveedor',supplierCategory:'Categoría de proveedor',client:'Cliente',clientCategory:'Categoría de cliente',year:'Año',yearFrom:'Año desde',yearTo:'Año hasta',month:'Mes',productCategory:'Categoría de producto',subcategory:'Subcategoría',product:'Producto'};
  if(['year','yearFrom','yearTo'].includes(name)) return <label className="field"><span>{labelMap[name]}</span><select value={value} onChange={e=>onChange(name,e.target.value)}><option value="">Todos</option>{validYears.map(y=><option key={y} value={y}>{y}</option>)}</select></label>;
  if(name==='month') return <label className="field"><span>Mes</span><select value={value} onChange={e=>onChange(name,e.target.value)}><option value="">Todos</option>{Array.from({length:12},(_,i)=>i+1).map(m=><option key={m} value={m}>{String(m).padStart(2,'0')}</option>)}</select></label>;
  if(name==='supplierCategory') return <label className="field"><span>{labelMap[name]}</span><select value={value} onChange={e=>onChange(name,e.target.value)}><option value="">Todas</option>{supplierCategories.map(x=><option key={x}>{x}</option>)}</select></label>;
  if(name==='clientCategory') return <label className="field"><span>{labelMap[name]}</span><select value={value} onChange={e=>onChange(name,e.target.value)}><option value="">Todas</option>{customerCategories.map(x=><option key={x}>{x}</option>)}</select></label>;
  if(name==='productCategory') return <label className="field"><span>{labelMap[name]}</span><select value={value} onChange={e=>onChange(name,e.target.value)}><option value="">Todas</option>{productGroups.map(x=><option key={x}>{x}</option>)}</select></label>;
  if(name==='product') return <label className="field"><span>{labelMap[name]}</span><select value={value} onChange={e=>onChange(name,e.target.value)}><option value="">Todos</option>{products.slice(0,15).map(x=><option key={x.id}>{x.name}</option>)}</select></label>;
  if(name==='supplier') return <label className="field"><span>{labelMap[name]}</span><input value={value} onChange={e=>onChange(name,e.target.value)} placeholder="Texto libre" list="supplier-list"/><datalist id="supplier-list">{suppliers.slice(0,10).map(x=><option key={x.id} value={x.name}/>)}</datalist></label>;
  if(name==='subcategory') return <label className="field"><span>{labelMap[name]}</span><select value={value} onChange={e=>onChange(name,e.target.value)}><option value="">Todas</option><option>General</option><option>Premium</option><option>Accesorios</option></select></label>;
  return <label className="field"><span>{labelMap[name]}</span><input value={value} onChange={e=>onChange(name,e.target.value)} placeholder="Texto libre"/></label>;
}

function ReportsPage(){
  const [selectedId,setSelectedId]=useState(1);
  const [filters,setFilters]=useState(blankFilters);
  const [executed,setExecuted]=useState(false);
  const [page,setPage]=useState(1);
  const [pageSize,setPageSize]=useState(10);
  const selected=reportDefinitions.find(r=>r.id===selectedId);
  const rows=useMemo(()=>buildReportRows(selectedId),[selectedId]);
  const pageRows=rows.slice((page-1)*pageSize,page*pageSize);
  const chooseReport=(id)=>{setSelectedId(id);setFilters(blankFilters);setExecuted(false);setPage(1)};
  const update=(key,value)=>setFilters(f=>({...f,[key]:value}));
  const run=()=>{setExecuted(true);setPage(1)};

  return <PageShell eyebrow="ANÁLISIS · REPORTES" title="Reportes y datos estadísticos" description="Catálogo de las diez consultas analíticas requeridas. Seleccione un reporte, complete sus parámetros y ejecute la consulta de demostración.">
    <div className="reports-layout">
      <aside className="report-menu" aria-label="Consultas estadísticas">
        <div className="report-menu-heading"><BarChart3 size={20}/><strong>Consultas disponibles</strong></div>
        {reportDefinitions.map(report=><button key={report.id} className={report.id===selectedId?'report-menu-item active':'report-menu-item'} onClick={()=>chooseReport(report.id)}><span>{String(report.id).padStart(2,'0')}</span><div><strong>{report.title}</strong><small>{report.technique}</small></div></button>)}
      </aside>

      <div className="report-workspace">
        <section className="report-intro">
          <div className="report-number">{String(selected.id).padStart(2,'0')}</div>
          <div><p className="section-kicker">CONSULTA ESTADÍSTICA</p><h2>{selected.title}</h2><p>{selected.summary}</p><span className="technique-chip">{selected.technique}</span></div>
        </section>

        <section className="filter-panel">
          <div className="filter-heading"><div><p className="section-kicker">PARÁMETROS</p><h2>Filtros del reporte</h2></div></div>
          <div className="filters-grid">{selected.filters.map(name=><ReportFilterField key={name} name={name} value={filters[name]} onChange={update}/>)}</div>
          <div className="filter-actions"><button className="button secondary" onClick={()=>{setFilters(blankFilters);setExecuted(false)}}><RotateCcw size={17}/> Restaurar</button><button className="button primary" onClick={run}><Play size={17}/> Ejecutar consulta</button></div>
        </section>

        <section className="results-panel">
          <div className="results-heading"><div><p className="section-kicker">RESULTADOS</p><h2>{executed?'Vista previa del resultado':'Resultado preparado'}</h2></div><span className="sort-note">{executed?`${rows.length} filas de demostración`:'Ejecute la consulta para visualizar datos'}</span></div>
          {executed ? <><DataTable columns={makeColumns(selectedId)} rows={pageRows} caption={selected.title}/><Pagination page={page} pageSize={pageSize} total={rows.length} onPageChange={setPage} onPageSizeChange={v=>{setPageSize(v);setPage(1)}}/></> : <div className="empty-results compact"><BarChart3 size={34}/><h3>Parámetros listos</h3><p>La interfaz enviará estos valores al procedimiento almacenado correspondiente cuando se conecte el API.</p></div>}
        </section>
      </div>
    </div>
  </PageShell>
}

export default ReportsPage;

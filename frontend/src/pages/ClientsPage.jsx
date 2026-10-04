import ModuleTablePage from '../components/ModuleTablePage';
import DetailModal, { DetailGrid } from '../components/DetailModal';
import { clients, customerCategories, deliveryMethods } from '../data/mockData';

const config = {
  eyebrow: 'GESTIÓN · CLIENTES', title: 'Módulo de clientes',
  description: 'Consulte clientes por coincidencia de nombre, categoría y método de entrega. Seleccione un registro para revisar toda su información.',
  tableTitle: 'Clientes encontrados', sortLabel: 'nombre ascendente',
  initialFilters: { name: '', category: '', deliveryMethod: '' },
};

const columns = [
  { key: 'name', label: 'Nombre del cliente' },
  { key: 'category', label: 'Categoría' },
  { key: 'deliveryMethod', label: 'Método de entrega' },
];

const filterData = (data, f) => data.filter((row) =>
  row.name.toLowerCase().includes(f.name.trim().toLowerCase()) &&
  (!f.category || row.category === f.category) &&
  (!f.deliveryMethod || row.deliveryMethod === f.deliveryMethod)
);

function ClientsPage() {
  return <ModuleTablePage config={config} data={clients} filterData={filterData} tableColumns={columns}
    renderFilters={({filters,updateFilter}) => <>
      <label className="field"><span>Nombre del cliente</span><input value={filters.name} onChange={e=>updateFilter('name',e.target.value)} placeholder="Ej. Tailspin" /></label>
      <label className="field"><span>Categoría</span><select value={filters.category} onChange={e=>updateFilter('category',e.target.value)}><option value="">Todas</option>{customerCategories.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="field"><span>Método de entrega</span><select value={filters.deliveryMethod} onChange={e=>updateFilter('deliveryMethod',e.target.value)}><option value="">Todos</option>{deliveryMethods.map(x=><option key={x}>{x}</option>)}</select></label>
    </>}
    renderDetail={({selected,setSelected,placeholderAction}) => <DetailModal open={!!selected} title={selected?.name} subtitle={selected?.category} onClose={()=>setSelected(null)} footer={<><button className="button secondary" onClick={placeholderAction}>Editar</button><button className="button danger" onClick={placeholderAction}>Eliminar</button></>}>
      {selected && <><DetailGrid items={[
        {label:'Nombre del cliente',value:selected.name},{label:'Categoría',value:selected.category},{label:'Grupo de compra',value:selected.buyingGroup},{label:'Contacto primario',value:selected.primaryContact},{label:'Contacto alternativo',value:selected.alternateContact},{label:'Cliente por facturar',value:selected.billToCustomer},{label:'Método de entrega',value:selected.deliveryMethod},{label:'Ciudad de entrega',value:selected.city},{label:'Código postal',value:selected.postalCode},{label:'Teléfono',value:selected.phone},{label:'Fax',value:selected.fax},{label:'Días de gracia',value:selected.paymentDays},{label:'Sitio web',value:selected.website,link:selected.website},{label:'Dirección de entrega',value:selected.deliveryAddress,wide:true},{label:'Dirección postal',value:selected.postalAddress,wide:true},
      ]}/><div className="map-placeholder"><strong>Localización de entrega</strong><span>{selected.coordinates}</span><div className="map-grid">Mapa preparado para integrar proveedor cartográfico</div></div></>}
    </DetailModal>}
  />;
}

export default ClientsPage;

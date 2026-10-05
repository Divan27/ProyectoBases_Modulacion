import {
  useEffect,
  useState
} from 'react';

import ServerModuleTablePage
  from '../components/ServerModuleTablePage';

import DetailModal, {
  DetailGrid
} from '../components/DetailModal';

import {
  getClients,
  getClientDetail,
  getClientCategories,
  getDeliveryMethods
} from '../services/clientApi';


const config = {

  eyebrow: 'GESTIÓN · CLIENTES',

  title: 'Módulo de clientes',

  description:
    'Consulte clientes por coincidencia de nombre, categoría y método de entrega.',

  tableTitle:
    'Clientes encontrados',

  sortLabel:
    'nombre ascendente',

  initialFilters: {
    name: '',
    category: '',
    deliveryMethod: ''
  }

};


const columns = [

  {
    key: 'NombreCliente',
    label: 'Nombre del cliente'
  },

  {
    key: 'Categoria',
    label: 'Categoría'
  },

  {
    key: 'MetodoEntrega',
    label: 'Método de entrega'
  }

];


function ClientsPage() {

  const [categories, setCategories] =
    useState([]);

  const [deliveryMethods, setDeliveryMethods] =
    useState([]);


  useEffect(() => {

    async function cargarFiltros() {

      try {

        const [
          categorias,
          metodos
        ] = await Promise.all([
          getClientCategories(),
          getDeliveryMethods()
        ]);

        setCategories(categorias);
        setDeliveryMethods(metodos);

      } catch (error) {

        console.error(
          'Error cargando filtros:',
          error
        );

      }
    }

    cargarFiltros();

  }, []);


  return (

    <ServerModuleTablePage

      config={config}

      loadData={getClients}

      loadDetail={(row) =>
        getClientDetail(row.CustomerID)
      }

      getRowKey={(row) =>
        row.CustomerID
      }

      tableColumns={columns}


      renderFilters={({
        filters,
        updateFilter
      }) => (

        <>

          <label className="field">

            <span>
              Nombre del cliente
            </span>

            <input
              value={filters.name}
              onChange={(e) =>
                updateFilter(
                  'name',
                  e.target.value
                )
              }
              placeholder="Ej. Tailspin"
            />

          </label>


          <label className="field">

            <span>
              Categoría
            </span>

            <select
              value={filters.category}
              onChange={(e) =>
                updateFilter(
                  'category',
                  e.target.value
                )
              }
            >

              <option value="">
                Todas
              </option>

              {categories.map(
                (category) => (

                  <option
                    key={
                      category.CustomerCategoryID
                    }
                    value={
                      category.CustomerCategoryID
                    }
                  >
                    {
                      category.CustomerCategoryName
                    }
                  </option>

                )
              )}

            </select>

          </label>


          <label className="field">

            <span>
              Método de entrega
            </span>

            <select
              value={
                filters.deliveryMethod
              }
              onChange={(e) =>
                updateFilter(
                  'deliveryMethod',
                  e.target.value
                )
              }
            >

              <option value="">
                Todos
              </option>

              {deliveryMethods.map(
                (method) => (

                  <option
                    key={
                      method.DeliveryMethodID
                    }
                    value={
                      method.DeliveryMethodID
                    }
                  >
                    {
                      method.DeliveryMethodName
                    }
                  </option>

                )
              )}

            </select>

          </label>

        </>

      )}


      renderDetail={({
        selected,
        setSelected,
        placeholderAction
      }) => (

        <DetailModal

          open={!!selected}

          title={
            selected?.NombreCliente
          }

          subtitle={
            selected?.Categoria
          }

          onClose={() =>
            setSelected(null)
          }

          footer={

            <>

              <button
                className="button secondary"
                onClick={
                  placeholderAction
                }
              >
                Editar
              </button>

              <button
                className="button danger"
                onClick={
                  placeholderAction
                }
              >
                Eliminar
              </button>

            </>

          }

        >

          {selected && (

            <>

              <DetailGrid
                items={[

                  {
                    label:
                      'Nombre del cliente',
                    value:
                      selected.NombreCliente
                  },

                  {
                    label:
                      'Categoría',
                    value:
                      selected.Categoria
                  },

                  {
                    label:
                      'Grupo de compra',
                    value:
                      selected.GrupoCompra
                  },

                  {
                    label:
                      'Contacto primario',
                    value:
                      selected.ContactoPrimario
                  },

                  {
                    label:
                      'Contacto alternativo',
                    value:
                      selected.ContactoAlternativo
                  },

                  {
                    label:
                      'Cliente por facturar',
                    value:
                      selected.ClienteFacturacion
                  },

                  {
                    label:
                      'Método de entrega',
                    value:
                      selected.MetodoEntrega
                  },

                  {
                    label:
                      'Ciudad de entrega',
                    value:
                      selected.CiudadEntrega
                  },

                  {
                    label:
                      'Código postal',
                    value:
                      selected.CodigoPostalEntrega
                  },

                  {
                    label:
                      'Teléfono',
                    value:
                      selected.Telefono
                  },

                  {
                    label:
                      'Fax',
                    value:
                      selected.Fax
                  },

                  {
                    label:
                      'Días de gracia',
                    value:
                      selected.DiasPago
                  },

                  {
                    label:
                      'Sitio web',
                    value:
                      selected.SitioWeb,
                    link:
                      selected.SitioWeb
                  },

                  {
                    label:
                      'Dirección de entrega',
                    value:
                      [
                        selected.DireccionEntrega1,
                        selected.DireccionEntrega2
                      ]
                        .filter(Boolean)
                        .join(', '),
                    wide: true
                  },

                  {
                    label:
                      'Dirección postal',
                    value:
                      [
                        selected.DireccionPostal1,
                        selected.DireccionPostal2
                      ]
                        .filter(Boolean)
                        .join(', '),
                    wide: true
                  }

                ]}
              />


              <div className="map-placeholder">

                <strong>
                  Localización de entrega
                </strong>

                <span>

                  {
                    selected.Latitud ??
                    'Sin latitud'
                  }

                  {' , '}

                  {
                    selected.Longitud ??
                    'Sin longitud'
                  }

                </span>

                <div className="map-grid">

                  Mapa preparado para
                  integrar proveedor
                  cartográfico

                </div>

              </div>

            </>

          )}

        </DetailModal>

      )}

    />

  );
}


export default ClientsPage;
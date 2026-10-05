import {
  useEffect,
  useState
} from "react";

import ServerModuleTablePage
  from "../components/ServerModuleTablePage";

import DetailModal, {
  DetailGrid
} from "../components/DetailModal";

import {
  getSuppliers,
  getSupplierDetail,
  getSupplierCategories
} from "../services/supplierApi";


const config = {
  eyebrow:
    "GESTIÓN · PROVEEDORES",

  title:
    "Módulo de proveedores",

  description:
    "Consulte proveedores por coincidencia de nombre y categoría.",

  tableTitle:
    "Proveedores encontrados",

  sortLabel:
    "nombre ascendente",

  initialFilters: {
    name: "",
    category: ""
  }
};


const columns = [
  {
    key: "NombreProveedor",
    label: "Nombre del proveedor"
  },
  {
    key: "Categoria",
    label: "Categoría"
  },
  {
    key: "MetodoEntrega",
    label: "Método de entrega"
  }
];


function SuppliersPage() {

  const [categories, setCategories] =
    useState([]);


  useEffect(() => {

    async function cargarCategorias() {

      try {

        const datos =
          await getSupplierCategories();

        setCategories(datos);

      } catch (error) {

        console.error(
          "Error cargando categorías:",
          error
        );

      }
    }

    cargarCategorias();

  }, []);


  return (

    <ServerModuleTablePage

      config={config}

      loadData={getSuppliers}

      loadDetail={(row) =>
        getSupplierDetail(
          row.SupplierID
        )
      }

      getRowKey={(row) =>
        row.SupplierID
      }

      tableColumns={columns}


      renderFilters={({
        filters,
        updateFilter
      }) => (

        <>

          <label className="field">

            <span>
              Nombre del proveedor
            </span>

            <input
              value={filters.name}
              onChange={(e) =>
                updateFilter(
                  "name",
                  e.target.value
                )
              }
              placeholder="Ej. Packaging"
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
                  "category",
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
                      category
                        .SupplierCategoryID
                    }
                    value={
                      category
                        .SupplierCategoryID
                    }
                  >

                    {
                      category
                        .SupplierCategoryName
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
            selected?.NombreProveedor
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
                      "Código del proveedor",
                    value:
                      selected.CodigoProveedor
                  },

                  {
                    label:
                      "Nombre",
                    value:
                      selected.NombreProveedor
                  },

                  {
                    label:
                      "Categoría",
                    value:
                      selected.Categoria
                  },

                  {
                    label:
                      "Contacto primario",
                    value:
                      selected.ContactoPrimario
                  },

                  {
                    label:
                      "Contacto alternativo",
                    value:
                      selected.ContactoAlternativo
                  },

                  {
                    label:
                      "Método de entrega",
                    value:
                      selected.MetodoEntrega
                  },

                  {
                    label:
                      "Ciudad",
                    value:
                      selected.CiudadEntrega
                  },

                  {
                    label:
                      "Código postal",
                    value:
                      selected.CodigoPostalEntrega
                  },

                  {
                    label:
                      "Teléfono",
                    value:
                      selected.Telefono
                  },

                  {
                    label:
                      "Fax",
                    value:
                      selected.Fax
                  },

                  {
                    label:
                      "Sitio web",
                    value:
                      selected.SitioWeb,
                    link:
                      selected.SitioWeb
                  },

                  {
                    label:
                      "Banco",
                    value:
                      selected.NombreBanco
                  },

                  {
                    label:
                      "Número de cuenta",
                    value:
                      selected.NumeroCuenta
                  },

                  {
                    label:
                      "Días para pagar",
                    value:
                      selected.DiasPago
                  },

                  {
                    label:
                      "Dirección de entrega",
                    value:
                      [
                        selected
                          .DireccionEntrega1,

                        selected
                          .DireccionEntrega2
                      ]
                        .filter(Boolean)
                        .join(", "),

                    wide: true
                  },

                  {
                    label:
                      "Dirección postal",
                    value:
                      [
                        selected
                          .DireccionPostal1,

                        selected
                          .DireccionPostal2
                      ]
                        .filter(Boolean)
                        .join(", "),

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
                    "Sin latitud"
                  }

                  {" , "}

                  {
                    selected.Longitud ??
                    "Sin longitud"
                  }
                </span>

                <div className="map-grid">
                  Mapa preparado para
                  integrar posteriormente.
                </div>

              </div>

            </>

          )}

        </DetailModal>

      )}

    />

  );
}


export default SuppliersPage;
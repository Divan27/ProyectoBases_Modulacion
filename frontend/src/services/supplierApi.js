const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000";


async function request(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({}));

    throw new Error(
      error.mensaje ||
      "Error al consultar la API"
    );
  }

  return response.json();
}


export async function getSuppliers({
  filters,
  page,
  pageSize
}) {
  const params =
    new URLSearchParams();

  params.set("pagina", page);
  params.set("cantidad", pageSize);


  if (filters.name.trim()) {
    params.set(
      "nombre",
      filters.name.trim()
    );
  }


  if (filters.category) {
    params.set(
      "categoriaID",
      filters.category
    );
  }


  return request(
    `${API_URL}/api/proveedores?${params}`
  );
}


export async function getSupplierDetail(id) {
  return request(
    `${API_URL}/api/proveedores/${id}`
  );
}


export async function getSupplierCategories() {
  return request(
    `${API_URL}/api/proveedores/categorias`
  );
}
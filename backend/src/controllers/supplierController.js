const supplierService =
  require("../services/supplierService");


async function listarProveedores(req, res) {
  try {

    const nombre =
      req.query.nombre || null;

    const categoriaID =
      req.query.categoriaID
        ? Number(req.query.categoriaID)
        : null;

    const pagina =
      Number(req.query.pagina) || 1;

    const cantidad =
      Number(req.query.cantidad) || 10;


    const resultado =
      await supplierService
        .listarProveedores(
          nombre,
          categoriaID,
          pagina,
          cantidad
        );


    res.json(resultado);

  } catch (error) {

    console.error(
      "Error proveedores:",
      error
    );

    res.status(500).json({
      mensaje:
        "Error al obtener proveedores."
    });

  }
}


async function detalleProveedor(req, res) {
  try {

    const id =
      Number(req.params.id);

    if (!id) {
      return res.status(400).json({
        mensaje:
          "Identificador de proveedor inválido."
      });
    }


    const proveedor =
      await supplierService
        .obtenerDetalle(id);


    if (!proveedor) {
      return res.status(404).json({
        mensaje:
          "Proveedor no encontrado."
      });
    }


    res.json(proveedor);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje:
        "Error al obtener el proveedor."
    });

  }
}


async function categorias(req, res) {
  try {

    const datos =
      await supplierService
        .obtenerCategorias();

    res.json(datos);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje:
        "Error al obtener categorías."
    });

  }
}


module.exports = {
  listarProveedores,
  detalleProveedor,
  categorias
};
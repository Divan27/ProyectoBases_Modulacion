const inventoryService =
  require("../services/inventoryService");


async function listarInventario(req, res) {

  try {

    const nombre =
      req.query.nombre || null;

    const grupoID =
      req.query.grupoID
        ? Number(req.query.grupoID)
        : null;

    const cantidadMin =
      req.query.cantidadMin !== undefined &&
      req.query.cantidadMin !== ""
        ? Number(req.query.cantidadMin)
        : null;

    const cantidadMax =
      req.query.cantidadMax !== undefined &&
      req.query.cantidadMax !== ""
        ? Number(req.query.cantidadMax)
        : null;

    const pagina =
      Number(req.query.pagina) || 1;

    const cantidad =
      Number(req.query.cantidad) || 10;


    const resultado =
      await inventoryService.listarInventario(
        nombre,
        grupoID,
        cantidadMin,
        cantidadMax,
        pagina,
        cantidad
      );


    res.json(resultado);


  } catch (error) {

    console.error(
      "Error inventarios:",
      error
    );

    res.status(500).json({
      mensaje:
        "Error al obtener el inventario."
    });

  }
}


async function detalleProducto(req, res) {

  try {

    const id =
      Number(req.params.id);


    const producto =
      await inventoryService
        .obtenerDetalle(id);


    if (!producto) {

      return res.status(404).json({
        mensaje:
          "Producto no encontrado."
      });

    }


    res.json(producto);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje:
        "Error al obtener el producto."
    });

  }
}


async function grupos(req, res) {

  try {

    const datos =
      await inventoryService
        .obtenerGrupos();

    res.json(datos);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje:
        "Error al obtener los grupos."
    });

  }
}


module.exports = {
  listarInventario,
  detalleProducto,
  grupos
};
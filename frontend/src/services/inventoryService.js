const { sql, getPool } =
  require("../config/database");


async function listarInventario(
  nombre,
  grupoID,
  cantidadMin,
  cantidadMax,
  pagina,
  cantidad
) {

  const pool = await getPool();

  const resultado = await pool
    .request()

    .input(
      "Nombre",
      sql.NVarChar(100),
      nombre || null
    )

    .input(
      "GrupoID",
      sql.Int,
      grupoID || null
    )

    .input(
      "CantidadMin",
      sql.Int,
      cantidadMin ?? null
    )

    .input(
      "CantidadMax",
      sql.Int,
      cantidadMax ?? null
    )

    .input(
      "Pagina",
      sql.Int,
      pagina
    )

    .input(
      "Cantidad",
      sql.Int,
      cantidad
    )

    .execute(
      "api.sp_Inventarios_Listar"
    );


  return {

    datos:
      resultado.recordsets[0],

    total:
      resultado.recordsets[1][0]
        .TotalRegistros,

    pagina,
    cantidad

  };
}


async function obtenerDetalle(id) {

  const pool = await getPool();

  const resultado = await pool
    .request()

    .input(
      "StockItemID",
      sql.Int,
      id
    )

    .execute(
      "api.sp_Inventario_Detalle"
    );


  return resultado.recordset[0];
}


async function obtenerGrupos() {

  const pool = await getPool();

  const resultado = await pool
    .request()
    .execute(
      "api.sp_Inventarios_Grupos"
    );

  return resultado.recordset;
}


module.exports = {
  listarInventario,
  obtenerDetalle,
  obtenerGrupos
};
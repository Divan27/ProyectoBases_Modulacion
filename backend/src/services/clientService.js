const { sql, getPool } =
    require("../config/database");


async function listarClientes(
    nombre,
    categoriaID,
    metodoEntregaID,
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
            "CategoriaID",
            sql.Int,
            categoriaID || null
        )

        .input(
            "MetodoEntregaID",
            sql.Int,
            metodoEntregaID || null
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

        .execute("api.sp_Clientes_Listar");


    return {
        datos: resultado.recordsets[0],

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
            "CustomerID",
            sql.Int,
            id
        )

        .execute(
            "api.sp_Cliente_Detalle"
        );

    return resultado.recordset[0];
}


async function obtenerCategorias() {

    const pool = await getPool();

    const resultado = await pool
        .request()
        .execute(
            "api.sp_Clientes_Categorias"
        );

    return resultado.recordset;
}


async function obtenerMetodosEntrega() {

    const pool = await getPool();

    const resultado = await pool
        .request()
        .execute(
            "api.sp_Clientes_MetodosEntrega"
        );

    return resultado.recordset;
}


module.exports = {
    listarClientes,
    obtenerDetalle,
    obtenerCategorias,
    obtenerMetodosEntrega
};
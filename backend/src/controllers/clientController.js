const clientService =
    require("../services/clientService");


async function listarClientes(req, res) {

    try {

        const nombre =
            req.query.nombre || null;

        const categoriaID =
            req.query.categoriaID
                ? Number(req.query.categoriaID)
                : null;

        const metodoEntregaID =
            req.query.metodoEntregaID
                ? Number(req.query.metodoEntregaID)
                : null;

        const pagina =
            Number(req.query.pagina) || 1;

        const cantidad =
            Number(req.query.cantidad) || 10;


        const resultado =
            await clientService.listarClientes(
                nombre,
                categoriaID,
                metodoEntregaID,
                pagina,
                cantidad
            );


        res.json(resultado);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje:
                "Error al obtener clientes."
        });
    }
}


async function detalleCliente(req, res) {

    try {

        const id =
            Number(req.params.id);

        const cliente =
            await clientService
                .obtenerDetalle(id);

        if (!cliente) {

            return res.status(404).json({
                mensaje:
                    "Cliente no encontrado."
            });
        }

        res.json(cliente);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje:
                "Error al obtener el cliente."
        });
    }
}


async function categorias(req, res) {

    try {

        const datos =
            await clientService
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


async function metodosEntrega(req, res) {

    try {

        const datos =
            await clientService
                .obtenerMetodosEntrega();

        res.json(datos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje:
                "Error al obtener métodos de entrega."
        });
    }
}


module.exports = {
    listarClientes,
    detalleCliente,
    categorias,
    metodosEntrega
};
const express = require("express");

const clientController =
    require("../controllers/clientController");

const router = express.Router();


router.get(
    "/categorias",
    clientController.categorias
);


router.get(
    "/metodos-entrega",
    clientController.metodosEntrega
);


router.get(
    "/:id",
    clientController.detalleCliente
);


router.get(
    "/",
    clientController.listarClientes
);


module.exports = router;
const express = require("express");

const supplierController =
  require("../controllers/supplierController");

const router = express.Router();


router.get(
  "/categorias",
  supplierController.categorias
);


router.get(
  "/:id",
  supplierController.detalleProveedor
);


router.get(
  "/",
  supplierController.listarProveedores
);


module.exports = router;
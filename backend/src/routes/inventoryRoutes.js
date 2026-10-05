const express = require("express");

const inventoryController =
  require("../controllers/inventoryController");

const router = express.Router();


router.get(
  "/grupos",
  inventoryController.grupos
);


router.get(
  "/:id",
  inventoryController.detalleProducto
);


router.get(
  "/",
  inventoryController.listarInventario
);


module.exports = router;
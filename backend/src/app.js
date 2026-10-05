require('dotenv').config();
const supplierRoutes =
  require("./routes/supplierRoutes");
const express = require('express');
const cors = require('cors');
const inventoryRoutes =
  require("./routes/inventoryRoutes");
const healthRoutes = require('./routes/healthRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/modulos', moduleRoutes);
app.use('/api/clientes', clientRoutes);
app.use(
  "/api/clientes",
  clientRoutes
);
app.use(
  "/api/inventarios",
  inventoryRoutes
);
app.use(
  "/api/proveedores",
  supplierRoutes
);
app.use((req, res) => {
  res.status(404).json({
    mensaje: 'Ruta no encontrada'
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    mensaje: 'Error interno del servidor'
  });
});

app.listen(PORT, () => {
  console.log(
    `API disponible en http://localhost:${PORT}`
  );
});
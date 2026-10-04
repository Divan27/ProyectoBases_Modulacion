require('dotenv').config();
const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/healthRoutes');
const moduleRoutes = require('./routes/moduleRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/modulos', moduleRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`API disponible en http://localhost:${PORT}`);
});

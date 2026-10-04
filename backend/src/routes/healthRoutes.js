const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ estado: 'ok', servicio: 'Modulación de consultas API' });
});

module.exports = router;

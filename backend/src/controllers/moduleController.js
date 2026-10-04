const moduleService = require('../services/moduleService');

function listarModulos(req, res) {
  res.json(moduleService.obtenerModulos());
}

module.exports = { listarModulos };

const express = require('express');
const { listarModulos } = require('../controllers/moduleController');

const router = express.Router();
router.get('/', listarModulos);

module.exports = router;

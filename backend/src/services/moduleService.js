const modulos = [
  { id: 'clientes', nombre: 'Módulo de clientes' },
  { id: 'proveedores', nombre: 'Módulo de proveedores' },
  { id: 'inventarios', nombre: 'Módulo de inventarios' },
  { id: 'ventas', nombre: 'Módulo de ventas' },
  { id: 'reportes', nombre: 'Reportes y datos estadísticos' }
];

function obtenerModulos() {
  return { datos: modulos };
}

module.exports = { obtenerModulos };

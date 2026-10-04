# Modulación de consultas - WideWorldImporters

Proyecto de Bases de Datos II para consultar y gestionar información de la base de datos de ejemplo **WideWorldImporters** de Microsoft.

## Integrantes
- Dilan Zamora Sánchez
- Daryll Martínez Rodríguez

## Estado actual
Se completó el **primer modelo funcional de la aplicación web**:

- Página principal con navegación por módulos.
- Módulo de clientes con filtros acumulativos, paginación y detalle.
- Módulo de proveedores con filtros acumulativos, paginación y detalle.
- Módulo de inventarios con filtros acumulativos, rangos de existencias, paginación y detalle.
- Módulo de ventas con filtros por cliente, fechas y montos, paginación y detalle de factura.
- Módulo de reportes con las 10 consultas estadísticas requeridas, filtros y paginación de resultados.
- Diseño responsive y accesible con paleta beige, blanco y negro.
- Navegación común mediante header.
- Componentes reutilizables para filtros, tablas, paginación y ventanas de detalle.
- Backend Express preparado para conectar SQL Server.
- Ejecución conjunta del frontend y backend con un solo comando.

> Los datos mostrados actualmente son de demostración para validar el flujo visual y la paginación. En la siguiente etapa los filtros, búsqueda, ordenamiento, agrupación y paginación serán ejecutados por Stored Procedures en SQL Server y consumidos desde el API.

## Tecnologías
- React + Vite
- React Router
- Lucide React
- Node.js + Express
- SQL Server / WideWorldImporters (siguiente etapa)
- `mssql` para la conexión del API

## Arquitectura

```text
React
  ↓ parámetros
API Express
  ↓ ejecución
Stored Procedures
  ↓
Sinónimos
  ↓
WideWorldImporters
```

El frontend queda orientado a presentación y envío de parámetros. La lógica de búsqueda y transformación se trasladará a SQL Server para cumplir con los requisitos del proyecto.

## Ejecutar el proyecto
Desde la carpeta raíz:

```bash
npm run dev
```

La primera ejecución instala las dependencias automáticamente si hacen falta.

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

Para detener ambos procesos use `Ctrl + C`.

## Rutas web
- `/` - Panel principal
- `/clientes` - Módulo de clientes
- `/proveedores` - Módulo de proveedores
- `/inventarios` - Módulo de inventarios
- `/ventas` - Módulo de ventas
- `/reportes` - Reportes y datos estadísticos

## Próxima etapa
1. Restaurar WideWorldImporters en SQL Server.
2. Crear sinónimos para las tablas utilizadas.
3. Crear Stored Procedures por módulo.
4. Implementar paginación y filtros dentro de SQL Server.
5. Crear rutas, controladores y servicios del API.
6. Sustituir los datos de demostración del frontend por respuestas del API.
7. Implementar transacciones con `BEGIN TRANSACTION`, `COMMIT` y `ROLLBACK` para operaciones de escritura.
8. Agregar scripts de ejecución de ejemplo.
9. Ajustar la estructura final de entrega a `Script`, `WebSite` y `Api` según la especificación del curso.

## Objetivos alcanzados
- Modelo visual completo de la aplicación.
- Navegación y estructura escalable por módulos.
- Paginación reutilizable en todos los módulos.
- Interfaz de filtros y detalles alineada con los requisitos.
- Catálogo visual de las diez consultas estadísticas.

## Objetivos pendientes
- Conexión final a WideWorldImporters.
- Stored Procedures y sinónimos.
- Operaciones de escritura con transacciones.
- API funcional con SQL Server.
- Video final de demostración.

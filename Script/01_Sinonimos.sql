USE WideWorldImporters;
GO

/* =========================================================
   1. CREAR ESQUEMA PARA LOS SINÓNIMOS
   ========================================================= */

IF NOT EXISTS (
    SELECT 1
    FROM sys.schemas
    WHERE name = 'syn'
)
BEGIN
    EXEC('CREATE SCHEMA syn AUTHORIZATION dbo');
END;
GO


/* =========================================================
   2. ELIMINAR SINÓNIMOS SI YA EXISTEN
   Esto permite volver a ejecutar el script sin errores.
   ========================================================= */

DROP SYNONYM IF EXISTS syn.Clientes;
GO

DROP SYNONYM IF EXISTS syn.CategoriasClientes;
GO

DROP SYNONYM IF EXISTS syn.MetodosEntrega;
GO

DROP SYNONYM IF EXISTS syn.Personas;
GO

DROP SYNONYM IF EXISTS syn.Ciudades;
GO


/* =========================================================
   3. CREAR SINÓNIMOS
   ========================================================= */

CREATE SYNONYM syn.Clientes
FOR Sales.Customers;
GO

CREATE SYNONYM syn.CategoriasClientes
FOR Sales.CustomerCategories;
GO

CREATE SYNONYM syn.MetodosEntrega
FOR Application.DeliveryMethods;
GO

CREATE SYNONYM syn.Personas
FOR Application.People;
GO

CREATE SYNONYM syn.Ciudades
FOR Application.Cities;
GO

DROP SYNONYM IF EXISTS syn.GruposCompra;
GO

CREATE SYNONYM syn.GruposCompra
FOR Sales.BuyingGroups;
GO

/* =========================================================
   4. VERIFICAR SINÓNIMOS CREADOS
   ========================================================= */

SELECT
    SCHEMA_NAME(schema_id) AS Esquema,
    name AS Sinonimo,
    base_object_name AS ObjetoReal
FROM sys.synonyms
WHERE SCHEMA_NAME(schema_id) = 'syn'
ORDER BY name;
GO


/* =========================================================
   5. PRUEBA DEL SINÓNIMO DE CLIENTES
   ========================================================= */

SELECT TOP 10
    CustomerID,
    CustomerName
FROM syn.Clientes
ORDER BY CustomerName;
GO

SELECT TOP 10 *
FROM syn.GruposCompra;
GO

USE WideWorldImporters;
GO

DROP SYNONYM IF EXISTS syn.Proveedores;
GO

CREATE SYNONYM syn.Proveedores
FOR Purchasing.Suppliers;
GO


DROP SYNONYM IF EXISTS syn.CategoriasProveedores;
GO

CREATE SYNONYM syn.CategoriasProveedores
FOR Purchasing.SupplierCategories;
GO

SELECT TOP 10 *
FROM syn.Proveedores;
GO

SELECT TOP 10 *
FROM syn.CategoriasProveedores;
GO

USE WideWorldImporters;
GO

DROP SYNONYM IF EXISTS syn.Productos;
GO

CREATE SYNONYM syn.Productos
FOR Warehouse.StockItems;
GO


DROP SYNONYM IF EXISTS syn.InventarioProductos;
GO

CREATE SYNONYM syn.InventarioProductos
FOR Warehouse.StockItemHoldings;
GO


DROP SYNONYM IF EXISTS syn.GruposProductos;
GO

CREATE SYNONYM syn.GruposProductos
FOR Warehouse.StockGroups;
GO


DROP SYNONYM IF EXISTS syn.ProductosGrupos;
GO

CREATE SYNONYM syn.ProductosGrupos
FOR Warehouse.StockItemStockGroups;
GO


DROP SYNONYM IF EXISTS syn.Colores;
GO

CREATE SYNONYM syn.Colores
FOR Warehouse.Colors;
GO


DROP SYNONYM IF EXISTS syn.TiposEmpaque;
GO

CREATE SYNONYM syn.TiposEmpaque
FOR Warehouse.PackageTypes;
GO
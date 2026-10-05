USE WideWorldImporters;
GO


EXEC api.sp_Clientes_Listar
    @Pagina = 1,
    @Cantidad = 10;
GO

EXEC api.sp_Clientes_Listar
    @Pagina = 2,
    @Cantidad = 10;
GO

EXEC api.sp_Clientes_Listar
    @Nombre = 'Tail',
    @Pagina = 1,
    @Cantidad = 10;
GO

EXEC api.sp_Clientes_Categorias;
GO

EXEC api.sp_Clientes_Listar
    @CategoriaID = 3,
    @Pagina = 1,
    @Cantidad = 10;
GO

EXEC api.sp_Clientes_MetodosEntrega;
GO

EXEC api.sp_Clientes_Listar
    @MetodoEntregaID = 1,
    @Pagina = 1,
    @Cantidad = 10;
GO

EXEC api.sp_Clientes_Listar
    @Nombre = 'Shop',
    @CategoriaID = 3,
    @MetodoEntregaID = 1,
    @Pagina = 1,
    @Cantidad = 10;
GO


EXEC api.sp_Clientes_Listar
    @Nombre = NULL,
    @CategoriaID = NULL,
    @MetodoEntregaID = NULL,
    @Pagina = 1,
    @Cantidad = 10;
GO

EXEC api.sp_Clientes_Listar
    @Pagina = 1,
    @Cantidad = 10;
GO

EXEC api.sp_Cliente_Detalle
    @CustomerID = 832;
GO

/* ============================================================
   PRUEBAS PROVEEDORES
   ============================================================ */

EXEC api.sp_Proveedores_Listar
    @Pagina = 1,
    @Cantidad = 10;
GO


EXEC api.sp_Proveedores_Listar
    @Pagina = 2,
    @Cantidad = 10;
GO


EXEC api.sp_Proveedores_Listar
    @Nombre = 'Packaging',
    @Pagina = 1,
    @Cantidad = 10;
GO


EXEC api.sp_Proveedores_Categorias;
GO

EXEC api.sp_Proveedores_Categorias;
GO

EXEC api.sp_Proveedores_Listar
    @CategoriaID = 2,
    @Pagina = 1,
    @Cantidad = 10;
GO

SELECT TOP 5 *
FROM syn.Productos;
GO

SELECT TOP 5 *
FROM syn.InventarioProductos;
GO

SELECT TOP 5 *
FROM syn.GruposProductos;
GO

/* ============================================================
   INVENTARIOS
   ============================================================ */

EXEC api.sp_Inventarios_Listar
    @Pagina = 1,
    @Cantidad = 10;
GO
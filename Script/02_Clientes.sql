USE WideWorldImporters;
GO


/* ============================================================
   CREAR ESQUEMA PARA PROCEDIMIENTOS
   ============================================================ */

IF NOT EXISTS (
    SELECT 1
    FROM sys.schemas
    WHERE name = 'api'
)
BEGIN
    EXEC('CREATE SCHEMA api AUTHORIZATION dbo');
END;
GO


/* ============================================================
   1. LISTAR CLIENTES
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Clientes_Listar

    @Nombre NVARCHAR(100) = NULL,
    @CategoriaID INT = NULL,
    @MetodoEntregaID INT = NULL,

    @Pagina INT = 1,
    @Cantidad INT = 10

AS
BEGIN

    SET NOCOUNT ON;


    /* --------------------------------------------
       VALIDAR PAGINACIÓN
       -------------------------------------------- */

    IF @Pagina < 1
        SET @Pagina = 1;

    IF @Cantidad < 1
        SET @Cantidad = 10;


    DECLARE @Offset INT;

    SET @Offset = (@Pagina - 1) * @Cantidad;


    /* --------------------------------------------
       RESULTADO 1:
       CLIENTES DE LA PÁGINA ACTUAL
       -------------------------------------------- */

    SELECT

        c.CustomerID,

        c.CustomerName AS NombreCliente,

        cc.CustomerCategoryName AS Categoria,

        dm.DeliveryMethodName AS MetodoEntrega

    FROM syn.Clientes c

    INNER JOIN syn.CategoriasClientes cc
        ON c.CustomerCategoryID = cc.CustomerCategoryID

    LEFT JOIN syn.MetodosEntrega dm
        ON c.DeliveryMethodID = dm.DeliveryMethodID


    WHERE

        (
            @Nombre IS NULL
            OR @Nombre = ''
            OR c.CustomerName LIKE '%' + @Nombre + '%'
        )

        AND

        (
            @CategoriaID IS NULL
            OR c.CustomerCategoryID = @CategoriaID
        )

        AND

        (
            @MetodoEntregaID IS NULL
            OR c.DeliveryMethodID = @MetodoEntregaID
        )


    ORDER BY
        c.CustomerName ASC,
        c.CustomerID ASC


    OFFSET @Offset ROWS
    FETCH NEXT @Cantidad ROWS ONLY;



    /* --------------------------------------------
       RESULTADO 2:
       TOTAL DE REGISTROS
       -------------------------------------------- */

    SELECT

        COUNT(*) AS TotalRegistros

    FROM syn.Clientes c

    WHERE

        (
            @Nombre IS NULL
            OR @Nombre = ''
            OR c.CustomerName LIKE '%' + @Nombre + '%'
        )

        AND

        (
            @CategoriaID IS NULL
            OR c.CustomerCategoryID = @CategoriaID
        )

        AND

        (
            @MetodoEntregaID IS NULL
            OR c.DeliveryMethodID = @MetodoEntregaID
        );

END;
GO



/* ============================================================
   2. DETALLE DE CLIENTE
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Cliente_Detalle

    @CustomerID INT

AS
BEGIN

    SET NOCOUNT ON;


    SELECT

        c.CustomerID,

        c.CustomerName AS NombreCliente,

        cc.CustomerCategoryName AS Categoria,

        bg.BuyingGroupName AS GrupoCompra,

        pc.FullName AS ContactoPrimario,

        ac.FullName AS ContactoAlternativo,

        c.BillToCustomerID,

        bc.CustomerName AS ClienteFacturacion,

        dm.DeliveryMethodName AS MetodoEntrega,

        ciudad.CityName AS CiudadEntrega,

        c.DeliveryPostalCode AS CodigoPostalEntrega,

        c.PhoneNumber AS Telefono,

        c.FaxNumber AS Fax,

        c.PaymentDays AS DiasPago,

        c.WebsiteURL AS SitioWeb,

        c.DeliveryAddressLine1 AS DireccionEntrega1,

        c.DeliveryAddressLine2 AS DireccionEntrega2,

        c.PostalAddressLine1 AS DireccionPostal1,

        c.PostalAddressLine2 AS DireccionPostal2,

        c.PostalPostalCode AS CodigoPostal,

        CASE
            WHEN c.DeliveryLocation IS NULL
                THEN NULL
            ELSE c.DeliveryLocation.Lat
        END AS Latitud,

        CASE
            WHEN c.DeliveryLocation IS NULL
                THEN NULL
            ELSE c.DeliveryLocation.Long
        END AS Longitud


    FROM syn.Clientes c


    INNER JOIN syn.CategoriasClientes cc
        ON c.CustomerCategoryID = cc.CustomerCategoryID


    LEFT JOIN syn.GruposCompra bg
        ON c.BuyingGroupID = bg.BuyingGroupID


    LEFT JOIN syn.Personas pc
        ON c.PrimaryContactPersonID = pc.PersonID


    LEFT JOIN syn.Personas ac
        ON c.AlternateContactPersonID = ac.PersonID


    LEFT JOIN syn.Clientes bc
        ON c.BillToCustomerID = bc.CustomerID


    LEFT JOIN syn.MetodosEntrega dm
        ON c.DeliveryMethodID = dm.DeliveryMethodID


    LEFT JOIN syn.Ciudades ciudad
        ON c.DeliveryCityID = ciudad.CityID


    WHERE
        c.CustomerID = @CustomerID;

END;
GO



/* ============================================================
   3. LISTAR CATEGORÍAS
   PARA EL SELECT DEL FRONTEND
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Clientes_Categorias

AS
BEGIN

    SET NOCOUNT ON;


    SELECT

        CustomerCategoryID,

        CustomerCategoryName

    FROM syn.CategoriasClientes

    ORDER BY
        CustomerCategoryName ASC;

END;
GO



/* ============================================================
   4. LISTAR MÉTODOS DE ENTREGA
   PARA EL SELECT DEL FRONTEND
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Clientes_MetodosEntrega

AS
BEGIN

    SET NOCOUNT ON;


    SELECT

        DeliveryMethodID,

        DeliveryMethodName

    FROM syn.MetodosEntrega

    ORDER BY
        DeliveryMethodName ASC;

END;
GO
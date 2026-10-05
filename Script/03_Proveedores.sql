USE WideWorldImporters;
GO


/* ============================================================
   1. LISTAR PROVEEDORES
   - Nombre por coincidencia
   - Categoría
   - Filtros acumulativos
   - Orden alfabético
   - Paginación
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Proveedores_Listar

    @Nombre NVARCHAR(100) = NULL,
    @CategoriaID INT = NULL,
    @Pagina INT = 1,
    @Cantidad INT = 10

AS
BEGIN

    SET NOCOUNT ON;


    IF @Pagina < 1
        SET @Pagina = 1;

    IF @Cantidad < 1
        SET @Cantidad = 10;


    DECLARE @Offset INT;

    SET @Offset = (@Pagina - 1) * @Cantidad;


    /* RESULTADO 1: página actual */

    SELECT

        s.SupplierID,

        s.SupplierName AS NombreProveedor,

        sc.SupplierCategoryName AS Categoria,

        dm.DeliveryMethodName AS MetodoEntrega

    FROM syn.Proveedores s

    INNER JOIN syn.CategoriasProveedores sc
        ON s.SupplierCategoryID =
           sc.SupplierCategoryID

    LEFT JOIN syn.MetodosEntrega dm
        ON s.DeliveryMethodID =
           dm.DeliveryMethodID

    WHERE

        (
            @Nombre IS NULL
            OR @Nombre = ''
            OR s.SupplierName
                LIKE '%' + @Nombre + '%'
        )

        AND

        (
            @CategoriaID IS NULL
            OR s.SupplierCategoryID =
               @CategoriaID
        )

    ORDER BY
        s.SupplierName ASC,
        s.SupplierID ASC

    OFFSET @Offset ROWS
    FETCH NEXT @Cantidad ROWS ONLY;


    /* RESULTADO 2: total */

    SELECT
        COUNT(*) AS TotalRegistros

    FROM syn.Proveedores s

    WHERE

        (
            @Nombre IS NULL
            OR @Nombre = ''
            OR s.SupplierName
                LIKE '%' + @Nombre + '%'
        )

        AND

        (
            @CategoriaID IS NULL
            OR s.SupplierCategoryID =
               @CategoriaID
        );

END;
GO



/* ============================================================
   2. DETALLE DE PROVEEDOR
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Proveedor_Detalle

    @SupplierID INT

AS
BEGIN

    SET NOCOUNT ON;


    SELECT

        s.SupplierID,

        s.SupplierReference AS CodigoProveedor,

        s.SupplierName AS NombreProveedor,

        sc.SupplierCategoryName AS Categoria,

        pc.FullName AS ContactoPrimario,

        ac.FullName AS ContactoAlternativo,

        dm.DeliveryMethodName AS MetodoEntrega,

        ciudad.CityName AS CiudadEntrega,

        s.DeliveryPostalCode AS CodigoPostalEntrega,

        s.PhoneNumber AS Telefono,

        s.FaxNumber AS Fax,

        s.WebsiteURL AS SitioWeb,

        s.DeliveryAddressLine1
            AS DireccionEntrega1,

        s.DeliveryAddressLine2
            AS DireccionEntrega2,

        s.PostalAddressLine1
            AS DireccionPostal1,

        s.PostalAddressLine2
            AS DireccionPostal2,

        s.PostalPostalCode
            AS CodigoPostal,

        s.BankAccountName
            AS NombreBanco,

        s.BankAccountBranch
            AS SucursalBanco,

        s.BankAccountCode
            AS CodigoBanco,

        s.BankAccountNumber
            AS NumeroCuenta,

        s.BankInternationalCode
            AS CodigoInternacionalBanco,

        s.PaymentDays
            AS DiasPago,

        CASE
            WHEN s.DeliveryLocation IS NULL
                THEN NULL
            ELSE s.DeliveryLocation.Lat
        END AS Latitud,

        CASE
            WHEN s.DeliveryLocation IS NULL
                THEN NULL
            ELSE s.DeliveryLocation.Long
        END AS Longitud


    FROM syn.Proveedores s


    INNER JOIN syn.CategoriasProveedores sc
        ON s.SupplierCategoryID =
           sc.SupplierCategoryID


    LEFT JOIN syn.Personas pc
        ON s.PrimaryContactPersonID =
           pc.PersonID


    LEFT JOIN syn.Personas ac
        ON s.AlternateContactPersonID =
           ac.PersonID


    LEFT JOIN syn.MetodosEntrega dm
        ON s.DeliveryMethodID =
           dm.DeliveryMethodID


    LEFT JOIN syn.Ciudades ciudad
        ON s.DeliveryCityID =
           ciudad.CityID


    WHERE
        s.SupplierID = @SupplierID;

END;
GO



/* ============================================================
   3. CATEGORÍAS DE PROVEEDORES
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Proveedores_Categorias

AS
BEGIN

    SET NOCOUNT ON;

    SELECT

        SupplierCategoryID,

        SupplierCategoryName

    FROM syn.CategoriasProveedores

    ORDER BY
        SupplierCategoryName ASC;

END;
GO
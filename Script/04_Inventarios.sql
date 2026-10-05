USE WideWorldImporters;
GO


/* ============================================================
   1. LISTAR PRODUCTOS / INVENTARIO
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Inventarios_Listar

    @Nombre NVARCHAR(100) = NULL,
    @GrupoID INT = NULL,

    @CantidadMin INT = NULL,
    @CantidadMax INT = NULL,

    @Pagina INT = 1,
    @Cantidad INT = 10

AS
BEGIN

    SET NOCOUNT ON;


    /* Validaciones */

    IF @Pagina < 1
        SET @Pagina = 1;

    IF @Cantidad < 1
        SET @Cantidad = 10;


    DECLARE @Offset INT;

    SET @Offset =
        (@Pagina - 1) * @Cantidad;



    /* ========================================================
       RESULTADO 1:
       PRODUCTOS DE LA PÁGINA ACTUAL
       ======================================================== */

    SELECT

        si.StockItemID,

        si.StockItemName
            AS NombreProducto,

        grupos.Grupos
            AS Grupo,

        h.QuantityOnHand
            AS CantidadInventario


    FROM syn.Productos si


    INNER JOIN syn.InventarioProductos h
        ON si.StockItemID =
           h.StockItemID


    OUTER APPLY
    (
        SELECT
            STRING_AGG(
                sg.StockGroupName,
                ', '
            ) AS Grupos

        FROM syn.ProductosGrupos sisg

        INNER JOIN syn.GruposProductos sg
            ON sisg.StockGroupID =
               sg.StockGroupID

        WHERE
            sisg.StockItemID =
            si.StockItemID

    ) grupos


    WHERE

        (
            @Nombre IS NULL
            OR @Nombre = ''
            OR si.StockItemName
                LIKE '%' + @Nombre + '%'
        )


        AND

        (
            @GrupoID IS NULL

            OR EXISTS
            (
                SELECT 1

                FROM syn.ProductosGrupos sisg2

                WHERE
                    sisg2.StockItemID =
                    si.StockItemID

                    AND
                    sisg2.StockGroupID =
                    @GrupoID
            )
        )


        AND

        (
            @CantidadMin IS NULL
            OR h.QuantityOnHand >=
               @CantidadMin
        )


        AND

        (
            @CantidadMax IS NULL
            OR h.QuantityOnHand <=
               @CantidadMax
        )


    ORDER BY
        si.StockItemName ASC,
        si.StockItemID ASC


    OFFSET @Offset ROWS
    FETCH NEXT @Cantidad ROWS ONLY;



    /* ========================================================
       RESULTADO 2:
       TOTAL DE PRODUCTOS ENCONTRADOS
       ======================================================== */

    SELECT

        COUNT(*) AS TotalRegistros

    FROM syn.Productos si

    INNER JOIN syn.InventarioProductos h
        ON si.StockItemID =
           h.StockItemID

    WHERE

        (
            @Nombre IS NULL
            OR @Nombre = ''
            OR si.StockItemName
                LIKE '%' + @Nombre + '%'
        )


        AND

        (
            @GrupoID IS NULL

            OR EXISTS
            (
                SELECT 1

                FROM syn.ProductosGrupos sisg2

                WHERE
                    sisg2.StockItemID =
                    si.StockItemID

                    AND
                    sisg2.StockGroupID =
                    @GrupoID
            )
        )


        AND

        (
            @CantidadMin IS NULL
            OR h.QuantityOnHand >=
               @CantidadMin
        )


        AND

        (
            @CantidadMax IS NULL
            OR h.QuantityOnHand <=
               @CantidadMax
        );

END;
GO



/* ============================================================
   2. DETALLE DE PRODUCTO
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Inventario_Detalle

    @StockItemID INT

AS
BEGIN

    SET NOCOUNT ON;


    SELECT

        si.StockItemID,

        si.StockItemName
            AS NombreProducto,

        s.SupplierID,

        s.SupplierName
            AS NombreProveedor,

        c.ColorName
            AS Color,

        up.PackageTypeName
            AS UnidadEmpaquetamiento,

        op.PackageTypeName
            AS EmpaquetamientoExterior,

        si.QuantityPerOuter
            AS CantidadEmpaquetamiento,

        si.Brand
            AS Marca,

        si.Size
            AS Tamano,

        si.TaxRate
            AS Impuesto,

        si.UnitPrice
            AS PrecioUnitario,

        si.RecommendedRetailPrice
            AS PrecioVentaRecomendado,

        si.TypicalWeightPerUnit
            AS Peso,

        si.SearchDetails
            AS PalabrasClave,

        h.QuantityOnHand
            AS CantidadDisponible,

        h.BinLocation
            AS Ubicacion,

        grupos.Grupos
            AS Grupos


    FROM syn.Productos si


    INNER JOIN syn.Proveedores s
        ON si.SupplierID =
           s.SupplierID


    INNER JOIN syn.InventarioProductos h
        ON si.StockItemID =
           h.StockItemID


    LEFT JOIN syn.Colores c
        ON si.ColorID =
           c.ColorID


    LEFT JOIN syn.TiposEmpaque up
        ON si.UnitPackageID =
           up.PackageTypeID


    LEFT JOIN syn.TiposEmpaque op
        ON si.OuterPackageID =
           op.PackageTypeID


    OUTER APPLY
    (
        SELECT

            STRING_AGG(
                sg.StockGroupName,
                ', '
            ) AS Grupos

        FROM syn.ProductosGrupos sisg

        INNER JOIN syn.GruposProductos sg
            ON sisg.StockGroupID =
               sg.StockGroupID

        WHERE
            sisg.StockItemID =
            si.StockItemID

    ) grupos


    WHERE
        si.StockItemID =
        @StockItemID;

END;
GO



/* ============================================================
   3. LISTAR GRUPOS
   PARA EL SELECT DEL FRONTEND
   ============================================================ */

CREATE OR ALTER PROCEDURE api.sp_Inventarios_Grupos

AS
BEGIN

    SET NOCOUNT ON;


    SELECT

        StockGroupID,

        StockGroupName

    FROM syn.GruposProductos

    ORDER BY
        StockGroupName ASC;

END;
GO
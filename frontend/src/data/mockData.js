export const customerCategories = ['Novelty Shop', 'Supermarket', 'Computer Store', 'Corporate', 'Gift Store'];
export const deliveryMethods = ['Courier', 'Delivery Van', 'Customer Collect', 'Air Freight'];
export const supplierCategories = ['Novelty Goods Supplier', 'Packaging Supplier', 'Clothing Supplier', 'Toy Supplier', 'Services Supplier'];
export const productGroups = ['Packaging Materials', 'Novelty Items', 'Clothing', 'Toys', 'Computing'];

export const clients = Array.from({ length: 34 }, (_, i) => ({
  id: i + 1,
  name: [
    'A Datum Corporation','Adventure Works','Alpine Ski House','Blue Yonder Airlines','City Power & Light','Contoso Retail','Coho Winery','Fabrikam Stores','Fourth Coffee','Graphic Design Institute','Humongous Insurance','Litware Market','Margie Travel','Northwind Electric','Proseware Shop','Southridge Video','Tailspin Toys','Trey Research','Wide World Exporters','Wingtip Toys'
  ][i % 20] + (i >= 20 ? ` ${i - 19}` : ''),
  category: customerCategories[i % customerCategories.length],
  deliveryMethod: deliveryMethods[i % deliveryMethods.length],
  buyingGroup: i % 3 === 0 ? 'Tailspin Toys' : i % 3 === 1 ? 'Wingtip Toys' : 'Independent',
  primaryContact: ['Alicia Lewis','Roberto Hayes','María Wood','Daniel King'][i % 4],
  alternateContact: ['Samuel Price','Andrea Scott','Luis Green','Paula Young'][i % 4],
  billToCustomer: i % 2 === 0 ? `Cuenta principal #${100 + i}` : 'Mismo cliente',
  city: ['San José','Seattle','Chicago','New York','Portland'][i % 5],
  postalCode: `10${String(i).padStart(3,'0')}`,
  phone: `+1 425 555 ${String(1000 + i).slice(-4)}`,
  fax: `+1 425 556 ${String(1000 + i).slice(-4)}`,
  paymentDays: [7, 14, 30, 45][i % 4],
  website: `https://example.com/cliente-${i + 1}`,
  deliveryAddress: `${100 + i} Market Street, ${['San José','Seattle','Chicago','New York','Portland'][i % 5]}`,
  postalAddress: `PO Box ${500 + i}`,
  coordinates: `${(9.93 + (i % 5) * 0.01).toFixed(4)}, ${(-84.08 - (i % 5) * 0.01).toFixed(4)}`,
})).sort((a,b)=>a.name.localeCompare(b.name));

export const suppliers = Array.from({ length: 29 }, (_, i) => ({
  id: i + 1,
  reference: `SUP-${String(1001 + i)}`,
  name: ['A. Datum Parts','Adventure Goods','Contoso Packaging','Fabrikam Supply','Northwind Traders','Proseware Wholesale','Tailspin Distribution','Wide World Importers'][i % 8] + (i >= 8 ? ` ${Math.floor(i/8)+1}` : ''),
  category: supplierCategories[i % supplierCategories.length],
  deliveryMethod: deliveryMethods[i % deliveryMethods.length],
  primaryContact: ['Carlos Allen','Ana Baker','Sofía Carter','Marco Diaz'][i % 4],
  alternateContact: ['James Evans','Laura Foster','Irene Garcia','Peter Hill'][i % 4],
  city: ['Bellevue','Redmond','Seattle','Tacoma'][i % 4],
  postalCode: `98${String(100 + i).slice(-3)}`,
  phone: `+1 206 555 ${String(2000 + i).slice(-4)}`,
  fax: `+1 206 556 ${String(2000 + i).slice(-4)}`,
  website: `https://example.com/proveedor-${i + 1}`,
  deliveryAddress: `${20 + i} Industrial Ave, ${['Bellevue','Redmond','Seattle','Tacoma'][i % 4]}`,
  postalAddress: `PO Box ${800 + i}`,
  coordinates: `${(47.60 + (i % 4) * 0.02).toFixed(4)}, ${(-122.33 + (i % 4) * 0.02).toFixed(4)}`,
  bankName: ['Contoso Bank','North Bank','City Financial'][i % 3],
  bankAccount: `****${String(4100 + i)}`,
  paymentDays: [7,14,30][i % 3],
})).sort((a,b)=>a.name.localeCompare(b.name));

export const products = Array.from({ length: 38 }, (_, i) => ({
  id: i + 1,
  name: ['USB food flash drive','Black mug','Packing tape','Air cushion machine','Animal slippers','RC toy car','Cotton jacket','Laptop sleeve','Novelty umbrella','Cardboard box'][i % 10] + ` ${i + 1}`,
  group: productGroups[i % productGroups.length],
  holdings: 12 + ((i * 37) % 240),
  supplier: suppliers[i % suppliers.length].name,
  color: ['Black','White','Blue','Red','Green','Mixed'][i % 6],
  unitPackage: ['Each','Box','Bag'][i % 3],
  outerPackage: ['Carton','Pallet','Case'][i % 3],
  quantity: [1,6,12,24][i % 4],
  brand: ['WWI','Contoso','Fabrikam','Tailspin'][i % 4],
  size: ['S','M','L','XL'][i % 4],
  tax: [7.5, 10, 13][i % 3],
  unitPrice: (8.5 + i * 1.17).toFixed(2),
  retailPrice: (12.9 + i * 1.63).toFixed(2),
  weight: `${(0.2 + (i % 8) * 0.35).toFixed(2)} kg`,
  searchDetails: `producto ${i + 1}, ${productGroups[i % productGroups.length].toLowerCase()}, ${['popular','nuevo','básico'][i % 3]}`,
  location: `A-${1 + (i % 9)}-${1 + (i % 5)}`,
})).sort((a,b)=>a.name.localeCompare(b.name));

export const sales = Array.from({ length: 43 }, (_, i) => {
  const year = 2014 + (i % 3);
  const month = 1 + (i % 12);
  const day = 1 + (i % 25);
  const amount = 125 + ((i * 173) % 4700);
  const customer = clients[i % clients.length];
  return {
    id: i + 1,
    invoiceNumber: `INV-${year}-${String(1000 + i)}`,
    date: `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`,
    client: customer.name,
    clientId: customer.id,
    deliveryMethod: deliveryMethods[i % deliveryMethods.length],
    amount: Number(amount.toFixed(2)),
    orderNumber: `PO-${50000 + i}`,
    contact: customer.primaryContact,
    salesperson: ['Amanda Ross','Jeff Reed','Claudia Hall','Tom Adams'][i % 4],
    instructions: i % 2 ? 'Entregar en recepción.' : 'Llamar antes de entregar.',
    lines: [0,1,2].map((j) => {
      const product = products[(i + j) % products.length];
      const quantity = 1 + ((i + j) % 5);
      const unitPrice = Number(product.unitPrice);
      const taxRate = Number(product.tax);
      const subtotal = quantity * unitPrice;
      const taxAmount = subtotal * (taxRate / 100);
      return {
        product: product.name,
        productId: product.id,
        quantity,
        unitPrice,
        taxRate,
        taxAmount: Number(taxAmount.toFixed(2)),
        lineTotal: Number((subtotal + taxAmount).toFixed(2)),
      };
    }),
  };
}).sort((a,b)=>a.client.localeCompare(b.client));

export const validYears = [2014, 2015, 2016];

export const reportDefinitions = [
  { id: 1, title: 'Compras a proveedores', summary: 'Montos más altos, bajos y promedio agrupados por proveedor y categoría.', technique: 'ROLLUP', filters: ['supplier','supplierCategory'] },
  { id: 2, title: 'Ventas por cliente', summary: 'Montos más altos, bajos y promedio agrupados por cliente y categoría.', technique: 'ROLLUP', filters: ['client','clientCategory'] },
  { id: 3, title: 'Top 5 productos con mayor ganancia', summary: 'Productos que generan mayor ganancia en ventas por año.', technique: 'DENSE_RANK + PARTITION', filters: ['year'] },
  { id: 4, title: 'Top 5 clientes por facturación', summary: 'Clientes con mayor cantidad de facturas y monto total por año.', technique: 'DENSE_RANK + PARTITION', filters: ['yearFrom','yearTo'] },
  { id: 5, title: 'Top 5 proveedores por órdenes', summary: 'Proveedores con mayor cantidad de órdenes y monto total por año.', technique: 'DENSE_RANK + PARTITION', filters: ['yearFrom','yearTo'] },
  { id: 6, title: 'Matriz de ventas por categoría', summary: 'Resumen de ventas de categorías de productos por año.', technique: 'MATRIZ / PIVOT', filters: ['yearFrom','yearTo'] },
  { id: 7, title: 'Seguimiento de compras de clientes', summary: 'Resumen mensual con primera y última factura, total, mínimo y máximo.', technique: 'AGREGACIÓN', filters: ['year','month','productCategory','subcategory'] },
  { id: 8, title: 'Seguimiento de compras a proveedores', summary: 'Resumen mensual por proveedor con primera y última factura, total, mínimo y máximo.', technique: 'AGREGACIÓN', filters: ['year','month','productCategory','subcategory'] },
  { id: 9, title: 'Rotación promedio de inventario', summary: 'Promedio de días de rotación de inventario por producto.', technique: 'INVESTIGACIÓN', filters: ['productCategory','year','supplier'] },
  { id: 10, title: 'Método de envío favorito', summary: 'Método de envío preferido según el destino y cantidad de ventas.', technique: 'INVESTIGACIÓN', filters: ['year','month','clientCategory','productCategory','product'] },
];

export function buildReportRows(reportId) {
  const base = Array.from({length: 18}, (_,i)=>i+1);
  const maps = {
    1: base.map(i=>({id:i, proveedor:suppliers[i%suppliers.length].name, categoria:supplierCategories[i%supplierCategories.length], minimo:(120+i*6).toFixed(2), maximo:(800+i*31).toFixed(2), promedio:(410+i*14).toFixed(2)})),
    2: base.map(i=>({id:i, cliente:clients[i%clients.length].name, categoria:customerCategories[i%customerCategories.length], minimo:(95+i*7).toFixed(2), maximo:(950+i*27).toFixed(2), promedio:(480+i*11).toFixed(2)})),
    3: base.slice(0,15).map(i=>({id:i, posicion:((i-1)%5)+1, anio:validYears[(i-1)%3], producto:products[i%products.length].name, ganancia:(1200+i*257).toFixed(2)})),
    4: base.slice(0,15).map(i=>({id:i, posicion:((i-1)%5)+1, anio:validYears[(i-1)%3], cliente:clients[i%clients.length].name, facturas:10+i, total:(4200+i*530).toFixed(2)})),
    5: base.slice(0,15).map(i=>({id:i, posicion:((i-1)%5)+1, anio:validYears[(i-1)%3], proveedor:suppliers[i%suppliers.length].name, ordenes:7+i, total:(5100+i*610).toFixed(2)})),
    6: productGroups.map((g,i)=>({id:i+1,categoria:g, '2014':(12000+i*1400).toFixed(2),'2015':(14000+i*1600).toFixed(2),'2016':(15500+i*1750).toFixed(2)})),
    7: base.map(i=>({id:i, cliente:clients[i%clients.length].name, mes:`${validYears[i%3]}-${String((i%12)+1).padStart(2,'0')}`, primera:`0${(i%8)+1}/${String((i%12)+1).padStart(2,'0')}`, ultima:`2${(i%8)+1}/${String((i%12)+1).padStart(2,'0')}`, total:(1700+i*145).toFixed(2), minima:(20+i).toFixed(2), maxima:(330+i*11).toFixed(2)})),
    8: base.map(i=>({id:i, proveedor:suppliers[i%suppliers.length].name, mes:`${validYears[i%3]}-${String((i%12)+1).padStart(2,'0')}`, primera:`0${(i%8)+1}/${String((i%12)+1).padStart(2,'0')}`, ultima:`2${(i%8)+1}/${String((i%12)+1).padStart(2,'0')}`, total:(2100+i*170).toFixed(2), minima:(25+i).toFixed(2), maxima:(410+i*13).toFixed(2)})),
    9: base.map(i=>({id:i, producto:products[i%products.length].name, categoria:products[i%products.length].group, proveedor:products[i%products.length].supplier, dias:(14+(i*3)%72).toFixed(1)})),
    10: base.map(i=>({id:i, posicion:i, metodo:deliveryMethods[(i-1)%deliveryMethods.length], destino:['Seattle','Bellevue','Redmond','Tacoma'][i%4], ventas:180-i*4, porcentaje:`${(41-i*0.7).toFixed(1)}%`})),
  };
  return maps[reportId] || [];
}

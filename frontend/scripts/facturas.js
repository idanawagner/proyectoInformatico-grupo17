// Función para mostrar el formulario de búsqueda de facturas

function showSection( section){
    let newBill_container = document.getElementById('sec-generate-bill');
    let searchBills_container = document.getElementById('sec-search-bill');
    let billsList_container = document.getElementById('sec-billing-history');
    
    switch (section ) {
        case 'newBill':
            newBill_container.style.display = 'block';
            searchBills_container.style.display = 'none';
            billsList_container.style.display = 'none';
            break;
        case 'searchBill':
            newBill_container.style.display = 'none';
            searchBills_container.style.display = 'block';
            billsList_container.style.display = 'none';
            break;
        case 'billsList':
            newBill_container.style.display = 'none';
            searchBills_container.style.display = 'none';
            return billsList_container.style.display = 'block';
            break;
        default:
            newBill_container.style.display = 'block';
    }

}


// Función para generar una nueva factura

class Factura{
    constructor(fecha, id_cliente, id_usuario, detalle_factura, total)
    {
        this._fecha = fecha
        this._id_cliente =  id_cliente
        this._id_usuario = id_usuario
        this._detalle_factura = detalle_factura  // [{producto, cantidad, subtotal}]
        this._total = total
    }

    createFactura(){

    }
}
class Detalle{
    constructor(id_producto_servicio, cantidad, subtotal){
        this._id_producto_servicio = id_producto_servicio
        this._cantidad = cantidad
        this._subtotal = subtotal
    }
}

// {
//     "detalle_factura": [
//       {
//         "cantidad": 1,
//         "id_producto_servicio": 1,
//         "subtotal": 1200
//       }
//     ],
//     "fecha": "2022-12-08",
//     "id_cliente": 1,
//     "id_usuario": 1,
//     "total": 958633
//   }
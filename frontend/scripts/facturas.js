// Función para mostrar el formulario de búsqueda de facturas
async function showSection( section){
    let newBill_container = document.getElementById('sec-generate-bill');
    let searchBills_container = document.getElementById('sec-search-bill');
    
    switch (section ) {
        case 'newBill':
            newBill_container.style.display = 'block';
            searchBills_container.style.display = 'none';
            break;
        case 'searchBill':
            newBill_container.style.display = 'none';
            searchBills_container.style.display = 'block';
            await searchAllBills();

            break;
        default:
            newBill_container.style.display = 'block';
    }

}

const URL='http://127.0.0.1:5200';

// TRAER PRODUCTOS DESDE LA API
listaProductos=[];
listaServicios=[];
listaClientes=[];
function getProductosServicios(){
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    const requestOptions = {
        method : 'GET',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': id
            }
    }

    return fetch(URL + `/user/${id}/historial_productos_servicios`, requestOptions)
    .then(response => response.json())
    .then(data => {
        if (data) {
            data.filter(element => {
                element.categoria == 'Producto' ? listaProductos.push(element) : listaServicios.push(element) ;
            });
        }
    })
}

function getClientes(){
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    const requestOptions = {
        method : 'GET',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': id
            }
    }

    return fetch(URL + `/user/${id}/historial_clientes`, requestOptions)
    .then(response => response.json())
    .then(async data => {
        if (data) {
            listaClientes = data;
            await cargarClientes();
        }
    })
}

let selectProducto = document.getElementById('new-product-select');
let selectClientes = document.getElementById('select-clientes');

function cargarClientes(){

    if (listaClientes.length !== 0) {
        
        listaClientes.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id ;
            option.innerHTML = element.nombre + ' ' + element.apellido + ' CUIT: ' + element.cuit_cuil;
            selectClientes.appendChild(option);
        })
    }
}
function cargarProductos(tipo) {
  document.getElementById('new-product-select').innerHTML = '';
  if (tipo == 'Producto') {
       listaProductos.forEach(element => {
        let option = document.createElement('option');
        option.value = element.id;
        option.innerHTML = element.nombre;
        selectProducto.appendChild(option);
        })
    } else {
        listaServicios.forEach(element => {
            let option = document.createElement('option');
            option.value = element.id;
            option.innerHTML = element.nombre;
            selectProducto.appendChild(option);
            
        }
        )
    }
    document.getElementById('new-product-select').value = '';
}



let detalleFactura = []; 
let descripcionDetalle = {}

let precioUnitario = document.getElementById('new-detalle-precio');

selectProducto.addEventListener('change', () => {
    let idProducto = selectProducto.value;

    let detalleProducto = listaProductos.find(element => element.id == idProducto) || listaServicios.find(element => element.id == idProducto);
    precioUnitario.value = detalleProducto.precio;
    descripcionDetalle.id_producto_servicio =  detalleProducto.id;
    
})

let cantidad = document.getElementById('new-detalle-cantidad');
cantidad.addEventListener('change', () => {
    let precioUnitario = document.getElementById('new-detalle-precio').value;
    cantidadProducto = cantidad.value;
    let subtotal = cantidadProducto * precioUnitario;
    let subtotalInput = document.getElementById('new-detalle-subtotal');
    subtotalInput.value = subtotal;
    descripcionDetalle.cantidad = parseInt(cantidad.value);
    descripcionDetalle.subtotal = subtotal;
});



function agregarDetalle() {

    let nombre = document.getElementById('new-product-select').options[selectProducto.selectedIndex].text;
    let tbody = document.getElementById('detalle-body');
    let cantidad = document.getElementById('new-detalle-cantidad').value;
    let precioUnitario = document.getElementById('new-detalle-precio').value;
    let subtotal = document.getElementById('new-detalle-subtotal').value; 
    
    tbody.innerHTML += `
        <tr class="body-row" scope="row">
            <td class=""> ${nombre} </td>
            <td class=""> ${precioUnitario}</td>
            <td class=""> ${cantidad} </td>
            <td class=""> ${subtotal}</td>
        </tr>
        `
    detalleFactura.push(descripcionDetalle);
    let total = detalleFactura.map(element => element.subtotal).reduce((acc, curr) => acc + curr,0);
    document.getElementById('total').value =total;    
    
    descripcionDetalle = {};
    document.getElementById('new-detalle-cantidad').value = '';
    document.getElementById('new-detalle-precio').value = '';
    document.getElementById('new-detalle-subtotal').value = '';
    document.getElementById('new-product-select').value = '';
}


function enviarFactura(){

    let fecha = document.getElementById('bill-date').value;
    let idCliente = document.getElementById('select-clientes').value;
    let idUsuario = localStorage.getItem('id');
    let total = document.getElementById('total').value;
    let factura = {
        fecha: fecha,
        id_cliente: idCliente,
        id_usuario: idUsuario,
        total: total,
        detalle_factura: detalleFactura
    }

    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    const requestOptions = {
        method : 'POST',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': id
            },
        body: JSON.stringify(factura)
    }
    

    fetch(URL + `/user/${id}/factura`, requestOptions)
    .then(response => response.json())
    .then(data => {
        if (data) {
            Swal.fire({
                title: data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'
                })
        }else{
            Swal.fire({
                title: data.message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
                })
        }
    })
    .catch(error => {
        console.log('error', error)
        Swal.fire({
            title: 'Error al cargar la factura',
            text: error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
    })
    factura = {};
    detalleFactura = [];
    document.getElementById('detalle-body').innerHTML = '';
    document.getElementById('select-clientes').value = '';
    document.getElementById('total').value = '';
}

// BUSCAR FACTURAS
let listaFacturas

function searchAllBills(){
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    const requestOptions = {
        method : 'GET',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': id
            }
    }

    fetch(URL + `/user/${id}/facturas`, requestOptions)
    .then(response => response.json())
    .then(data => {
        if (data) {
            listaFacturas = data;
            renderTable(listaFacturas);
        }
    })
}

async function renderTable(facturas){
    await getClientes();
    await getProductosServicios();
    let tbody = document.getElementById('tbody-buscar-facturas');
    tbody.innerHTML = '';
    facturas.forEach((element) => {
        // Ajustamos la fecha para que se muestre en el formato dd/mm/aaaa
        let fecha = new Date(element.fecha);
        let diaUTC = ('0' + fecha.getUTCDate()).slice(-2);
        let mesUTC = ('0' + (fecha.getUTCMonth() + 1)).slice(-2);
        let anioUTC = fecha.getUTCFullYear();

        let fechaFormateada = diaUTC + '/' + mesUTC + '/' + anioUTC;
        
        let cliente = listaClientes.find(cliente => cliente.id === element.id_cliente);

        let productosServicio;
        let detallesProductos = [];

        detailBill = element.detalle_factura;

        detailBill.forEach(detalle => {
            listaProductos.find(producto => producto.id == detalle.id_producto_servicio) ? detallesProductos.push(listaProductos.find(producto => producto.id == detalle.id_producto_servicio)) : detallesProductos.push(listaServicios.find(producto => producto.id == detalle.id_producto_servicio))
        })
        productosServicio = detallesProductos.map(element => element.nombre + ' x ' + detailBill.find(detalle => detalle.id_producto_servicio == element.id).cantidad).join(', ');

     
        tbody.innerHTML += `
        <tr class="body-row" scope="row">
            <td class=""> ${element.id} </td>
            <td class=""> ${fechaFormateada} </td>
            <td> ${cliente.nombre + ' ' + cliente.apellido} </td>
            <td class="columnNoneMobile"> ${cliente.cuit_cuil} </td>
            <td class="columnNoneMobile"> ${productosServicio} </td>
            <td class="columnNoneMobile"> ${element.total} </td>
            <td class="columnMas columnNoneDesktop"> 
                <button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showBill(${element.id})">
                    <i class="fas fa-plus"></i>
                </button>
            </td>

        </tr>`
        productosServicio = '';
    });


}

// BUSCAR POR
let searchBtn = document.getElementById('btn-submit-search');

searchBtn.addEventListener('click', () => {
    let selectSearch = document.getElementById('bill-search-selector');
    let option = selectSearch.value;
    let inputSearch = document.getElementById('bill-search-input').value;
    switch (inputSearch) {
        case '':
            renderTable(listaFacturas);
            break;
        default:

        switch (option) {
            case 'numero-factura':
                let facturasNro = listaFacturas.filter(element => element.id == inputSearch);
                renderTable(facturasNro);
                break;
            case 'cuit-cuil':
                inputSearch = parseInt(inputSearch);
                let cliente = listaClientes.filter( cliente => cliente.cuit_cuil === inputSearch)
                let facturasClientes = listaFacturas.filter(element => element.id_cliente == cliente[0].id);
                listaClientes.length !== 0 ? renderTable(facturasClientes) : renderTable(listaFacturas);
                renderTable(facturasClientes);
                break;
            default:
                renderTable(listaFacturas);
                break;
        }
    }
})


// MOSTRAR DETALLE DE FACTURA
function showBill(idFactura){
   let factura = listaFacturas.find(element => element.id == idFactura);
    let cliente = listaClientes.find(cliente => cliente.id === factura.id_cliente);
    let detalleFactura = factura.detalle_factura;
    let detalleProductos = [];
    detalleFactura.forEach(detalle => {
        listaProductos.find(producto => producto.id == detalle.id_producto_servicio) ? detalleProductos.push(listaProductos.find(producto => producto.id == detalle.id_producto_servicio)) : detalleProductos.push(listaServicios.find(producto => producto.id == detalle.id_producto_servicio))
    })
    let productosServicio = detalleProductos.map(element => element.nombre + ' x ' + detalleFactura.find(detalle => detalle.id_producto_servicio == element.id).cantidad).join(', ');
    let fecha = new Date(factura.fecha);
    let diaUTC = ('0' + fecha.getUTCDate()).slice(-2);
    let mesUTC = ('0' + (fecha.getUTCMonth() + 1)).slice(-2);
    let anioUTC = fecha.getUTCFullYear();

    let fechaFormateada = diaUTC + '/' + mesUTC + '/' + anioUTC;
    document.getElementById('bill-number-detail').innerHTML = factura.id;
    document.getElementById('bill-date-detail').innerHTML = fechaFormateada;
    document.getElementById('bill-client-detail').innerHTML = cliente.nombre + ' ' + cliente.apellido;
    document.getElementById('bill-cuit-detail').innerHTML = cliente.cuit_cuil;
    document.getElementById('bill-products-detail').innerHTML = productosServicio;
    document.getElementById('bill-total-detail').innerHTML = factura.total;


    

}


// Al cargar la pagina traemos los productos y servicios desde la API y los cargamos en el select de productos, al igual que los clientes en el select de clientes, ademas seteamos la fecha del dia en el input de fecha de factura y vaciamos los select de productos y clientes para que no queden seleccionados por defecto
window.addEventListener('load',async () => {
    await getProductosServicios();
    await getClientes();
    cargarProductos('Producto');
    document.getElementById('bill-date').value = new Date().toISOString().slice(0,10);
    document.getElementById('select-clientes').value = '';
    document.getElementById('new-product-select').value = '';
    
    
});



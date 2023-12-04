
const URL='http://127.0.0.1:5200';
    
async function showSection(section){
    let upload_container = document.getElementById('section-upload');
    let search_container = document.getElementById('section-search');
    switch (section ) {
        case 'upload':
            upload_container.style.display = 'block';
            search_container.style.display = 'none';
            break;
        case 'search':
            upload_container.style.display = 'none';
            search_container.style.display = 'block';
            await searchAllStock(); 
            buscado.push(...stockList)
            renderTable();
            break;
        default:
            search_container.style.display = 'block';
    }

}


// SEARCH STOCK
let stockList = []
let buscado = [];

function searchAllStock(){
    // Se traen el token y el id del usuario logueado desde el localStorage
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    // Se crea el objeto requestOptions con los datos necesarios para el fetch
    const requestOptions = {
        method : 'GET',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': id
            }
    }
    // Se hace el fetch con la url y el requestOptions
   return fetch(URL + `/user/${id}/productos_servicios`, requestOptions)
    .then(response => response.json())
    .then(data => {
            stockList = data;
        })

}

// BUSCAR CLIENTE
// Se trae el boton submit por el id y se le agrega un event listener
let buttonSearchStock = document.getElementById('btn-prod-search');

buttonSearchStock.addEventListener('click',  ( ) => {
        searchStockbyInput();
        renderTable();
    }
)


function searchStockbyInput(){
    let inputSearch = document.getElementById('input-prod-search').value;
    let selectOption = document.getElementById('search-select-prod').value;
    switch (inputSearch) { 
        case (''):
            buscado.push(...stockList)
            break;
        case (inputSearch):
            switch (selectOption) {
                case ('Nombre'):
                    stockList.forEach(element => {
                        element.nombre.toLowerCase() === inputSearch.toLowerCase() ? buscado.push(element) : null;
                    })
                    break;
                case ('Stock'):
                    stockList.forEach(element => {
                        inputSearch = parseInt(inputSearch);
                        element.stock === inputSearch ? buscado.push(element) : null;
                        
                    })
                    break;
                default:
                    buscado.push(...stockList)
                    break;
            }
        break;
    }

    // Guarda el resultado de la busqueda en el array archivado para poder filtrarlo si es necesario
    archivado = []
    archivado.push(...buscado);


    // Si no encuentra el cliente buscado, muestra un alert
    if (buscado.length === 0){     
        Swal.fire({
            title: 'No se encontró el producto o servicio buscado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
        buscado.push(...stockList)
    }

    // Vacia el input de busqueda
    document.getElementById('input-prod-search').value = '';
}

// Filtrar por categoria
let archivado = []
let containerFiltros = document.getElementById('filtros');

containerFiltros.addEventListener('click', () => {
    buscado.push(...filtros());
    renderTable();
})


function filtros(){
    let radioTodos = document.getElementById('vbtn-radio1').checked;
    let radioProductos = document.getElementById('vbtn-radio2').checked;
    let radioServicios = document.getElementById('vbtn-radio3').checked;
    let borrarFiltros = document.getElementById('vbtn-radio4').checked;
    let filtrado = [];
    archivado.length === 0 ? archivado.push(...stockList) : null;
    switch (true) {
        case (radioTodos):
            filtrado.push(...archivado)
            break;
        case (radioProductos):
            filtrado.push(...archivado.filter(element => element.categoria === 'Producto'));
            break;
        case (radioServicios):
            filtrado.push(...archivado.filter(element => element.categoria === 'Servicio'));
            break;
        case (borrarFiltros):
            filtrado.push(...stockList)
            document.getElementById('vbtn-radio4').checked = false;
            break;
        default:
            filtrado.push(...stockList)
            break;
    }
    return filtrado;

}

function renderTable(){
    let tbody = document.getElementById('tbody-productos-servicios');
    tbody.innerHTML = '';
    buscado.forEach((element) => {
        tbody.innerHTML += `
        <tr class="body-row" scope="row">
            <td> ${element.categoria} </td>
            <td> ${element.nombre} </td>
            <td class="columnNoneMobile"> ${element.stock} </td>
            <td> ${element.precio} </td>
            <td class="columnNoneMobile"> ${element.descripcion} </td>
            <td class=""> 
                <button class="btn" data-bs-toggle="modal" data-bs-target="#editar" onclick="editarProducto(${element.id})">
                    <i class="fa-solid fa-pencil"></i>
                </button>
            </td>
            <td class=""> 
                <button class="btn" onclick="cambiarEstado(${element.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            <td class="columnMas columnNoneDesktop"> 
                <button class="btn" data-bs-toggle="modal" data-bs-target="#verMas" onclick="showProducto(${element.id})">
                    <i class="fas fa-plus"></i>
                </button>
            </td>
        </tr>`
    });
    buscado = [];


}

// CARGAR PRODUCTO O SERVICIO

let buttonUploadStock = document.getElementById('submit-upload-stock');

buttonUploadStock.addEventListener('click', () => {
    let selectCategoria = document.getElementById('select-categoria').value;
    let inputCantidad= document.getElementById('input-cantidad').value;
    let inputNombre = document.getElementById('input-nombre').value;
    let inputPrecio = document.getElementById('input-precio').value;
    let inputDescripcion = document.getElementById('input-descripcion').value;

    let productoServicio = {
        categoria: selectCategoria,
        nombre: inputNombre,
        stock: parseInt(inputCantidad),
        precio: parseInt(inputPrecio),
        descripcion: inputDescripcion,
        estado: true
    }
    uploadStock(productoServicio);
})


function uploadStock(productoServicio){
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    const requestOptions = {
        method : 'POST',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': id
            },
        body: JSON.stringify(productoServicio)
    }
    fetch(URL + `/user/${id}/producto_servicio`, requestOptions)
    .then(response => response.json())
    .then(data => {
        if (data.id_usuario ){
            Swal.fire({
                title: 'Stock cargado exitosamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
                
            })
        }
    })
    .catch(error => {
        console.log('error', error)
        Swal.fire({
            title: 'No se pudo crear el producto o servicio',
            text: error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })  
    })
}


// EDITAR PRODUCTO O SERVICIO
let producto = {};
function editarProducto(id){
    producto = stockList.find(element => element.id === id);
    console.log(producto.stock);
    document.getElementById('select-categoria-edit').value = producto.categoria;
    document.getElementById('input-stock-edit').value = producto.stock;
    document.getElementById('input-nombre-edit').value = producto.nombre;
    document.getElementById('input-precio-edit').value = producto.precio;
    document.getElementById('input-descripcion-edit').value = producto.descripcion;
    
    return producto;
}

let buttonEditStock = document.getElementById('submit-edit-stock');
buttonEditStock.addEventListener('click', () => {
    let selectCategoria = document.getElementById('select-categoria-edit').value;
    let inputStock= document.getElementById('input-stock-edit').value;
    let inputNombre = document.getElementById('input-nombre-edit').value;
    let inputPrecio = document.getElementById('input-precio-edit').value;
    let inputDescripcion = document.getElementById('input-descripcion-edit').value;
    let id = producto.id;
    let productoServicio = {
        categoria: selectCategoria,
        nombre: inputNombre,
        stock: parseInt(inputStock),
        precio: parseInt(inputPrecio),
        descripcion: inputDescripcion,
        estado: true
    }
    editStock(productoServicio, id);
    producto = {};
})

function editStock(productoServicio, id){
    let token = localStorage.getItem('token');
    let idUsuario = localStorage.getItem('id');

    const requestOptions = {
        method : 'PUT',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': idUsuario
            },
        body: JSON.stringify(productoServicio)
    }
    fetch(URL + `/user/${idUsuario}/producto_servicio/${id}`, requestOptions)
    .then(response => response.json())
    .then(async data => {
        if (data ){
            Swal.fire({
                title: 'Stock editado exitosamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
                
            })
            let modal = document.getElementById('editar');
            let modalBackdrop = document.querySelector('.modal-backdrop');
            if (modal) {
                modal.classList.remove('show');
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                document.body.style.paddingRight = '0';
                modal.setAttribute('aria-hidden', 'true');
                modalBackdrop.remove();
            }
            await searchAllStock(); 
            buscado.push(...stockList)
            renderTable();
        }
    })
    .catch(error => {
        console.log('error', error)
        Swal.fire({
            title: 'No se pudo editar el producto o servicio',
            text: error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })  
    })

}



function cambiarEstado(id){
    Swal.fire({
        title: '¿Está seguro que desea eliminar el producto o servicio?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
        }).then((result) => {
        if (result.isConfirmed) {
            deleteStock(id);
        }
    })
}

function deleteStock(id){
    let token = localStorage.getItem('token');
    let idUsuario = localStorage.getItem('id');

    const requestOptions = {
        method : 'PATCH',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': idUsuario
            }
    }
    fetch(URL + `/user/${idUsuario}/producto_servicio/${id}`, requestOptions)
    .then(response => response.json())
    .then(async data => {
        if (data ){
            Swal.fire({
                title: 'Producto o servicio eliminado exitosamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
                
            })
            await searchAllStock(); 
            buscado.push(...stockList)
            renderTable();
        }
    })
    .catch(error => {
        console.log('error', error)
        Swal.fire({
            title: 'No se pudo eliminar el producto o servicio',
            text: error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        })  
    })
}

function showProducto(id){
    producto = stockList.find(element => element.id === id);
    document.getElementById('verMas-categoria').innerHTML = producto.categoria;
    document.getElementById('verMas-nombre').innerHTML = producto.nombre;
    document.getElementById('verMas-stock').innerHTML = producto.stock;
    document.getElementById('verMas-precio').innerHTML = producto.precio;
    document.getElementById('verMas-descripcion').innerHTML = producto.descripcion;
    


}


// Al cargar la pagina se ejecuta la funcion searchAllClients para traer todos los productos y servicios de la base de datos
window.addEventListener('load', async () => {
    await searchAllStock(); 
    buscado.push(...stockList)
    renderTable();
    
});
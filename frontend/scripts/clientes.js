
const URL='http://127.0.0.1:5200';
    
// CARGAR NUEVO CLIENTE
// Se trae el boton submit por el id y se le agrega un event listener
let buttonCreateClient = document.getElementById('btn-add-nw-cli');

buttonCreateClient.addEventListener('click', ()=>{
    // Se traen los valores de los inputs
    let inputNombre = document.getElementById('nw-cli-name').value;
    let inputApellido = document.getElementById('nw-cli-lastname').value;
    let inputEmail = document.getElementById('nw-cli-email').value;
    let inputCuit = parseInt(document.getElementById('nw-cli-CUIT').value);
    let inputTelefono =parseInt(document.getElementById('nw-cli-phone').value);
    let inputDireccion = document.getElementById('nw-cli-address').value;
    let estado = true;
    
    // Se crea el objeto cliente con los datos de los inputs
    let cliente = {
        nombre: inputNombre,
        apellido: inputApellido,
        email: inputEmail,
        cuit_cuil: inputCuit,
        telefono: inputTelefono,
        direccion: inputDireccion,
        estado: estado
    };

    // Se llama a la funcion createClient con el objeto cliente
    createClient(cliente);
})

function createClient(cliente){
    // Se traen el token y el id del usuario logueado desde el localStorage
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    // Se crea el objeto requestOptions con los datos necesarios para el fetch
    const requestOptions = {
        method : 'POST',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': id
            },
        body: JSON.stringify({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            email: cliente.email,
            cuit_cuil: cliente.cuit_cuil,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            estado: cliente.estado
        })
    }
    // Se hace el fetch con la url y el requestOptions
    fetch(URL + `/user/${id}/cliente`, requestOptions)
    .then(response => response.json())
    .then(data => {
        if (data.id) {

            Swal.fire({
                title: data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            })
        }
        // Vacia los inputs
        document.getElementById('nw-cli-name').value = '';
        document.getElementById('nw-cli-lastname').value = '';
        document.getElementById('nw-cli-email').value = '';
        document.getElementById('nw-cli-CUIT').value = '';
        document.getElementById('nw-cli-phone').value = '';
        document.getElementById('nw-cli-address').value = '';
    
    })
}


// SEARCH TODOS LOS CLIENTES
let clientsList = []
let buscado = [];

function searchAllClients(){
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
   return fetch(URL + `/user/${id}/clientes`, requestOptions)
    .then(response => response.json())
    .then(data => {
            clientsList = data;
        })

}

async function showSection(section){
    let uploadClient_container = document.getElementById('sec-load-cli');
    let searchClient_container = document.getElementById('sec-search-client');
    
    switch (section ) {
        case 'uploadClient':
            uploadClient_container.style.display = 'block';
            searchClient_container.style.display = 'none';
            break;
        case 'searchClient':
            uploadClient_container.style.display = 'none';
            searchClient_container.style.display = 'block';
            await searchAllClients(); 
            buscado.push(...clientsList)
            renderTable();
            
            break;
        default:
            uploadClient_container.style.display = 'block';
    }

}



// BUSCAR CLIENTE
// Se trae el boton submit por el id y se le agrega un event listener
let buttonSearchClient = document.getElementById('btn-cli-srch');

buttonSearchClient.addEventListener('click', () =>{
    searchClientbyInput()
    renderTable(); 
})

function searchClientbyInput(){
    let inputSearch = document.getElementById('cli-srch-bar').value;
    let selectOption = document.getElementById('cli-srch-selector').value;
    switch (inputSearch) { 
        case (''):
            buscado.push(...clientsList)
            break;
        case (inputSearch):
            switch (selectOption) {
                case ('Cuit/Cuil'):
                    inputSearch = parseInt(inputSearch);
                    clientsList.forEach(element => {
                        if (element.cuit_cuil === inputSearch){
                            buscado.push(element);
                        }}
                    )
                    break;
                case ('Nombre'):
                    clientsList.forEach(element => {
                        if (element.nombre.toLowerCase() === inputSearch.toLowerCase()){
                            buscado.push(element);
                        }
                    })
                    break;
                default:
                    buscado.push(...clientsList)
                    break;
            }
        break;
    }
    // Si no encuentra el cliente buscado, muestra un alert
    if (buscado.length === 0){     
        Swal.fire({
            title: 'Cliente no registrado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
            })
        buscado.push(...clientsList)
    }
    // Vacia el input de busqueda
    document.getElementById('cli-srch-bar').value = '';
}

function renderTable(){
    let tbody = document.getElementById('tbody-clients');
    tbody.innerHTML = '';
    buscado.forEach((element, index) => {
        tbody.innerHTML += `
        <tr class="body-row" scope="row">
            <td class=""> ${element.nombre} </td>
            <td class=""> ${element.apellido} </td>
            <td class=""> ${element.cuit_cuil}</td>
            <td class=""> ${element.direccion}</td>
            <td class=""> ${element.email} </td>
            <td class=""> ${element.telefono}</td>
            <td class=""> 
            <button class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editarCliente(${element.id})">
                <i class="fa-solid fa-pencil"></i>
                </button>
                </td>
            <td class=""> 
                <button class="btn" onclick="cambiarEstado(${element.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
        `
    });
    buscado = [];


}

// CAMBIAR ESTADO

function editarCliente(id){
  
    let cliente = clientsList.find(element =>  element.id === id )

    document.getElementById('editar-nombre').value = cliente.nombre;
    document.getElementById('editar-apellido').value = cliente.apellido;
    document.getElementById('editar-cuit').value = cliente.cuit_cuil;
    document.getElementById('editar-email').value = cliente.email;
    document.getElementById('editar-direccion').value = cliente.direccion;
    document.getElementById('editar-telefono').value = cliente.telefono;

    let buttonEditClient = document.getElementById('submit-editar');
    buttonEditClient.addEventListener('click', ()=>{
        let inputNombre = document.getElementById('editar-nombre').value;
        let inputApellido = document.getElementById('editar-apellido').value;
        let inputCuit = parseInt(document.getElementById('editar-cuit').value);
        let inputEmail = document.getElementById('editar-email').value;
        let inputDireccion = document.getElementById('editar-direccion').value;
        let inputTelefono = parseInt(document.getElementById('editar-telefono').value);
        let estado = true;
        cliente.nombre = inputNombre;
        cliente.apellido = inputApellido;
        cliente.cuit_cuil = inputCuit;
        cliente.email = inputEmail;
        cliente.direccion = inputDireccion;
        cliente.telefono = inputTelefono;
        cliente.estado = estado;
        updateClient(cliente);
    })
}

function updateClient(cliente){
    // Se traen el token y el id del usuario logueado desde el localStorage
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    // Se crea el objeto requestOptions con los datos necesarios para el fetch
    const requestOptions = {
        method : 'PUT',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': id
            },
        body: JSON.stringify({
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            email: cliente.email,
            cuit_cuil: cliente.cuit_cuil,
            telefono: cliente.telefono,
            direccion: cliente.direccion,
            estado: cliente.estado
        })
    }
    // Se hace el fetch con la url y el requestOptions
    fetch(URL + `/user/${id}/cliente/${cliente.id}`, requestOptions)
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            title: data.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
            })
        let modal = document.getElementById('exampleModal');
        let modalBackdrop = document.querySelector('.modal-backdrop');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.body.style.paddingRight = '0';
            modal.setAttribute('aria-hidden', 'true');
            modalBackdrop.remove();
        }
    })
}

// CAMBIAR ESTADO A INACTIVO

function cambiarEstado(id){
    let clienteAeliminar = clientsList.find(element =>  element.id === id )
    clienteAeliminar.estado = false;
    // Se traen el token y el id del usuario logueado desde el localStorage
    let token = localStorage.getItem('token');
    let idUser = localStorage.getItem('id');
    const requestOptions = {
        method: 'PATCH',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': idUser
            },
        body: JSON.stringify({
            estado: clienteAeliminar.estado
        })

    }

    fetch(URL + `/user/${idUser}/cliente/${id}`, requestOptions)
    .then(response => response.json())
    .then(async data => {
        Swal.fire({
            title: data.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
            })
            await searchAllClients(); 
            buscado.push(...clientsList)
            renderTable();
            
    })
    .catch(error => console.log(error))
}

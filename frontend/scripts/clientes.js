function showSection(section){
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
            break;
        default:
            uploadClient_container.style.display = 'block';
    }

}

const URL='http://127.0.0.1:5200';

class Cliente{
    constructor(nombre, apellido, email, cuit_cuil, telefono, direccion, estado){
        this._nombre = nombre,
        this._apellido = apellido,
        this._email = email,
        this._cuit_cuil = cuit_cuil,
        this._telefono = telefono,
        this._direccion = direccion,
        this._estado = estado
       }   

    createClient(){
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
                nombre: this._nombre,
                apellido: this._apellido,
                email: this._email,
                cuit_cuil: this._cuit_cuil,
                telefono: this._telefono,
                direccion: this._direccion,
                estado: this._estado
            })
        }
        // Se hace el fetch con la url y el requestOptions
        fetch(URL + `/user/${id}/cliente`, requestOptions)
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
    }

}

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
    clientsList = []
    fetch(URL + `/user/${id}/clientes`, requestOptions)
    .then(response => response.json())
    .then((data) => {
        data.map((client) => {
            let cliente = new Cliente(client.nombre, client.apellido, client.email, client.cuit_cuil, client.telefono, client.direccion, client.estado)
            clientsList.push(cliente);
        })
    })
    return clientsList;
}


// CARGAR NUEVO CLIENTE

// Se traen el boton submit y se le agrega un event listener
let buttonCreateClient = document.getElementById('btn-add-nw-cli');

buttonCreateClient.addEventListener('click', function(){
    // Se traen los valores de los inputs
    let inputNombre = document.getElementById('nw-cli-name').value;
    let inputApellido = document.getElementById('nw-cli-lastname').value;
    let inputEmail = document.getElementById('nw-cli-email').value;
    let inputCuit = parseInt(document.getElementById('nw-cli-CUIT').value);
    let inputTelefono =parseInt(document.getElementById('nw-cli-phone').value);
    let inputDireccion = document.getElementById('nw-cli-address').value;
    let estado = true;
    
    // Se crea el objeto cliente
    let client = new Client(inputNombre, inputApellido, inputEmail, inputCuit, inputTelefono, inputDireccion, estado);

    // Se llama al metodo createClient del objeto cliente
    client.createClient();
})


// BUSCAR CLIENTE

// Se traen el boton submit y se le agrega un event listener

let buttonSearchClient = document.getElementById('btn-cli-srch');

buttonSearchClient.addEventListener('click', function(){
    let selectOption = document.getElementById('cli-srch-selector').value;
    // console.log( selectOption);

    let inputSearch = document.getElementById('cli-srch-bar').value;
    let clientsList = searchAllClients();
    console.log(typeof clientsList);
    const array = Object.keys(clientsList).map(key => [key, clientsList[key]]);
    console.log(array);
    // console.log(typeof clientsList);
    // buscado = clientsList.filter((client) => client[0]._cuit_cuil === inputSearch)
    // console.log(buscado);
    // switch (selectOption) {
    //     case 'Cuit/Cuil':
    //         parseInt(inputSearch);
    //         // console.log(inputSearch);
    //         // clientsList.filter((client) => client.cuit_cuil === inputSearch);            
    //         console.log(clientsList);
    //         // console.log(buscado);
    //         break;
    //         case 'Nombre':
    //         console.log('nombre');
    //         break;
    //     default:
    //         console.log('default');
    // }
    

})


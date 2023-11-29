

const URL = 'http://127.0.0.1:5200';



function datosUsuario(){
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
   return fetch(URL + `/user/${id}`, requestOptions)
    .then(response => response.json())
    .then(userData => {
        let username = userData.username;
        let razon_social = userData.razon_social;
        let cuit_cuil = userData.cuit_cuil;
        })

}







console.log(datosUsuario());




// Obtenemos los datos desde la ruta /user

function updatePassword(new_password) {
    let token = localStorage.getItem('token');
    let id = localStorage.getItem('id');

    const requestOptions = {
        method : 'PATCH',
        headers: {'Content-Type':'application/json',
                'x-access-token': token,
                'user-id': id
            },

        body: JSON.stringify({ 
            password: new_password
        })
    }
        
    fetch(URL + `/user/${id}/updatePassword`, requestOptions)
    .then(response => response.json())
    .then(data => {
        Swal.fire({
            title: data.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
            })
        document.getElementById('current-pass').value = '';
        document.getElementById('new-pass').value = '';
        document.getElementById('pass-confirm').value = '';
    })

};


// Agregar un evento al botón después de obtener el cuit_cuil
document.getElementById("btn-change-user-data").addEventListener("click", function() {
    // Obtener datos del formulario
    let currentPass = document.getElementById("current-pass").value;
    let newPass = document.getElementById("new-pass").value;
    let passConfirm = document.getElementById("pass-confirm").value;

    if ((currentPass !== newPass) && (newPass === passConfirm)) {
        // Realizar solicitud POST a la ruta /update
        updatePassword(newPass)
    } else {
        var errorMessage = "Error en la validación de datos. ";

        if (currentPass === newPass) {
            errorMessage += "La nueva contraseña debe ser diferente a la contraseña actual. ";
        }
    
        if (newPass !== passConfirm) {
            errorMessage += "La nueva contraseña y la confirmación de la contraseña no coinciden. ";
        }
    
        alert(errorMessage);
    }
});


function updatePassword(new_password, cuit_cuil) {
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            password: new_password,
            cuit_cuil: cuit_cuil
        })
    };
}

const URL = 'http://127.0.0.1:5200';

// Obtenemos los datos desde la ruta /user
fetch(URL + '/usuario')
    .then(response => response.json())
    .then(userData => {
        const username = userData.username;
        const razon_social = userData.razon_social;
        const cuit_cuil = userData.cuit_cuil;

        document.getElementById("user-name").textContent = username;
        document.getElementById("razon-social").value = razon_social;
        document.getElementById("CUIT").value = cuit_cuil;

        // Agregar un evento al botón después de obtener el cuit_cuil
        document.getElementById("btn-change-user-data").addEventListener("click", function() {
            // Obtener datos del formulario
            var currentPass = document.getElementById("current-pass").value;
            var newPass = document.getElementById("new-pass").value;
            var passConfirm = document.getElementById("pass-confirm").value;

            if ((currentPass !== newPass) && (newPass === passConfirm)) {
                // Realizar solicitud POST a la ruta /update
                fetch(URL + '/security', updatePassword(newPass, cuit_cuil))
                    .then(response => response.text())
                    .then(data => {
                        alert(data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
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
    })
    .catch(error => {
        console.error('Error al intentar obtener datos: ', error);
    });

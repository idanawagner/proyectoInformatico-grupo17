function mostrarFormulario(tipo) {
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');

    if (tipo === 'login') {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    } else if (tipo === 'registro') {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    }
}

function mostrarPago(){
    const pago_container = document.querySelector('.pago_container');
    pago_container.style.display = 'block';
    console.log('hola');
}

function Registro() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const usuario = {
        nombre,
        apellido,
        email,
        password
    };

    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarFormulario('login');
        });
}

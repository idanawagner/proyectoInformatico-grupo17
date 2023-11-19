function mostrarFormulario(tipo) {
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');
    if (tipo === 'login') {
        loginContainer.style.display = 'flex';
        registerContainer.style.display = 'none';
    } else if (tipo === 'registro') {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'flex';
    }
}

function mostrarPago(){
    const pago_container = document.querySelector('.pago_container');
    pago_container.style.display = 'flex';
}

window.onload = function(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
}

const URL='http://127.0.0.1:5200';
class Usuario{
    constructor(username, password, razon_social, cuit, estado){
        this.username = username
        this.password = password
        this.razon_social = razon_social
        this.cuit = cuit
        this.estado = estado
    }

    login(){  
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(this.username + ":" + this.password)
            },
        };

        fetch(URL + '/login', requestOptions)
          .then(response => response.json())
          .then(data => {
                if(data.token){
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('username', data.username)
                    localStorage.setItem('id', data.id)
                    window.location.href = 'home.html'
                }else{
                    document.getElementById('errorLogin').innerHTML = 'Usuario o contraseña incorrectos'
                }
          })
          .catch(error => {
              console.error('Error al realizar la solicitud:', error);
          });
    }

    register(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                username: this.username,
                password: this.password,
                razon_social: this.razon_social,
                cuit_cuil: this.cuit,
                estado : this.estado

            })
        };

        fetch(URL + '/register', requestOptions)
          .then(response => response.json())
          .then(data => {
                if (data.message == 'Usuario creado correctamente'){
                    document.getElementById('errorRegister').innerHTML = data.message
                }else{
                    document.getElementById('errorRegister').innerHTML = data.message
                }
          })
          .catch(error => {
              console.error('Error al realizar la solicitud:', error);
          });
        
    }

}


// Capturo el boton de login
let btnLogin = document.getElementById('btn-login')

// Disparo el evento click, creo una instancia de Usuario y llamo al metodo login de la clase con los datos ingresados en el formulario
btnLogin.addEventListener('click', () =>{
    let username = document.getElementById('username-login').value;
    let password = document.getElementById('password-login').value;
    let usuario1 = new Usuario(username, password)
    usuario1.login();
})

// Capturo el boton de registro
let btnRegistro = document.getElementById('btn-register')

// Disparo el evento click, creo una instancia de Usuario y llamo al metodo login de la clase con los datos ingresados en el formulario
btnRegistro.addEventListener('click', () =>{
    let razon_social = document.getElementById('razon-social').value;
    let cuit = document.getElementById('cuit').value;
    let username = document.getElementById('username-register').value;
    let password = document.getElementById('password-register').value;
    let confirm_password = document.getElementById('confirm-password').value;

    if(password !== confirm_password){
        document.getElementById('errorRegister').innerHTML = 'Las contraseñas no coinciden'
    }else{
        let usuario2 = new Usuario(username, password, razon_social, parseInt(cuit), true)
        usuario2.register();
    }
})
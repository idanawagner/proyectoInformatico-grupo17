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
    pago_container.style.display = 'flex';
}

function Registro() {


}
const URL=`http://127.0.0.1:5200`
class Usuario{
    constructor(username, password){
        this.username = username;
        this.password = password;
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
                    window.location.href = 'home.html'
                }else{
                    document.getElementById('errorLogin').innerHTML = 'Usuario o contraseña incorrectos'
                }
          })
          .catch(error => {
              console.error('Error al realizar la solicitud:', error);
          });
          
        }
        
    }

let btnLogin = document.getElementById('btn-login')
    
btnLogin.addEventListener('click', () =>{
    let username = document.getElementById('username').value;
    let password = document.getElementById('password-login').value;
    let usuario1 = new Usuario(username, password)
    usuario1.login();
})

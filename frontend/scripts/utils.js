
function protectedRoutes(){
    window.onload = function(){
        const token = localStorage.getItem('token');
        if (token){
            const username = localStorage.getItem('username');
            const id = localStorage.getItem('id');
            document.getElementById('username').innerHTML = username;
        }
        else{
            window.location.href = 'login.html'; // si alguien intenta ingresar directamente con el url sin tener hecho login, lo redirige a login.html
        }
    }
}

export default protectedRoutes;

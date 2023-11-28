
const protectedRoutes = () => {

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



// async function showSection( page, section){
//     let upload_container = document.getElementById('sec-load');
//     let search_container = document.getElementById('sec-search');
//     switch (page ) {
//         case 'clients' :
//             switch (section ) {
//                 case 'uploadClient':
//                     upload_container.style.display = 'block';
//                     search_container.style.display = 'none';
//                     break;
//                 case 'searchClient':
//                     upload_container.style.display = 'none';
//                     search_container.style.display = 'block';
//                     await searchAllClients(); 
//                     buscado.push(...clientsList)
//                     renderTable();
                    
//                     break;
//                 default:
//                     uploadClient_container.style.display = 'block';
//             }
//         case 'products&services':
//         case 'metrics':
//         case 'bills':
//     }


// }

export default {protectedRoutes};
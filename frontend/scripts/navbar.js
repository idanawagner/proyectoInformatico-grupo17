let header = document.getElementById("header");
let navbar = document.getElementById("navbar");

const armarHeader = ()=> {
       let HTMLHeader = ""
             HTMLHeader += ` <!-- Header -->
             <header class="header">
               <div class="logo_container">
                 <img class="logo" src="../assets/logotipo.png" alt="Logotipo" />
               </div>
             </header>
           `
       return HTMLHeader
}
const armarNavbar = ()=> {
       let HTMLNavbar = ""
            HTMLNavbar += `
               <!-- Navbar -->
               <nav class="navbar_container" id="menu_nav">
                 <ul class="navbar_list">
                   <li  id="home" >
                     <a href="home.html">
                       <span>
                         <i class="fa-solid fa-user" title="Perfil"></i>
                       </span>
                       <span class="nav__text"> Perfil </span>
                     </a>
                   </li>
                   <!-- Factuacion -->
                   <li  id="facturas" >
                     <a href="facturas.html">
                       <span>
                         <i class="fa-solid fa-barcode" title="Facturacion"></i>
                       </span>
                       <span class="nav__text">Facturacion</span>
                     </a>
                   </li>
                   <!-- Clientes -->
                   <li   id="clientes" >
                     <a href="clientes.html">
                       <span>
                         <i class="fa-solid fa-address-book" title="Clientes"></i>
                       </span>
                       <span class="nav__text"> Clientes </span>
                     </a>
                   </li>
                   <!-- Productos y Servicios -->
                   <li class="" id="productosSevicios" >
                     <a href="productosSevicios.html">
                       <span>
                         <i class="fa-solid fa-truck" title="Stock"></i>
                       </span>
                       <span class="nav__text"> Productos/Servicios</span>
                     </a>
                   </li>
                   <!-- Dashboard -->
                   <li class="" id="metricas" >
                     <a href="metricas.html">
                       <span>
                         <i
                           class="fa-solid fa-square-poll-vertical"
                           title="Métricas"
                         ></i>
                       </span>
                       <span class="nav__text"> Métricas </span>
                     </a>
                   </li>
                   <li>
                     <a href="index.html">
                         <span>
                         <i class="fa-solid fa-sign-out" title="Cerrar sesión"></i>
                       </span>
                       <span class="nav__text"> Cerrar sesión </span>
                     </a>
                   </li>
                 </ul>
               </nav>`
       return HTMLNavbar
}

header.innerHTML = armarHeader()
navbar.innerHTML = armarNavbar()


switch (window.location.pathname) {
       case '/frontend/HTMLs/home.html':
              document.getElementById('home').classList.add('itemSelect')
              break;
       case '/frontend/HTMLs/facturas.html':
              document.getElementById('facturas').classList.add('itemSelect')
              break;
       case '/frontend/HTMLs/clientes.html':
              document.getElementById('clientes').classList.add('itemSelect')
              break;
       case '/frontend/HTMLs/productosSevicios.html':
              document.getElementById('productosSevicios').classList.add('itemSelect')
              break;
       case '/frontend/HTMLs/metricas.html':
              document.getElementById('metricas').classList.add('itemSelect')
              break;
       default:
              break;
}
let header = document.getElementById("header");
let navbar = document.getElementById("navbar");
let container = document.getElementById("container");

const armarHeader = () => {
  let HTMLHeader = "";
  HTMLHeader += ` <!-- Header -->
             <header class="header">
                <!-- Navbar -->
                <nav class="navbar navbar-expand-lg ">
                      <div class="container-fluid">
                          <div class="logo_container">
                              <a class="" href="#">
                                  <img class="logo" src="../assets/logotipo.png" alt="Logotipo" />
                              </a>
                          </div>
                          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                              <span class="navbar-toggler-icon"></span>
                          </button>
                          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                              <div class="navbar-nav navbar_list">
                                  <a id="home" class="nav-link active" aria-current="page" href="home.html" >
                                      <span><i class="fa-solid fa-user" title="Perfil"></i></span>
                                      <span class="nav__text">Perfil</span>
                                  </a>
                                  <a id="facturas" class="nav-link" href="facturas.html">
                                      <span><i class="fa-solid fa-barcode" title="Facturación"></i></span>
                                      <span class="nav__text">Facturación</span>
                                  </a>
                                  <a  id="clientes" class="nav-link" href="clientes.html">
                                      <span><i class="fa-solid fa-address-book" title="Clientes"></i></span>
                                      <span class="nav__text">Clientes</span>
                                  </a>
                                  <a id="productosSevicios" class="nav-link" href="productosSevicios.html">
                                      <span><i class="fa-solid fa-truck" title="Stock"></i></span>
                                      <span class="nav__text">Productos/Servicios</span>
                                  </a>
                                  <a id="metricas"  class="nav-link" href="metricas.html">
                                      <span><i class="fa-solid fa-square-poll-vertical" title="Métricas"></i></span>
                                      <span class="nav__text">Métricas</span>
                                  </a>
                                  <a class="nav-link" onclick="cerrarSesion()">
                                      <span><i class="fa-solid fa-sign-out" title="Cerrar sesión"></i></span>
                                      <span class="nav__text">Cerrar sesión</span>
                                  </a>
                              </div>
                            </div>
                      </div>
                </nav>
            </header>
           `;
  return HTMLHeader;
};


header.innerHTML = armarHeader();

switch (window.location.pathname) {
  case "/frontend/HTMLs/home.html":
    document.getElementById("home").classList.add("itemSelect");
    break;
  case "/frontend/HTMLs/facturas.html":
    document.getElementById("facturas").classList.add("itemSelect");
    break;
  case "/frontend/HTMLs/clientes.html":
    document.getElementById("clientes").classList.add("itemSelect");
    break;
  case "/frontend/HTMLs/productosSevicios.html":
    document.getElementById("productosSevicios").classList.add("itemSelect");
    break;
  case "/frontend/HTMLs/metricas.html":
    document.getElementById("metricas").classList.add("itemSelect");
    break;
  default:
    break;
}

const cerrarSesion = () => {
  localStorage.clear();
  window.location.href = "index.html";
};

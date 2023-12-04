const URL='http://127.0.0.1:5200';

let select = document.getElementById('dashboard-filter-select');

select.addEventListener('change', (event) => {
    showSection(event.target.value);
}
)
// Funcion para dar formato a las fechas
function formatearFecha(fechaString) {
    // Crear un objeto Date a partir de la cadena de fecha
    let fecha = new Date(fechaString);

    // Obtener los componentes de la fecha
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1;
    let anio = fecha.getFullYear();

    // Formatear los componentes para que tengan dos dígitos si es necesario
    dia = dia < 10 ? '0' + dia : dia;
    mes = mes < 10 ? '0' + mes : mes;

    // Crear la cadena en el formato deseado
    let fechaFormateada = `${dia}-${mes}-${anio}`;

    return fechaFormateada;
}
// Funcion para mostrar la seccion del dashboard elegido
async function showSection(section) {
    let stockContainer = document.getElementById('chart-container-stock');
    let movimientoStockContainer = document.getElementById('stock-movement');
    let rankingVentasProductosContainer = document.getElementById('chart-container-ranking-ventas-productos');
    let rankingVentasServiciosContainer = document.getElementById('chart-container-ranking-ventas-servicios');
    let rankingVentasClientesContainer = document.getElementById('chart-container-ranking-ventas-clientes');
    let historialVentasContainer = document.getElementById('table-container-historial-ventas');

    switch (section) {
        case 'Control de Stock':
            stockContainer.style.display = 'block';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'none';
            historialVentasContainer.style.display = 'none';
            await cargarDatosStock();
            break;
        case 'Informe de movimiento del Stock':
            stockContainer.style.display = 'none';
            movimientoStockContainer.style.display = 'block';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'none';
            historialVentasContainer.style.display = 'none';
            await traerProductos();
            break;
        case 'Ranking de ventas por Producto':
            stockContainer.style.display = 'none';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'block';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'none';
            historialVentasContainer.style.display = 'none';
            await cargarDatosRankingVentasProducto();
            break;
        case 'Ranking de ventas por Servicio':
            stockContainer.style.display = 'none';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'block';
            rankingVentasClientesContainer.style.display = 'none';
            historialVentasContainer.style.display = 'none';
            await cargarDatosRankingVentasServicio();
            break;
        case 'Ranking de ventas por cliente':
            stockContainer.style.display = 'none';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'block';
            historialVentasContainer.style.display = 'none';
            await cargarDatosRankingVentasCliente();
            break;
        case 'Historial de ventas':
            stockContainer.style.display = 'none';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'none';
            historialVentasContainer.style.display = 'block';
            await cargarDatosHistorialVentas();
            break;
        default:
            stockContainer.style.display = 'block';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'none';
            historialVentasContainer.style.display = 'none';
    }

}
 
// Función para graficar el stock de productos
graficarMetricasStock = (data) => {
        
    var myChart = echarts.init(document.getElementById('chart-container-stock'));
    
        var option = {
              title: {
                text: 'Stock de productos',
                left: 'center',
                textStyle: {
                    fontSize: 24
                }
              },
              tooltip: {},
              legend: {
                  data: ['stock'],
                  top: '10%'
              },
              xAxis: {
                  data: data.productos
              },
              yAxis: {},
              series: [
              {
                  name: 'stock',
                  type: 'bar',
                  data: data.stock,
                  itemStyle: {color: '#175350'}
              }
            ],
              grid: {
                top: '20%',
                bottom: '10%' 
            }
          };

        myChart.setOption(option);

    
    window.addEventListener('resize', function () {
        myChart.resize(); 
    });
}
// Función para cargar los datos de stock
cargarDatosStock = () => { 
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
    return fetch(URL + `/user/${id}/stock`, requestOptions)
    .then(response => response.json())
    .then(data => {
      
        graficarMetricasStock(data);
                 
    })

}

// Funcion para traer productos del el select
traerProductos = () => { 
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
    return fetch(URL + `/user/${id}/productos_servicios`, requestOptions)
    .then(response => response.json())
    .then(data => {
    let select = document.getElementById('select-productos');
        data.forEach(element => {
            if (element.categoria == 'Producto'){
                select.innerHTML += `<option value="${element.id}">${element.nombre}</option>`
             } 
    });
    })
}

// Funcion para cambiar el producto del select
cambiarProducto = () => { 
    let select = document.getElementById('select-productos');
    let id = select.value;
    cargarDatosMovimientoStock(id);
}

//Funcion para graficar el movimiento de stock
graficarMetricasMovimientoStock = (producto, fechas, cantidades) => {

    let chartContainer = document.getElementById('chart-container-stock-movement');
    chartContainer.style.display = 'block';


    // Initialize the echarts instance based on the prepared dom
    var myChart = echarts.init(chartContainer);

    // Specify the configuration items and data for the chart
    var option = {
            title: {
                text: 'Movimiento de stock',
                left: 'center',
                //tamaño de la fuente
                textStyle: {
                    fontSize: 24
                }
            },
            tooltip: {},
            legend: {
                data: ['cantidades'],
                top: '10%'
            },
            xAxis: {
                data: fechas
            },
            yAxis: {},
            series: [
            {
                name: 'cantidades',
                type: 'line',
                data: cantidades,
                itemStyle: {color: '#175350'}
            }
            ],
            grid: {
                top: '20%', // Puedes ajustar el valor según tus necesidades
                bottom: '10%' // Puedes ajustar el valor según tus necesidades
            }
        };

    // Display the chart using the configuration items and data just specified.
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize(); 
    });

}

// Funcion para cargar los datos de movimiento de stock
cargarDatosMovimientoStock = (id_producto) => { 
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
    return fetch(URL + `/user/${id}/movimiento_stock/${id_producto}`, requestOptions)
    .then(response => response.json())
        .then(data => {
            let producto = data.data[0].producto;
            let fechas = data.data[0].fechas;
            let cantidades = data.data[0].cantidades;

        graficarMetricasMovimientoStock(producto, fechas, cantidades);
                 
    })
}


//Funcion para graficar el ranking de ventas por producto
graficarMetricasRankingVentas = (data) => {

        var myChart = echarts.init(document.getElementById('chart-container-ranking-ventas-productos'));

        var option = {
              title: {
                text: 'Ranking de ventas por producto',
                left: 'center',
                textStyle: {
                    fontSize: 24
                }
              },
              tooltip: {},
              legend: {
                  data: ['ventas'],
                  top: '10%'
              },
              xAxis: {
                  data: data.productos
              },
              yAxis: {},
              series: [
              {
                  name: 'ventas',
                  type: 'bar',
                  data: data.ventas,
                  itemStyle: {color: '#175350'}
              }
            ],
                grid: {
                    top: '20%',
                    bottom: '10%'
                }
          };
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize(); 
        });
}

// Funcion para cargar los datos de ranking de ventas por producto
cargarDatosRankingVentasProducto = () => { 
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
    return fetch(URL + `/user/${id}/ranking_ventas_producto`, requestOptions)
    .then(response => response.json())
    .then(data => {
      
        graficarMetricasRankingVentas(data);
                 
    })

}

//Funcion para graficar el ranking de ventas por servicio
graficarMetricasRankingVentasServicio = (data) => {
        var myChart = echarts.init(document.getElementById('chart-container-ranking-ventas-servicios'));

        var option = {
              title: {
                text: 'Ranking de ventas por servicio',
                left: 'center',
                textStyle: {
                    fontSize: 24
                }
              },
              tooltip: {},
              legend: {
                  data: ['ventas'],
                    top: '10%'
              },
              xAxis: {
                  data: data.servicios,
                  axisLabel: {
                            interval: 'auto',
                        }
              },
              yAxis: {},
              series: [
              {
                  name: 'ventas',
                  type: 'bar',
                  data: data.ventas,
                  itemStyle: {color: '#175350'}
              }
            ],
                grid: {
                    top: '20%', 
                    bottom: '10%'
                }
          };
        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize(); 
        });
}

// Funcion para cargar los datos de ranking de ventas por servicio
cargarDatosRankingVentasServicio = () => { 

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
    return fetch(URL + `/user/${id}/ranking_ventas_servicio`, requestOptions)
    .then(response => response.json())
    .then(data => {
      
        graficarMetricasRankingVentasServicio(data);
                 
    })

}

//Funcion para graficar el ranking de ventas por cliente
graficarMetricasRankingVentasCliente = (data) => {
        var myChart = echarts.init(document.getElementById('chart-container-ranking-ventas-clientes'));

        var option = {
              title: {
                text: 'Ranking de ventas por cliente',
                left: 'center',
                textStyle: {
                    fontSize: 24
                }
              },
              tooltip: {},
              legend: {
                  data: ['ventas'],
                    top: '10%'
              },
              xAxis: {
                  data: data.clientes
              },
              yAxis: {},
              series: [
              {
                  name: 'ventas',
                  type: 'bar',
                  data: data.ventas,
                  itemStyle: {color: '#175350'}
              }
            ],
                grid: {
                    top: '20%',
                    bottom: '10%' 
                }
          };

        myChart.setOption(option);
        window.addEventListener('resize', function () {
            myChart.resize(); 
        });
}

// Funcion para cargar los datos de ranking de ventas por cliente
cargarDatosRankingVentasCliente = () => { 
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
    return fetch(URL + `/user/${id}/ranking_ventas_cliente`, requestOptions)
    .then(response => response.json())
    .then(data => {
      
        graficarMetricasRankingVentasCliente(data);
                 
    })

}


//Funcion para mostrar la table del historial de ventas
function renderTable(historialVentas) {
    let tbody = document.getElementById('tbody-historial-ventas');
    tbody.innerHTML = '';
    historialVentas.forEach((element) => {
        tbody.innerHTML += `
        <tr class="body-row" scope="row">
            <td class=""> ${element[0]} </td>
            <td class=""> ${element[1]} </td>
            <td class=""> ${element[2]} </td>
            <td class=""> ${element[3]} </td>
            <td class="columnNoneMobile"> ${element[4]} </td>
            <td class="columnNoneMobile"> ${element[5]} </td>
            <td class="columnNoneMobile"> ${element[6]} </td>
        </tr>
        `
    });
    historialVentas = [];
}

// Funcion para cargar los datos del historial de ventas
cargarDatosHistorialVentas = () => { 
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
    return fetch(URL + `/user/${id}/historial_ventas`, requestOptions)
    .then(response => response.json())
        .then(data => {
        let historialVentas = [];
        data.data.forEach(element => {
            historialVentas.push([element[0], formatearFecha(element[1]), element[2], element[3], element[4], element[5], element[6]]);
        })
        renderTable(historialVentas);
                 
    })

}

























// Al cargar la pagina se ejecuta la funcion searchAllClients para traer todos los productos y servicios de la base de datos
window.addEventListener('load',async () => {
    
    showSection('Control de Stock');
});
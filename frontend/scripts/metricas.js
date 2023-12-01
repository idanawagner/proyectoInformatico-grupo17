const URL='http://127.0.0.1:5200';

let select = document.getElementById('dashboard-filter-select');

select.addEventListener('change', (event) => {
    showSection(event.target.value);
}
)

async function showSection(section) {
    console.log("showSection");
    let stockContainer = document.getElementById('chart-container-stock');
    let movimientoStockContainer = document.getElementById('chart-container-stock-movement');
    let rankingVentasProductosContainer = document.getElementById('chart-container-ranking-ventas-productos');
    let rankingVentasServiciosContainer = document.getElementById('chart-container-ranking-ventas-servicios');
    let rankingVentasClientesContainer = document.getElementById('chart-container-ranking-ventas-clientes');
    // let historialVentasContainer = document.getElementById('chart-container-historial-ventas');

    switch (section) {
        case 'Control de Stock':
            stockContainer.style.display = 'block';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'none';
            await cargarDatosStock();
            break;
        case 'Informe de movimiento del Stock':
            stockContainer.style.display = 'none';
            movimientoStockContainer.style.display = 'block';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'none';
            await cargarDatosMovimientoStock();
            break;
        case 'Ranking de ventas por Producto':
            stockContainer.style.display = 'none';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'block';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'none';
            await cargarDatosRankingVentasProducto();
            break;
        case 'Ranking de ventas por Servicio':
            stockContainer.style.display = 'none';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'block';
            rankingVentasClientesContainer.style.display = 'none';
            await cargarDatosRankingVentasServicio();
            break;
        case 'Ranking de ventas por cliente':
            stockContainer.style.display = 'none';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'block';
            await cargarDatosRankingVentasCliente();
            break;
        // case 'chart-container-historial-ventas':
        //     stockContainer.style.display = 'none';
        //     movimientoStockContainer.style.display = 'none';
        //     rankingVentasProductosContainer.style.display = 'none';
        //     rankingVentasServiciosContainer.style.display = 'none';
        //     rankingVentasClientesContainer.style.display = 'none';
        //     historialVentasContainer.style.display = 'block';
        //     break;
        default:
            stockContainer.style.display = 'block';
            movimientoStockContainer.style.display = 'none';
            rankingVentasProductosContainer.style.display = 'none';
            rankingVentasServiciosContainer.style.display = 'none';
            rankingVentasClientesContainer.style.display = 'none';
    }

}
 
// Función para graficar el stock de productos
graficarMetricasStock = (data) => {
        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById('chart-container-stock'));

        // Specify the configuration items and data for the chart
        var option = {
              title: {
                  text: 'Stock de productos'
              },
              tooltip: {},
              legend: {
                  data: ['stock']
              },
              xAxis: {
                  data: data.productos
              },
              yAxis: {},
              series: [
              {
                  name: 'stock',
                  type: 'bar',
                  data: data.stock
              }
              ]
          };

        // Display the chart using the configuration items and data just specified.
        myChart.setOption(option);
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

// cargarDatosStock();

//Funcion para graficar el movimiento de stock
graficarMetricasMovimientoStock = (data) => {
    // Initialize the echarts instance based on the prepared dom




    var myChart = echarts.init(document.getElementById('chart-container-stock-movement'));

    // Especificar las opciones de configuración y datos para el gráfico
    var option = {
        title: {
            text: 'Movimiento de stock'

        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: data.productos
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data.fechas,
            axisLabel: {
                formatter: function (value, index) {
                    return value.substring(0, 10);
                }
            }
        },
        yAxis: {
            type: 'value'
        },
        series: []
    };

    // Agregar series dinámicamente
    for (var i = 0; i < data.productos.length; i++) {
        var seriesItem = {
            name: data.productos[i],
            type: 'line',
            stack: 'Total',
            data: data.cantidades[i]
        };
        option.series.push(seriesItem);
    }

    // Mostrar el gráfico con las opciones y datos configurados
    myChart.setOption(option);

}


// Funcion para cargas los datos de movimiento de stock
cargarDatosMovimientoStock = () => { 
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
    return fetch(URL + `/user/${id}/movimiento_stock`, requestOptions)
    .then(response => response.json())
    .then(data => {
      
        graficarMetricasMovimientoStock(data);
                 
    })

}

// cargarDatosMovimientoStock();


//Funcion para graficar el ranking de ventas por producto
graficarMetricasRankingVentas = (data) => {
        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById('chart-container-ranking-ventas-productos'));

        // Specify the configuration items and data for the chart
        var option = {
              title: {
                  text: 'Ranking de ventas por producto'
              },
              tooltip: {},
              legend: {
                  data: ['ventas']
              },
              xAxis: {
                  data: data.productos
              },
              yAxis: {},
              series: [
              {
                  name: 'ventas',
                  type: 'bar',
                  data: data.ventas
              }
              ]
          };

        // Display the chart using the configuration items and data just specified.
        myChart.setOption(option);
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

// cargarDatosRankingVentasProducto();

//Funcion para graficar el ranking de ventas por servicio
graficarMetricasRankingVentasServicio = (data) => {
        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById('chart-container-ranking-ventas-servicios'));

        // Specify the configuration items and data for the chart
        var option = {
              title: {
                  text: 'Ranking de ventas por servicio'
              },
              tooltip: {},
              legend: {
                  data: ['ventas']
              },
              xAxis: {
                  data: data.servicios
              },
              yAxis: {},
              series: [
              {
                  name: 'ventas',
                  type: 'bar',
                  data: data.ventas
              }
              ]
          };

        // Display the chart using the configuration items and data just specified.
        myChart.setOption(option);
}

// Funcion para cargar los datos de ranking de ventas por servicio
cargarDatosRankingVentasServicio = () => { 
    // console.log("cargarDatosRankingVentasServicio");
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

// cargarDatosRankingVentasServicio();


//Funcion para graficar el ranking de ventas por cliente
graficarMetricasRankingVentasCliente = (data) => {
        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById('chart-container-ranking-ventas-clientes'));

        // Specify the configuration items and data for the chart
        var option = {
              title: {
                  text: 'Ranking de ventas por cliente'
              },
              tooltip: {},
              legend: {
                  data: ['ventas']
              },
              xAxis: {
                  data: data.clientes
              },
              yAxis: {},
              series: [
              {
                  name: 'ventas',
                  type: 'bar',
                  data: data.ventas
              }
              ]
          };

        // Display the chart using the configuration items and data just specified.
        myChart.setOption(option);
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

// cargarDatosRankingVentasCliente();


//Funcion para graficar el historial de ventas



// Al cargar la pagina se ejecuta la funcion searchAllClients para traer todos los productos y servicios de la base de datos
window.addEventListener('load',async () => {
    
    showSection('Control de Stock');
});
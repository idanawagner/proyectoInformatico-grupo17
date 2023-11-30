const URL='http://127.0.0.1:5200';

console.log("metricas.js loaded");
 
// Función para graficar el stock de productos
graficarMetricasStock = (data) => {
    console.log("graficarMetricasStock");
    console.log(data);
    console.log(data.productos);
    console.log(data.stock)
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
    console.log("cargarDatosStock");
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
    fetch(URL + `/user/${id}/stock`, requestOptions)
    .then(response => response.json())
    .then(data => {
      
        console.log(data);
        graficarMetricasStock(data);
                 
    })

}

cargarDatosStock();

//Funcion para graficar el movimiento de stock
graficarMetricasMovimientoStock = (data) => {
    console.log("graficarMetricasMovimientoStock");
    console.log(data);
    console.log(data.fechas);
    // console.log(data.productos);
    // console.log(data.stock)
    // Initialize the echarts instance based on the prepared dom


    console.log("Fechas modificadas");
    console.log(data.fechas);


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
    console.log(option.series)

    // Mostrar el gráfico con las opciones y datos configurados
    myChart.setOption(option);

}


// Funcion para cargas los datos de movimiento de stock
cargarDatosMovimientoStock = () => { 
    console.log("cargarDatosMovimientoStock");
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
    fetch(URL + `/user/${id}/movimiento_stock`, requestOptions)
    .then(response => response.json())
    .then(data => {
      
        console.log(data);
        graficarMetricasMovimientoStock(data);
                 
    })

}

cargarDatosMovimientoStock();


//
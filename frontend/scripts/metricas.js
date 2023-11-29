const URL='http://127.0.0.1:5200';

console.log("metricas.js loaded");
 
// Función para graficar el stock de productos
graficarMetricasStock = (data) => {
    console.log("graficarMetricas");
    console.log(data);
    console.log(data.productos);
    console.log(data.stock)
        // Initialize the echarts instance based on the prepared dom
        var myChart = echarts.init(document.getElementById('chart-container'));

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
    fetch(URL + `/user/${id}/stock`, requestOptions)
    .then(response => response.json())
    .then(data => {
      
        console.log(data);
        graficarMetricasStock(data);
                 
    })

}

cargarDatosStock();

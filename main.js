(() => {
    const tabla = document.getElementById('tabla');
    const tbody = document.createElement('tbody');

    fetch('https://swapi.dev/api/vehicles/')
        .then(res => {
            return res.status == 200 ? res.json() : Promise.reject(res);
        })
        .then(json => {
            const vehiculosAgrupados = {};
            
            // Iterar sobre los resultados de la API y agrupar los vehículos por fabricante
            json.results.forEach(vehiculo => {
                const fabricante = vehiculo.manufacturer;
                if (!vehiculosAgrupados[fabricante]) {
                    vehiculosAgrupados[fabricante] = [];
                }
                vehiculosAgrupados[fabricante].push(vehiculo);
            });

            // Ordenar fabricantes alfabéticamente
            const fabricantesOrdenados = Object.keys(vehiculosAgrupados).sort();

            // Construir tabla con vehículos ordenados por el fabricante
            fabricantesOrdenados.forEach(fabricante => {
            const vehiculos = vehiculosAgrupados[fabricante];

                vehiculos.forEach(e => {
                    const fila = document.createElement('tr');
                    const tdFabricante = document.createElement('td');
                    const tdNombre = document.createElement('td');
                    const tdModelo = document.createElement('td');

                    tdFabricante.textContent = fabricante;
                    tdNombre.textContent = e.name;
                    tdModelo.textContent = e.model;

                    fila.appendChild(tdFabricante);
                    fila.appendChild(tdNombre);
                    fila.appendChild(tdModelo);

                    tbody.appendChild(fila);
                });
            });

            tabla.appendChild(tbody);
        })
        .catch(err => {
            console.log(`Código de error status: ${err.status}`);
        });
})();


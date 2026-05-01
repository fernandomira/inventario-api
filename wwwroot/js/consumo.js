//document.addEventListener("DOMContentLoaded", () => {

        
//    const API_URL = "https://sports-useable-basics.ngrok-free.dev/api/Refacciones";

//const consumoForm = document.getElementById("consumoForm");
//const buscarInput = document.getElementById("buscar");
//const resultadosTabla = document.getElementById("resultados").querySelector("tbody");
//const historialTabla = document.getElementById("historial").querySelector("tbody");

//let componentesGlobal = [];

//// =========================
//// CARGAR DATOS DESDE API
//// =========================
//async function cargarDatos() {
//    try {
//        const res = await fetch(API_URL);
//        const data = await res.json();
//        componentesGlobal = data;

//        renderTabla();
//    } catch (error) {
//        console.error(error);
//        alert("Error al cargar datos");
//    }
//}

//// =========================
//// RENDER TABLA
//// =========================
//function renderTabla(filtro = "") {

//    resultadosTabla.innerHTML = "";

//    const resultados = filtro
//        ? componentesGlobal.filter(c => c.nombre.toLowerCase().startsWith(filtro.toLowerCase()))
//        : componentesGlobal;

//    resultados.forEach(c => {

//        const fila = document.createElement("tr");

//        fila.innerHTML = `
//        < td > ${ c.nombre }</td >
//            <td>${c.ubicacion}</td>
//            <td>${c.stock}</td>
//            <td>${new Date(c.fechaRegistro).toLocaleDateString()}</td>
//            <td>${c.noParte}</td>
//            <td>
//                ${c.imagen ? `<img src="${c.imagen}" width="80" height="80" style="object-fit:cover; margin:3px;">` : ""}
//            </td>
//    `;

//        fila.addEventListener("click", () => {
//            buscarInput.value = c.nombre;
//        });

//        resultadosTabla.appendChild(fila);
//    });
//}

//// =========================
//// HISTORIAL LOCAL (OPCIONAL)
//// =========================
//function renderHistorial() {
//    const historial = JSON.parse(localStorage.getItem("historialConsumos")) || [];
//    historialTabla.innerHTML = "";

//    historial.forEach(h => {
//        const fila = document.createElement("tr");
//        fila.innerHTML = `
//        < td > ${ h.nombre }</td >
//            <td>${h.cantidadUsada}</td>
//            <td>${h.fechaUso}</td>
//    `;
//        historialTabla.appendChild(fila);
//    });
//}

//// =========================
//// BUSCADOR
//// =========================
//if (buscarInput) {
//    buscarInput.addEventListener("input", () => {
//        renderTabla(buscarInput.value.trim());
//    });
//}

//// =========================
//// GUARDAR CONSUMO (ACTUALIZA BD)
//// =========================
//if (consumoForm) {
//    consumoForm.addEventListener("submit", async (e) => {
//        e.preventDefault();

//        const nombreBuscar = buscarInput.value.trim().toLowerCase();
//        const cantidadUsada = parseInt(document.getElementById("cantidadUsada").value);
//        const fechaUso = document.getElementById("fechaUso").value;

//        const componente = componentesGlobal.find(c => c.nombre.toLowerCase() === nombreBuscar);

//        if (!componente) {
//            alert("Componente no encontrado.");
//            return;
//        }

//        if (cantidadUsada > componente.stock) {
//            alert("No hay suficiente stock.");
//            return;
//        }

//        const nuevoStock = componente.stock - cantidadUsada;

//        try {
//            // 🔥 ACTUALIZA EN BACKEND
//            await fetch(`${ API_URL } /${componente.id}`, {
//    method: "PUT",
//        headers: {
//        "Content-Type": "application/json"
//    },
//    body: JSON.stringify({
//        id: componente.id,
//        nombre: componente.nombre,
//        noParte: componente.noParte,
//        ubicacion: componente.ubicacion,
//        stock: nuevoStock,
//        imagen: componente.imagen
//    })
//});

//// 🔥 HISTORIAL (local por ahora)
//let historial = JSON.parse(localStorage.getItem("historialConsumos")) || [];
//historial.push({
//    nombre: componente.nombre,
//    cantidadUsada,
//    fechaUso
//});
//localStorage.setItem("historialConsumos", JSON.stringify(historial));

//alert("Consumo registrado correctamente ✔");

//consumoForm.reset();

//await cargarDatos();
//renderHistorial();

//        } catch (error) {
//    console.error(error);
//    alert("Error al actualizar stock");
//}
//    });
//}

//// =========================
//// INICIO
//// =========================
//cargarDatos();
//renderHistorial();


//});
document.addEventListener("DOMContentLoaded", () => {

    const API_URL = "https://inventario-api-1-g3xe.onrender.com/api/Refacciones";

    const consumoForm = document.getElementById("consumoForm");
    const buscarInput = document.getElementById("buscar");
    const resultadosTabla = document.getElementById("resultados").querySelector("tbody");
    const historialTabla = document.getElementById("historial").querySelector("tbody");

    let componentesGlobal = [];

    // =========================
    // CARGAR DATOS DESDE API
    // =========================
    async function cargarDatos() {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            componentesGlobal = data;

            renderTabla();
        } catch (error) {
            console.error(error);
            alert("Error al cargar datos");
        }
    }

    // =========================
    // RENDER TABLA
    // =========================
    function renderTabla(filtro = "") {

        resultadosTabla.innerHTML = "";

        const resultados = filtro
            ? componentesGlobal.filter(c => c.nombre.toLowerCase().startsWith(filtro.toLowerCase()))
            : componentesGlobal;

        resultados.forEach(c => {

            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${c.nombre}</td>
                <td>${c.ubicacion}</td>
                <td>${c.stock}</td>
                <td>${new Date(c.fechaRegistro).toLocaleDateString()}</td>
                <td>${c.noParte}</td>
                <td>
                    ${c.imagen ? `<img src="${c.imagen}" width="80" height="80" style="object-fit:cover; margin:3px;">` : ""}
                </td>
            `;

            fila.addEventListener("click", () => {
                buscarInput.value = c.nombre;
            });

            resultadosTabla.appendChild(fila);
        });
    }

    // =========================
    // HISTORIAL LOCAL
    // =========================
    function renderHistorial() {
        const historial = JSON.parse(localStorage.getItem("historialConsumos")) || [];
        historialTabla.innerHTML = "";

        historial.forEach(h => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${h.nombre}</td>
                <td>${h.cantidadUsada}</td>
                <td>${h.fechaUso}</td>
            `;
            historialTabla.appendChild(fila);
        });
    }

    // =========================
    // BUSCADOR
    // =========================
    if (buscarInput) {
        buscarInput.addEventListener("input", () => {
            renderTabla(buscarInput.value.trim());
        });
    }

    // =========================
    // GUARDAR CONSUMO (ACTUALIZA BD)
    // =========================
    if (consumoForm) {
        consumoForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nombreBuscar = buscarInput.value.trim().toLowerCase();
            const cantidadUsada = parseInt(document.getElementById("cantidadUsada").value);
            const fechaUso = document.getElementById("fechaUso").value;

            const componente = componentesGlobal.find(c => c.nombre.toLowerCase() === nombreBuscar);

            if (!componente) {
                alert("Componente no encontrado.");
                return;
            }

            if (cantidadUsada > componente.stock) {
                alert("No hay suficiente stock.");
                return;
            }

            const nuevoStock = componente.stock - cantidadUsada;

            try {
                // ✅ FIX URL (sin espacios)
                const res = await fetch(`${API_URL}/${componente.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id: componente.id,
                        nombre: componente.nombre,
                        noParte: componente.noParte,
                        ubicacion: componente.ubicacion,
                        stock: nuevoStock,
                        imagen: componente.imagen
                    })
                });

                if (!res.ok) throw new Error("Error al actualizar");

                // HISTORIAL LOCAL
                let historial = JSON.parse(localStorage.getItem("historialConsumos")) || [];
                historial.push({
                    nombre: componente.nombre,
                    cantidadUsada,
                    fechaUso
                });
                localStorage.setItem("historialConsumos", JSON.stringify(historial));

                alert("Consumo registrado correctamente ✔");

                consumoForm.reset();

                await cargarDatos();
                renderHistorial();

            } catch (error) {
                console.error(error);
                alert("Error al actualizar stock");
            }
        });
    }

    // =========================
    // INICIO
    // =========================
    cargarDatos();
    renderHistorial();

});
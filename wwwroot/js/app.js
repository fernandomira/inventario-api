//document.addEventListener("DOMContentLoaded", () => {

//    const API_URL = "https://sports-useable-basics.ngrok-free.dev/api/Refacciones";

//    const recepcionForm = document.getElementById("recepcionForm");
//    const tabla = document.querySelector("#tablaDatos tbody");

//    const inputImagen = document.getElementById("imagen");
//    const previewContainer = document.getElementById("previewContainer");

//    let archivosSeleccionados = [];

//    // =========================
//    // PREVISUALIZAR IMÁGENES
//    // =========================
//    if (inputImagen) {
//        inputImagen.addEventListener("change", e => {

            
//    previewContainer.innerHTML = "";
//    archivosSeleccionados = Array.from(e.target.files);

//    archivosSeleccionados.forEach(file => {
//        const url = URL.createObjectURL(file);

//        const img = document.createElement("img");
//        img.src = url;
//        img.width = 80;
//        img.style.margin = "5px";
//        img.style.border = "1px solid #ccc";
//        img.style.borderRadius = "4px";

//        previewContainer.appendChild(img);
//    });
//});


//        }

//// =========================
//// GUARDAR EN BD (SUBIENDO IMAGENES)
//// =========================
//if (recepcionForm) {
//            recepcionForm.addEventListener("submit", async (e) => {
//                e.preventDefault();

                
//    const nombre = document.getElementById("nombre").value.trim();
//    const ubicacion = document.getElementById("ubicacion").value.trim();
//    const cantidad = parseInt(document.getElementById("cantidad").value);
//    const numeroParte = document.getElementById("numeroParte").value.trim();

//    if (!nombre || !ubicacion || !cantidad || !numeroParte || archivosSeleccionados.length === 0) {
//        alert("Todos los campos son obligatorios.");
//        return;
//    }

//    try {

//        let rutasImagenes = [];

//        // 🔥 SUBIR TODAS LAS IMÁGENES
//        for (let i = 0; i < archivosSeleccionados.length; i++) {

//            const formData = new FormData();
//            formData.append("file", archivosSeleccionados[i]);

//            const uploadRes = await fetch(`${API_URL}/upload`, {
//                method: "POST",
//                    body: formData
//            });

//            if (!uploadRes.ok) throw new Error("Error al subir imagen");

//            const uploadData = await uploadRes.json();
//            rutasImagenes.push(uploadData.ruta);
//        }

//        // 🔥 GUARDAR SOLO LA PRIMERA EN BD (porque tu modelo solo tiene 1 campo)
//        const res = await fetch(API_URL, {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json"
//            },
//            body: JSON.stringify({
//                nombre: nombre,
//                noParte: numeroParte,
//                ubicacion: ubicacion,
//                stock: cantidad,
//                imagen: rutasImagenes[0] // SOLO 1 en BD
//            })
//        });

//        if (!res.ok) throw new Error("Error al guardar");

//        alert("Guardado en la base de datos ");

//        recepcionForm.reset();
//        previewContainer.innerHTML = "";
//        archivosSeleccionados = [];

//        cargarDatos();

//    } catch (error) {
//        console.error(error);
//        alert("Error al guardar en la BD");
//    }
//});

//}

//// =========================
//// CARGAR DATOS
//// =========================
//async function cargarDatos() {
//if (!tabla) return;

//try {
//    const res = await fetch(API_URL);
//    const data = await res.json();

//    tabla.innerHTML = "";

//    data.forEach(c => {

//        const fila = document.createElement("tr");

//        fila.innerHTML = `
//            <td>${c.nombre}</td>
//            <td>${c.ubicacion}</td>
//            <td>${c.stock}</td>
//            <td>${new Date(c.fechaRegistro).toLocaleDateString()}</td>
//            <td>${c.noParte}</td>
//            <td>
//                ${c.imagen ? `<img src="https://localhost:7232/${c.imagen}" width="60" style="margin:3px; border:1px solid #ccc;">` : ""}
//            </td>
//        `;

//        tabla.appendChild(fila);
//    });

//} catch (error) {
//    console.error(error);
//    alert("Error al cargar datos");
//}

//}

//// =========================
//// INICIO
//// =========================
//cargarDatos();

//});
document.addEventListener("DOMContentLoaded", () => {

    const API_URL = "https://inventario-api-1-g3xe.onrender.com/api/Refacciones";

    const recepcionForm = document.getElementById("recepcionForm");
    const tabla = document.querySelector("#tablaDatos tbody");

    const inputImagen = document.getElementById("imagen");
    const previewContainer = document.getElementById("previewContainer");

    let archivosSeleccionados = [];

    // =========================
    // PREVISUALIZAR IMÁGENES
    // =========================
    if (inputImagen) {
        inputImagen.addEventListener("change", e => {


            previewContainer.innerHTML = "";
            archivosSeleccionados = Array.from(e.target.files);

            archivosSeleccionados.forEach(file => {
                const url = URL.createObjectURL(file);

                const img = document.createElement("img");
                img.src = url;
                img.width = 80;
                img.style.margin = "5px";
                img.style.border = "1px solid #ccc";
                img.style.borderRadius = "4px";

                previewContainer.appendChild(img);
            });
        });


    }

    // =========================
    // GUARDAR EN BD (SUBIENDO IMAGENES)
    // =========================
    if (recepcionForm) {
        recepcionForm.addEventListener("submit", async (e) => {
            e.preventDefault();


            const nombre = document.getElementById("nombre").value.trim();
            const ubicacion = document.getElementById("ubicacion").value.trim();
            const cantidad = parseInt(document.getElementById("cantidad").value);
            const numeroParte = document.getElementById("numeroParte").value.trim();

            if (!nombre || !ubicacion || !cantidad || !numeroParte || archivosSeleccionados.length === 0) {
                alert("Todos los campos son obligatorios.");
                return;
            }

            try {

                let rutasImagenes = [];

                // 🔥 SUBIR TODAS LAS IMÁGENES
                for (let i = 0; i < archivosSeleccionados.length; i++) {

                    const formData = new FormData();
                    formData.append("file", archivosSeleccionados[i]);

                    const uploadRes = await fetch(`${API_URL}/upload`, {
                        method: "POST",
                        body: formData
                    });

                    if (!uploadRes.ok) throw new Error("Error al subir imagen");

                    const uploadData = await uploadRes.json();
                    rutasImagenes.push(uploadData.ruta);
                }

                // 🔥 GUARDAR SOLO LA PRIMERA EN BD (porque tu modelo solo tiene 1 campo)
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        noParte: numeroParte,
                        ubicacion: ubicacion,
                        stock: cantidad,
                        imagen: rutasImagenes[0] // SOLO 1 en BD
                    })
                });

                if (!res.ok) throw new Error("Error al guardar");

                alert("Guardado en la base de datos ");

                recepcionForm.reset();
                previewContainer.innerHTML = "";
                archivosSeleccionados = [];

                cargarDatos();

            } catch (error) {
                console.error(error);
                alert("Error al guardar en la BD");
            }
        });

    }

    // =========================
    // CARGAR DATOS
    // =========================
    async function cargarDatos() {
        if (!tabla) return;

        try {
            const res = await fetch(API_URL);
            const data = await res.json();

            tabla.innerHTML = "";

            data.forEach(c => {

                const fila = document.createElement("tr");

                fila.innerHTML = `
            <td>${c.nombre}</td>
            <td>${c.ubicacion}</td>
            <td>${c.stock}</td>
            <td>${new Date(c.fechaRegistro).toLocaleDateString()}</td>
            <td>${c.noParte}</td>
            <td>
                ${c.imagen ? `<img src="https://localhost:7232/${c.imagen}" width="60" style="margin:3px; border:1px solid #ccc;">` : ""}
            </td>
        `;

                tabla.appendChild(fila);
            });

        } catch (error) {
            console.error(error);
            alert("Error al cargar datos");
        }

    }

    // =========================
    // INICIO
    // =========================
    cargarDatos();

});

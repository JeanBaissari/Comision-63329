// Array que almacenará los productos
let productos = [];

// Función para agregar un producto
function agregarProducto() {
    // Capturar los valores de los campos
    let nombreProducto = document.getElementById("producto").value;
    let precio = parseFloat(document.getElementById("precio").value);
    let cantidad = parseInt(document.getElementById("cantidad").value);
    
    // Validar que los campos no estén vacíos
    if (nombreProducto === "" || isNaN(precio) || isNaN(cantidad) || cantidad < 1) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    // Crear el objeto producto
    let producto = {
        nombre: nombreProducto,
        precio: precio,
        cantidad: cantidad,
        total: precio * cantidad
    };

    // Agregar el producto al array
    productos.push(producto);
    
    // Limpiar los campos de entrada
    document.getElementById("producto").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("cantidad").value = "";

    // Mostrar el producto en la tabla
    mostrarProductos();
    // Actualizar el total
    actualizarTotal();
}

// Función para mostrar los productos en la tabla
function mostrarProductos() {
    let tablaProductos = document.getElementById("productos-list");
    tablaProductos.innerHTML = ""; // Limpiar la tabla

    productos.forEach((producto, index) => {
        let fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>
                <input type="number" value="${producto.cantidad}" min="1" 
                    onchange="modificarCantidad(${index}, this.value)">
            </td>
            <td>$${producto.total.toFixed(2)}</td>
            <td>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tablaProductos.appendChild(fila);
    });
}

// Función para actualizar el total
function actualizarTotal() {
    let total = productos.reduce((acc, producto) => acc + producto.total, 0);
    document.getElementById("total").innerText = total.toFixed(2);
}

// Función para modificar la cantidad de un producto
function modificarCantidad(index, cantidad) {
    productos[index].cantidad = parseInt(cantidad);
    productos[index].total = productos[index].precio * productos[index].cantidad;
    mostrarProductos();
    actualizarTotal();
}

// Función para eliminar un producto
function eliminarProducto(index) {
    productos.splice(index, 1); // Eliminar el producto del array
    mostrarProductos();
    actualizarTotal();
}

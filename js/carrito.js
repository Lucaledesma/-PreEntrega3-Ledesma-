/****** CARRITO *****/
const productosLS = JSON.parse(localStorage.getItem("productos-carrito"));
const carritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#contenedor-carrito");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-compra");
/*let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");*/

if (productosLS){

    carritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.remove("disabled");
    contenedorCarritoAcciones.classList.remove("disabled");
    carritoComprado.classList.add("disabled");

    contenedorCarritoProductos.innerHTML = "";

    productosLS.forEach(producto => {
        const carritoDiv = document.createElement("div");
        carritoDiv.classList.add("carrito-producto")
        carritoDiv.innerHTML = `
            <img class="carrito-img" src="${producto.img}" alt="${producto.nombre}">
            <div>
            <small>Nombre</small>
            <p><strong>${producto.nombre}</strong></p>
            </div>
            <div>
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div>
                <small>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div>
                <small>Subtotal</small>
                <p>$${producto.precio * producto.cantidad}</p>
            </div>
            <div>
                <button class="producto-boton" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            </div>`;
        
        contenedorCarritoProductos.append(carritoDiv);

    });

} else {

    carritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    carritoComprado.classList.add("disabled");

}
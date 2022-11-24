const productos = [
    {
        id: 1,
        nombre: "Battlefield 2042",
        precio: 1100,
        img: "./img/productos/01.jpg"
    },
    {
        id: 2,
        nombre: "DOOM Eternal",
        precio: 1200,
        img: "./img/productos/02.jpg"
    },
    {
        id: 3,
        nombre: "Red Dead Redemption 2",
        precio: 1300,
        img: "./img/productos/03.jpg"
    },
    {
        id: 4,
        nombre: "Fifa 23",
        precio: 1400,
        img: "./img/productos/04.jpg"
    },
    {
        id: 5,
        nombre: "GOW Ragnarok",
        precio: 1500,
        img: "./img/productos/05.jpg"
    },
    {
        id: 6,
        nombre: "Call Of Duty MW2",
        precio: 1600,
        img: "./img/productos/06.jpg"
    },
    {
        id: 7,
        nombre: "A Way Out",
        precio: 1700,
        img: "./img/productos/07.jpg"
    },
    {
        id: 8,
        nombre: "Elder Ring",
        precio: 1800,
        img: "./img/productos/08.jpg"
    },
]

const carritoProductos = document.querySelector("#productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const cantidad = document.querySelector("#cantidad-productos");

cargarproductos(productos);

/***** FUNCIONES *****/
function cargarproductos(productos) {

    carritoProductos.innerHTML = "";

    productos.forEach( producto => {

        const item = document.createElement("div");
        item.classList.add("item-carrito");
        item.innerHTML += `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="descripcion">
            <p><b>${producto.nombre}</b></p>
            <p>$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">AGREGAR</button>
            </div>`;

        carritoProductos.append(item);

    });

    actualizarBotonesAgregar();

}

function actualizarBotonesAgregar(){

    botonesAgregar = document.querySelectorAll(".producto-agregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarProductoCarrito);
    });

}

let productosEnCarrito;
const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-carrito"));

if (productosEnCarritoLS){
    productosEnCarrito = productosEnCarritoLS;
    actualizarCantidad();
} else{
    productosEnCarrito = [];
}

function agregarProductoCarrito(e){
        
    const idBoton = e.currentTarget.id;
    const productoAgregar = productos.find(producto => producto.id == idBoton);

    if (productosEnCarrito.some(producto => producto.id == idBoton)){
        const indexProducto = productosEnCarrito.findIndex(producto => producto.id == idBoton);
        productosEnCarrito[indexProducto].cantidad += 1;
    } else{
        productoAgregar.cantidad = 1;
        productosEnCarrito.push(productoAgregar);
    }

    actualizarCantidad();

    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarCantidad(){
    let num = productosEnCarrito.reduce((acumulador, producto) => acumulador + producto.cantidad , 0);
    cantidad.innerText = num;
}

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
// Creamos Nuestros Productos con Objetos
let id = 0 // => Variable id Global

class Producto{
    constructor( imagen, nombre, precio, stock){
        this.id = id 
        this.imagen = imagen
        this.nombre = nombre
        this.precio= precio
        this.cantidad = 1
        this.stock = stock
        id = id + 1
    }

}

const bacardi = new Producto('build/img/bacardi', 'Bacardí', 3499, 12)
const cocaCola = new Producto('build/img/coca', 'Coca Cola', 599, 84)
const fernet = new Producto('build/img/fernet', 'Fernet', 1999, 55)
const gancia = new Producto('build/img/gancia', 'Gancia', 1199, 16)
const jackDaniels = new Producto('build/img/jackDaniels', 'Jack Daniel`s', 9999, 29)
const terma = new Producto('build/img/terma', 'Terma', 299, 33)

//Crear un array con catálogo de productos

const productos = [bacardi, cocaCola, fernet, gancia, jackDaniels, terma]

// Array para el carrito

let carrito = []

// CARGAR CARRITO DESDE LOCALSTORAGE
// Si hay algo en el localStorage lo cargamos en el carrito, si no es porque esta vacio.

if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'))
}

// Modificamos el DOM

const contenedorProductos = document.getElementById('contenedorProductos')


// Mostrar los productos
const mostrarProductos = () => {
    contenedorProductos.innerHTML = ''
    productos.forEach( producto => {
        const li = document.createElement('li')
        producto.nombre === 'Coca Cola' ? li.classList.add('card--coca'): li.classList.add('card')
        li.innerHTML = `<div class="card__imagen">
                            <picture>
                                <source srcset="${producto.imagen}.avif" type="image/avif">
                                <source srcset="${producto.imagen}.webp" type="image/webp">
                                <img loading="lazy" src="${producto.imagen}.jpg" width="" height="" alt="imagen bebida">
                            <picture>
                        </div>
                            <h2 class="card__heading">${producto.nombre}</h2>
                            <p class="card__stock">Stock: ${producto.stock} Unidades</p>
                            <p class="card__price">$ ${producto.precio}</p>
                        <button class="card__boton" id="boton${producto.id}">Agregar</button>`
        contenedorProductos.appendChild(li)

        // Agregar productos al carrito
        const boton = document.getElementById(`boton${producto.id}`)
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
        })
    })
}
mostrarProductos()
const agregarAlCarrito = (id) => {
    const productoCarrito = carrito.find(producto => producto.id === id)
    if(productoCarrito) {
        productoCarrito.cantidad++
        productoCarrito.stock--
    }else {
        const producto = productos.find(producto => producto.id === id)
        producto.stock--
        carrito.push(producto)
    }
    // ALMACENAR EN LOCALSTORAGE 
    localStorage.setItem('carrito', JSON.stringify(carrito))
    mostrarProductos()
    calcularTotal()
}

// MOSTRAR CARRITO
const contenedorCarrito = document.getElementById('carritoJs')
const verCarrito = document.getElementById('verCarrito')

verCarrito.addEventListener('click', () => {
    mostrarCarrito()
})


const mostrarCarrito = () => {
    contenedorCarrito.innerText = ''
    carrito.forEach(producto => {
        const li = document.createElement('li')
        li.classList.add('card')
        li.innerHTML = `<div class="card__imagen">
                            <picture>
                                <source srcset="${producto.imagen}.avif" type="image/avif">
                                <source srcset="${producto.imagen}.webp" type="image/webp">
                                <img loading="lazy" src="${producto.imagen}.jpg" width="" height="" alt="imagen bebida">
                            <picture>
                        </div>
                        <h2 class="card__heading">${producto.nombre}</h2>
                        <div class="mostrar">
                            <p class="mostrar__texto"> Cantidad: ${producto.cantidad}</p>
                            <button class="mostrar__mas" id="agregar">+</button>
                            <button class="mostrar__menos" id="restar">-</button>
                        </div>
                        <button class="card__boton" id="eliminar${producto.id}">Eliminar</button>`
        contenedorCarrito.appendChild(li)

        // Eliminar Productos desde el carrito
        const boton = document.getElementById(`eliminar${producto.id}`)
        boton.addEventListener('click', () => {
            eliminarDelCarrito(producto.id)
        })
    })
    calcularTotal()
}

// Eliminar producto del carrito

const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id)
    const indice = carrito.indexOf(producto)

    cantidad = producto.cantidad
    newId = producto.id
    productos[newId].stock += cantidad
    productos[newId].cantidad = 1
    
    carrito.splice(indice, 1)
    mostrarProductos()
    mostrarCarrito() 
    // localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Mostrar el total de la compra 
const total = document.getElementById('total')

const calcularTotal = () => {
    let totalCompra = 0
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad
    })
    total.innerHTML = `Total: $${totalCompra}`
}


// Vaciar TODO el Carrito
const vaciarCarrito = document.getElementById('vaciarCarrito')
vaciarCarrito.addEventListener('click', () => {
    eliminarTodoElCarrito()
})

eliminarTodoElCarrito = () => {
    carrito.forEach(producto => {
        cantidad = producto.cantidad
        newId = producto.id
        productos[newId].stock += cantidad
        productos[newId].cantidad = 1
    })
    carrito = []
    mostrarCarrito()
    mostrarProductos()
    
    // vaciar localStorage 
    localStorage.clear()
}

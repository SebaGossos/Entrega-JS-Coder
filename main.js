// Creamos Nuestros Productos con Objetos
let id = 0 // => Variable id Global


// -------------------CREATE
class Producto{
    constructor( imagen, nombre, precio, stock){
        this.id = id 
        this.imagen = imagen
        this.nombre = nombre
        this.precio= precio
        this.cantidad = 1
        this.stock = stock
        id++
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
// Si hay algo en el localStorage lo cargamos en el carrito y actualizamos el array de productos con los valores del localStorage del carrito.
if(localStorage.getItem('carrito')){
    const carritoDiferentCelda = JSON.parse(localStorage.getItem('carrito'))
    carritoDiferentCelda.forEach(productoCarrito => {
       const actualizarPropiedades = productos.find(articulo => articulo.id === productoCarrito.id)
       actualizarPropiedades.stock -= productoCarrito.cantidad
       actualizarPropiedades.cantidad = productoCarrito.cantidad
       carrito.push(actualizarPropiedades)
    })
}


// Modificamos el DOM
const contenedorProductos = document.getElementById('contenedorProductos')



///////////////////////////////////////////////////////////////////////
// -------------------READ
// MOSTRAR PRODUCTOS
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

// MOSTRAR CARRITO

const mostrarTituloVaciar = document.getElementById('mostrarTituloVaciar')
const contenedorCarrito = document.getElementById('carritoJs')
const verCarrito = document.getElementById('verCarrito')
const botonVaciarCarrito = document.createElement('button')

verCarrito.addEventListener('click', () => {
    if (carrito.length > 0){
        mostrarCarrito()
    }else{
        alert('No hay productos en el carrito!')
    }
})

const mostrarCarrito = () => {

    contenedorCarrito.innerText = ''
        // Agregar html antes de mostrar carrito
        const tituloCarrito = document.createElement('h2')
        
        mostrarTituloVaciar.innerText = ''
    
        tituloCarrito.classList.add('carrito__heading', 'principal__heading')
        tituloCarrito.innerText = 'Carrito de Compras'
        botonVaciarCarrito.classList.add('card__boton', 'carrito__boton')
        botonVaciarCarrito.innerText = 'Vaciar Carrito'
    
        mostrarTituloVaciar.append(tituloCarrito, botonVaciarCarrito)

    // Crear las cards de cada producto dentro del carrito
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
                            <button class="mostrar__mas" id="agregar${producto.id}">+</button>
                            <button class="mostrar__menos" id="restar${producto.id}">-</button>
                        </div>
                        <button class="card__boton card__boton-eliminar" id="eliminar${producto.id}">Eliminar</button>`
        contenedorCarrito.appendChild(li)

        // Eliminar Productos desde el carrito
        const boton = document.getElementById(`eliminar${producto.id}`)
        boton.addEventListener('click', () => {
            eliminarDelCarrito(producto.id)
        })

        // ++++++++++++++++++++++++++++++++++++++++++++++++
        // Sumar Cantidad desde el producto en el carrito +
        const botonSumar = document.getElementById(`agregar${producto.id}`)
        botonSumar.addEventListener('click', () => sumarProducto(producto.id))

        // ------------------------------------------------
        // Restar Cantidad desde el producto del carrito -
        const botonRestar = document.getElementById(`restar${producto.id}`)
        botonRestar.addEventListener('click', () => restarProducto(producto.id))
    })
    mostrarOpcionesCarrito()
}

const opcionesCarrito = document.getElementById('mostrarOpcionesCarrito')

const mostrarOpcionesCarrito = () =>{
    // Agregando el boton de compra y el total
    opcionesCarrito.className = 'carrito__finalizar'
    opcionesCarrito.innerHTML = `   <p class="carrito__total" id="total"></p>
                                            <button id="comprar" class="card__boton carrito__comprar">Comprar</button>`
    calcularTotal()
    // Finalizar Compra
    const botonComprar = document.getElementById('comprar')
    botonComprar.addEventListener('click', () => comprarProductos(calcularTotal()))
}


                    
const contenedorCompra = document.getElementById('contenedorCompra')

const comprarProductos = (total) => {
    const comprarUl = document.getElementById('finalizarCompra')
    resetearHtml.className = 'contenedor principal cards'
    carrito.forEach(producto => {
        const li = document.createElement('li')
        li.className='card'
        li.innerHTML = `<div class="card__imagen">
                            <picture>
                                <source srcset="${producto.imagen}.avif" type="image/avif">
                                <source srcset="${producto.imagen}.webp" type="image/webp">
                                <img loading="lazy" src="${producto.imagen}.jpg" width="" height="" alt="imagen bebida">
                            <picture>
                        </div>
                        <h2 class="card__heading">${producto.nombre}</h2>
                        <p class="mostrar__cantidad"> Cantidad: ${producto.cantidad}</p>
                        <p class="mostrar__total"> Total: $${producto.cantidad * producto.precio}</p>
                        `
        comprarUl.appendChild(li)
    })
    contenedorCompra.innerHTML = `  <p class="carrito__total" id="total">Total: $${total}</p>
                                    <button class="card__boton carrito__comprar" id="menuPrincipal">Menu Principal</button>
                                `
                                
                                
    const botonMenuPrincipal = document.getElementById('menuPrincipal')
    botonMenuPrincipal.onclick = () => {

        mostrarProductos()
    }
    // finalizarCompra()
}


///////////////////////////////////////////////////////////////////////
// -------------------UPDATE
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
    mostrarCarrito()
}

// Calcular el total de la compra 
const calcularTotal = () => {
    const total = document.getElementById('total')
    let totalCompra = 0
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad
    })
    total.innerHTML = `Total $${totalCompra}`
    return totalCompra
}

// Sumar +++++++++++++
const sumarProducto = (id) => {
    const productoSumar = carrito.find(producto => producto.id === id)
    if(productoSumar.stock < 1){
        alert(`No hay mas stock que ${productoSumar.cantidad} unidades por el momento!`)
    }else{
        productoSumar.cantidad++
        productoSumar.stock--
        localStorage.setItem('carrito', JSON.stringify(carrito))
        mostrarProductos()
        mostrarCarrito()
    }
}

// Restar ------------
const restarProducto = (id) => {
    const productoRestar = carrito.find(producto => producto.id === id)
    const stock = productoRestar.stock + productoRestar.cantidad
    if(productoRestar.stock >= (stock - 1)){
        eliminarDelCarrito(id)
    }else{
        productoRestar.cantidad--
        productoRestar.stock++
        localStorage.setItem('carrito',JSON.stringify(carrito))
        mostrarProductos()
        mostrarCarrito()
    }

}

// Comprar
const finalizarCompra = () => {
    carrito.forEach(producto => {
        let cantidad = producto.cantidad
        let newId = producto.id
        productos[newId].stock -= cantidad
        productos[newId].cantidad = 1
    }) 
    carrito = []
    mostrarCarrito()
    mostrarProductos()
    
    // vaciar localStorage 
    localStorage.removeItem('carrito')
}



///////////////////////////////////////////////////////////////////////
// -------------------DELET
// Eliminar 1 producto del carrito
const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id)
    const indice = carrito.indexOf(producto)

    let cantidad = producto.cantidad
    let newId = producto.id
    productos[newId].stock += cantidad
    productos[newId].cantidad = 1
    
    carrito.splice(indice, 1)
    mostrarProductos()
    mostrarCarrito() 
    // localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

// Vaciar TODO el Carrito

botonVaciarCarrito.addEventListener('click', () => {
    mostrarTituloVaciar.innerHTML = ''
    contenedorCarrito.innerHTML = ''
    opcionesCarrito.innerHTML = ''
    eliminarTodoElCarrito()
})
eliminarTodoElCarrito = () => {
    carrito.forEach(producto => {
        let cantidad = producto.cantidad
        let newId = producto.id
        productos[newId].stock += cantidad
        productos[newId].cantidad = 1
    }) 
    carrito = []

    mostrarProductos()
    
    // vaciar localStorage 
    localStorage.removeItem('carrito')
}


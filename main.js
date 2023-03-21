// Creamos Nuestros Productos con Objetos
let id = 0; // => Variable id Global
let inicioSesion = false;

// -------------------CREATE

// CLASES-------------------
class Producto {
  constructor(imagen, nombre, precio, stock) {
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = 1;
    this.stock = stock;
    id++;
  }
}

const bacardi = new Producto("build/img/bacardi", "Bacardí", 10, 12);
const cocaCola = new Producto("build/img/coca", "Coca Cola", 1.5, 84);
const fernet = new Producto("build/img/fernet", "Fernet", 5.3, 55);
const gancia = new Producto("build/img/gancia", "Gancia", 3.1, 16);
const jackDaniels = new Producto(
  "build/img/jackDaniels",
  "Jack Daniel`s",
  26.1,
  29
);
const terma = new Producto("build/img/terma", "Terma", 0.85, 33);

//PRODUCTOS
//Crear un array con catálogo de productos
const productos = [bacardi, cocaCola, fernet, gancia, jackDaniels, terma];
// console.log(productos)
// Array para el carrito
let carrito = [];

// CARGAR CARRITO DESDE LOCALSTORAGE
// Si hay algo en el localStorage lo cargamos en el carrito y actualizamos el array de productos con los valores del localStorage del carrito.
if (localStorage.getItem("carrito")) {
  const carritoDiferentCelda = JSON.parse(localStorage.getItem("carrito"));
  carritoDiferentCelda.forEach((productoCarrito) => {
    const actualizarPropiedades = productos.find(
      (articulo) => articulo.id === productoCarrito.id
    );
    actualizarPropiedades.stock -= productoCarrito.cantidad;
    actualizarPropiedades.cantidad = productoCarrito.cantidad;
    carrito.push(actualizarPropiedades);
  });
}

// Array de usuarios
let usuarios = [];

if (localStorage.getItem("usuarios")) {
  let usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios"));
  usuarios = [];
  usuariosLocalStorage.forEach((usuario) => {
    usuarios.push(usuario);
  });
  id = usuarios.length;
}

///////////////////////////////////////////////////////////////////////
// -------------------READ
// HEADER---------------

// INICIO
const botonInicioSesion = document.getElementById("botonIniciarSesion");
const contenedorRegistro = document.getElementById("contenedorRegistro");
const panelDeInicioSesion = () => {
  contenedorRegistro.className = "formulario";
  contenedorRegistro.innerHTML = `<form class="formulario__inicio">
                                        <div class="formulario__campo">
                                            <label for="usuario" class="formulario__label">Usuario</label>
                                            <input id="usuario" class="formulario__input" placeholder="Coloque su usuario" type="email">
                                        </div>
                                        <div class="formulario__campo">
                                            <label for="contrasena" class="formulario__label">Contraseña</label>
                                            <input id="contrasena" class="formulario__input" placeholder="Coloque su contraseña" type="password">
                                        </div>
                                        <button id="botonISesion" class="formulario__boton">Inciciar Sesion</button>
                                    </form>`;
  const botonCierreInicioSesion = document.getElementById("botonISesion");
  botonCierreInicioSesion.addEventListener("click", () => {
    const campoUsuarioIniciar = document.getElementById("usuario").value;
    const campoContrasenaIniciar = document.getElementById("contrasena").value;
    let verificar = [];
    usuarios.find((usuario) => {
      if (
        (usuario.email === campoUsuarioIniciar) &
        (usuario.contrasena === campoContrasenaIniciar)
      ) {
        verificar.push(usuario);
      }
    });
    comprobarValidacion(verificar);
  });
};
botonInicioSesion.addEventListener("click", () => panelDeInicioSesion());

const comprobarValidacion = (datos) => {
  if (datos.length === 1) {
    contenedorRegistro.className = "";
    contenedorRegistro.innerHTML = `<h2 class="registrar__nombre">Bienvenid@ ${datos[0].nombre}!</h2>`;
    inicioSesion = true;
  } else {
    Toastify({
        text: `Datos Incorrectos!`,
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #E3371E 75%, #103778)",
        },
      }).showToast();
  }
};

// MOSTRAR PRODUCTOS
// Modificamos el DOM
const contenedorProductos = document.getElementById("contenedorProductos");
let contador = 0;
const mostrarProductos = () => {
  // Precios de productos al valor dolar blue
  fetch("https://criptoya.com/api/dolar")
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      contenedorProductos.innerHTML = "";
      let cantidadProductos = productos.length;
      let productoPrecio;

      productos.forEach((producto) => {
        if (contador >= cantidadProductos) {
          productoPrecio = producto.precio;
          console.log(contador);
        } else {
          productoPrecio = Math.ceil(producto.precio * datos.blue);
          producto.precio = productoPrecio;
          contador++;
          console.log(contador);
        }
        const li = document.createElement("li");
        producto.nombre === "Coca Cola"
          ? li.classList.add("card--coca")
          : li.classList.add("card");
        li.innerHTML = `<div class="card__imagen">
                            <picture>
                                <source srcset="${producto.imagen}.avif" type="image/avif">
                                <source srcset="${producto.imagen}.webp" type="image/webp">
                                <img loading="lazy" src="${producto.imagen}.jpg" width="" height="" alt="imagen bebida">
                            <picture>
                        </div>
                            <h2 class="card__heading">${producto.nombre}</h2>
                            <p class="card__stock">Stock: ${producto.stock} Unidades</p>
                            <p class="card__price">$ ${productoPrecio}</p>
                            <button class="card__boton" id="boton${producto.id}">Agregar</button>`;
        contenedorProductos.appendChild(li);

        // Agregar productos al carrito
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
          agregarAlCarrito(producto.id);
        });
      });
    })
    .catch((error) => error);
};
mostrarProductos();

// MOSTRAR CARRITO
const mostrarTituloVaciar = document.getElementById("mostrarTituloVaciar");
const contenedorCarrito = document.getElementById("carritoJs");
const verCarrito = document.getElementById("verCarrito");
const botonVaciarCarrito = document.createElement("button");

verCarrito.addEventListener("click", () => {
  // Si existen productos en el carrito los mostras, si no vacia el html y avisa que no hay!
  if (carrito.length > 0) {
    mostrarCarrito();
  } else {
    mostrarTituloVaciar.innerHTML = "";
    contenedorCarrito.innerHTML = "";
    opcionesCarrito.innerHTML = "";
    Toastify({
        text: `No hay productos en el carrito!`,
        duration: 3000,
        gravity: "top",
        position: "left",
        style: {
          background: "linear-gradient(to right, #E3371E 75%, #103778)",
        },
      }).showToast();
  }
});

const mostrarCarrito = () => {
  contenedorCarrito.innerText = "";

  // Agregar html en la seccion carrito antes de mostrar los productos
  const tituloCarrito = document.createElement("h2");
  mostrarTituloVaciar.innerText = "";

  tituloCarrito.classList.add("carrito__heading");
  tituloCarrito.innerText = "Carrito de Compras";
  botonVaciarCarrito.classList.add("card__boton", "carrito__boton");
  botonVaciarCarrito.innerText = "Vaciar Carrito";

  // Agregando al contenedor
  mostrarTituloVaciar.append(tituloCarrito, botonVaciarCarrito);

  // Crear las cards de cada producto dentro del carrito
  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.classList.add("card");
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
                        <button class="card__boton card__boton-eliminar" id="eliminar${producto.id}">Eliminar</button>`;
    contenedorCarrito.appendChild(li);
    contenedorCarrito.classList.add("seccion");

    // Boton eliminar productos desde el carrito
    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });

    // ++++++++++++++++++++++++++++++++++++++++++++++++
    // Sumar Cantidad desde el producto en el carrito +
    const botonSumar = document.getElementById(`agregar${producto.id}`);
    botonSumar.addEventListener("click", () => sumarProducto(producto.id));

    // ------------------------------------------------
    // Restar Cantidad desde el producto del carrito -
    const botonRestar = document.getElementById(`restar${producto.id}`);
    botonRestar.addEventListener("click", () => restarProducto(producto.id));
  });
  mostrarOpcionesCarrito();
};

const opcionesCarrito = document.getElementById("mostrarOpcionesCarrito");
const mostrarOpcionesCarrito = () => {
  // Agregando el boton de compra y el total
  opcionesCarrito.className = "carrito__finalizar";
  opcionesCarrito.innerHTML = `   <p class="carrito__total" id="total"></p>
                                    <button id="comprar" class="card__boton carrito__comprar">Comprar</button>`;
  calcularTotal();
  // Finalizar Compra
  const botonComprar = document.getElementById("comprar");
  botonComprar.addEventListener("click", () => {
    if (inicioSesion === true) {
      contenedorCarrito.className = "cards";
      localStorage.setItem("carrito", JSON.stringify(carrito));
      comprarProductos(calcularTotal());
    } else {
      Toastify({
        text: `Debes iniciar Sesion!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #E3371E 75%, #103778)",
        },
      }).showToast();
    }
  });
};

const contenedorCompra = document.getElementById("contenedorCompra");
const comprarProductos = (total) => {
  contenedorCompra.innerText = "";
  mostrarTituloVaciar.innerHTML = "";
  contenedorCarrito.innerHTML = "";
  opcionesCarrito.innerHTML = "";
  const ul = document.createElement("ul");
  ul.className = "contenedor cards seccion";
  carrito.forEach((producto) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `<div class="card__imagen">
                            <picture>
                                <source srcset="${
                                  producto.imagen
                                }.avif" type="image/avif">
                                <source srcset="${
                                  producto.imagen
                                }.webp" type="image/webp">
                                <img loading="lazy" src="${
                                  producto.imagen
                                }.jpg" width="" height="" alt="imagen bebida">
                            <picture>
                        </div>
                        <h2 class="card__heading">${producto.nombre}</h2>
                        <p class="mostrar__cantidad"> Cantidad: ${
                          producto.cantidad
                        }</p>
                        <p class="mostrar__total"> Total: $${
                          producto.cantidad * producto.precio
                        }</p>
                        `;
    ul.appendChild(li);
  });
  contenedorCompra.appendChild(ul);
  const volverMenu = document.getElementById("volverMenu");
  volverMenu.innerHTML = `     
                                        <p class="carrito__total" id="total">Compra Realizada de: $${total}!!</p>
                                        <button class="card__boton card__boton--volverMenu" id="menuPrincipal">Menu Principal</button>
                                `;

  const botonMenuPrincipal = document.getElementById("menuPrincipal");
  botonMenuPrincipal.onclick = () => {
    contenedorCompra.innerHTML = "";
    volverMenu.innerHTML = "";
    mostrarTituloVaciar.innerHTML = "";
    contenedorCarrito.innerHTML = "";
    opcionesCarrito.innerHTML = "";
    mostrarProductos();
  };
  finalizarCompra();
};

///////////////////////////////////////////////////////////////////////
// -------------------UPDATE
const agregarAlCarrito = (id) => {
  const productoCarrito = carrito.find((producto) => producto.id === id);
  if (productoCarrito) {
    if (productoCarrito.stock < 1) {
      Toastify({
        text: `No hay mas stock que ${
          productoCarrito.cantidad
        } unidades por el momento!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #E3371E 75%, #103778)",
        },
      }).showToast();
    } else {
      productoCarrito.cantidad++;
      productoCarrito.stock--;
    }
  } else {
    const producto = productos.find((producto) => producto.id === id);
    producto.stock--;
    carrito.push(producto);
    Toastify({
      text: `${
        producto.nombre[0].toUpperCase() + producto.nombre.substring(1)
      } agregado al carrito`,
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right, #E3371E 75%, #103778)",
      },
    }).showToast();
  }

  // ALMACENAR EN LOCALSTORAGE
  localStorage.setItem("carrito", JSON.stringify(carrito));

  mostrarProductos();
  mostrarCarrito();
};

// Calcular el total de la compra
const calcularTotal = () => {
  const total = document.getElementById("total");
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad;
  });
  total.innerHTML = `Total $${totalCompra}`;
  return totalCompra;
};

// Sumar +++++++++++++
const sumarProducto = (id) => {
  const productoSumar = carrito.find((producto) => producto.id === id);
  if (productoSumar.stock < 1) {
    Toastify({
        text: `No hay mas stock que ${
            productoSumar.cantidad
        } unidades por el momento!`,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #E3371E 75%, #103778)",
        },
      }).showToast();
  } else {
    productoSumar.cantidad++;
    productoSumar.stock--;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProductos();
    mostrarCarrito();
  }
};

// Restar ------------
const restarProducto = (id) => {
  const productoRestar = carrito.find((producto) => producto.id === id);
  const stock = productoRestar.stock + productoRestar.cantidad;
  if (productoRestar.stock >= stock - 1) {
    eliminarDelCarrito(id);
  } else {
    productoRestar.cantidad--;
    productoRestar.stock++;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarProductos();
    mostrarCarrito();
  }
};

// Comprar
const finalizarCompra = () => {
  carrito.forEach((producto) => {
    let cantidad = producto.cantidad;
    let newId = producto.id;
    productos[newId].stock - cantidad;
    // if(prouductos[newId].stock === 1){
    //     prouductos[newId].cantidad = 0
    // }
    productos[newId].cantidad = 1;
  });
  carrito = [];
  // vaciar localStorage
  localStorage.removeItem("carrito");

  mostrarProductos();
};

///////////////////////////////////////////////////////////////////////
// -------------------DELET
// Eliminar 1 producto del carrito
const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id);
  const indice = carrito.indexOf(producto);

  let cantidad = producto.cantidad;
  let newId = producto.id;
  productos[newId].stock += cantidad;
  productos[newId].cantidad = 1;

  carrito.splice(indice, 1);
  mostrarProductos();
  mostrarCarrito();
  // localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// Vaciar TODO el Carrito

botonVaciarCarrito.addEventListener("click", () => {
  mostrarTituloVaciar.innerHTML = "";
  contenedorCarrito.innerHTML = "";
  opcionesCarrito.innerHTML = "";
  eliminarTodoElCarrito();
});
eliminarTodoElCarrito = () => {
  carrito.forEach((producto) => {
    let cantidad = producto.cantidad;
    let newId = producto.id;
    productos[newId].stock += cantidad;
    productos[newId].cantidad = 1;
  });
  carrito = [];

  mostrarProductos();

  // vaciar localStorage
  localStorage.removeItem("carrito");
};

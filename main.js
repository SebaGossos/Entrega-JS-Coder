const clientes = []
const carrito = []

// ------------- VIEW

function vista(){
    opcion = parseInt(prompt('Seleccione una opcion del 1 al 4 \n 1) Agregar compra al carrito \n 2) ver carrito de compra \n 3) modificar Carrito \n 4) Eliminar compra \n  - Si desea salir ingrese cualquier otro numero'))
    return opcion
}

// ------------- MODEL 

// Agregar Carrito
class Cliente{

    constructor(nombre, dni, edad){
        this.nombre = nombre
        this.dni = dni
        this.edad = edad
    }
}
class Producto{
    constructor(producto, precio, cantidad){
        this.producto = producto
        this.precio = precio
        this.cantidad = cantidad
    }
}
function crear(){
    edad = parseInt(prompt('Ingrese su edad: '))
    if(edad > 17){

        //Cliente
        clienteNombre = prompt('Ingrese su nombre: ')
        clienteDni = parseInt(prompt('Ingrese su numero de documento: '))
        clienteNuevo = new Cliente(clienteNombre, clienteDni, edad)
        clientes.push(clienteNuevo)

        //Producto
        productoNombre = prompt('Ingrese el nombre del producto: ')
        productoPrecio = parseFloat(prompt('Ingrese el precio del producto: '))
        productoCantidad = parseInt(prompt('Ingrese la cantidad del producto: '))
        productoNuevo = new Producto(productoNombre, productoPrecio, productoCantidad);
        carrito.push(productoNuevo)
    }else{
        alert('Menor de Edad, regrese con un mayor..')
    }
}


// Ver carrito 
function revisar(){
    let dni = parseInt(prompt('Ingrese su documento para buscar su compra: '))
    let booleano = clientes.some(doc => doc.dni === dni)
    
    if(booleano === true){
        let cliente = clientes.find(a => a.dni === dni)
        let indice = clientes.indexOf(cliente)
        let producto = carrito[indice]
        console.log(cliente)
        console.log(producto)
    }else{alert('Ingrese un dni valido!')}
    
}
function mostrarTodo() {
    clientes.forEach(cliente =>{
        console.log(cliente)
    })
    carrito.forEach(producto => {
        console.log(producto);
    })
}


// Modificar Compra
function modificar(){
    let dni = parseInt(prompt('Ingrese el dni con el que realizo la compra'))
    let booleano = clientes.some(doc => doc.dni === dni)
    
    if(booleano === true){
        let pregunta = parseInt(prompt('Que desea modificar, el usuario(1) o la compra(2) seleccione un numero: '))
        let encontrarCliente = clientes.find(a => a.dni === dni)
        let indice = clientes.indexOf(encontrarCliente) 

        if (pregunta === 1){
            let nuevaEdad = parseInt(prompt('Ingrese su edad a actualizar: '))
            let nuevaNombre = prompt('Ingrese su nombre a actualizar: ')

            clienteNuevo = new Cliente(nuevaNombre, dni, nuevaEdad)
            clientes.splice(indice, 1, clienteNuevo)
            console.log(clientes[indice])

        }else if (pregunta === 2){
            let nuevoProducto = prompt('Ingrese el nombre del nuevo producto: ')
            let nuevoPrecio = parseInt(prompt('Ingrese su nuevo precio: '))
            let nuevoCantidad = parseInt(prompt('Ingrese su nueva cantidad: '))

            carrito[indice].producto = nuevoProducto
            carrito[indice].precio = nuevoPrecio
            carrito[indice].cantidad = nuevoCantidad
            console.log(carrito[indice])

        }else{alert('INGRESE UNA OPCION VALIDA')}
    }else{alert('Ingrese un dni valido!')}
}


// Eliminar Compra
function eliminar(){
    let dni = parseInt(prompt('Ingrese el dni con el que realizo la operacion: '))
    let booleano = clientes.some(doc => doc.dni === dni)
    
    if(booleano === true){
        let encontrarCliente = clientes.find(doc => doc.dni === dni)
        let indice = clientes.indexOf(encontrarCliente)
        alert(`El cliente con el nombre ${clientes[indice].nombre} fue eliminad@ del sistema, nv ;) `)
        clientes.splice(indice, 1)
        carrito.splice(indice, 1)
    }else{alert('Ingrese un dni valido!')}
}




// ------------- CONTEINER
alert('BIENVENIDO A LA PAGINA WEB DEL CENTRAL DE BEBIDAS DE MDZ-ARG :)')
opcion = vista()
while (opcion > 0 & opcion < 5){
    if (opcion === 1){
        crear()
    }else if(opcion === 2){
        revisar()
    }else if(opcion === 3){
        modificar()
    }else if (opcion === 4){
        eliminar()
    }
    vista()
}
mostrarTodo()
alert('SALIO DEL SISTEMA DEL CENTRAL DE BEBIDAS, HASTA PRONTO!')







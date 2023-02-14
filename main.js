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
    let cliente = clientes.find(a => a.dni === dni)
    let indice = clientes.indexOf(cliente)
    let producto = carrito[indice]
    console.log(cliente)
    console.log(producto)
    
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
    
}


// Eliminar Compra
function eliminar(){
    
}




// ------------- CONTEINER

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
alert('SALIO DEL SISTEMA')







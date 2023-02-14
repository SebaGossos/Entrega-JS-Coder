const clientes = []
const carrito = []

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

    clienteNuevo = new Cliente('juan', 12323, 33)
    clienteNuevo1 = new Cliente('pepe', 23233, 34)
    clientes.push(clienteNuevo, clienteNuevo1)


    productoNuevo = new Producto('aaaaa', 22, 3);
    productoNuevo1 = new Producto('bbbbb', 23, 4);
    carrito.push(productoNuevo, productoNuevo1)

    console.log(clientes)
    console.log(carrito)


let cliente = clientes.find(a => a.dni === 23233)
cliente.nombre = 'juan carlos'
console.log(cliente)

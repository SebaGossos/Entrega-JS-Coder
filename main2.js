let number = 34535
number---
console.log(number)

class Objeto{
    constructor(nombre){
        this.nombre = nombre
    }
}
const shneider = new Objeto('Shneider')

const compania = [shneider]
let carritos = [shneider]

carritos.forEach(producto => {
    producto.nombre = 'caca'
})

console.log(compania[0].nombre)
console.log(carritos[0].nombre)


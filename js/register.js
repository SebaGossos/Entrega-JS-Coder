
// COMPROBAR QUE EL USUARIO A REGISTRAR SEA VALIDO!!
// Class
class Usuario{
    constructor(nombre, apellido, email, edad){
        this.id = id
        this.nombre = nombre
        this.apellido= apellido
        this.email = email
        this.edad = edad
        id++
    }
}

// Array de usuarios
let usuarios = []

if(localStorage.getItem('usuarios')){
    let usuariosLocalStorage = JSON.parse(localStorage.getItem('usuarios'))
    usuarios = []
    usuariosLocalStorage.forEach(usuario => {
        usuarios.push(usuario)
    })
    id = usuarios.length

}


// CREANDO USUARIOS
// DOM FORMULARIO
const formulario = document.getElementById('formulario')
// FUNCTION PARA AGREGAR USUARIOS AL ARRAY
formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    const campoNombre = document.getElementById('nombre').value
    const campoApellido = document.getElementById('apellido').value
    const campoEmail = document.getElementById('email').value
    const campoEdad = document.getElementById('edad').value
    agregarUsuario(campoNombre, campoApellido, campoEmail, campoEdad)
    // formulario.reset()
})

const agregarUsuario = (nombre, apellido, email, edad) => {
    if (nombre === '' | apellido === '' | email === '' | edad === ''){
        alert('Debes llenar todos los campos del formulario!!')
        document.getElementById('nombre').focus()
    }else{
        crearUsuario(mayorEdad(edad), nombre, apellido, email, edad)
    }
}


const solicitarEdad = (edad) => {
    return new Promise((resolve, reject) => {
        if (edad === true) {
            resolve()
        }else{
            reject(alert('Sos menor de edad anda pa alla!'))
        }
    })
}

const crearUsuario = (booleano, nombre, apellido, email, edad) => {
    const respuesta = comprobarRepetidos(email)
    solicitarEdad(booleano)
    .then(() => {
        if(usuarios.length < 1){
            const nuevoUsuario =  new Usuario(nombre, apellido, email, edad)
            usuarios.push(nuevoUsuario)
            localStorage.setItem('usuarios',JSON.stringify(usuarios))
        }else if(respuesta === true){
            alert('El Usuario ya ha sido creado!')
        }else{
            const nuevoUsuario =  new Usuario(nombre, apellido, email, edad)
            usuarios.push(nuevoUsuario)
            localStorage.setItem('usuarios',JSON.stringify(usuarios))
        }
    })
    .catch((error) => error)
}


function comprobarRepetidos(email){
    let resultado = false
    usuarios.find(usuario => {
       if(usuario.email === email){
        resultado = true
       }
    })
    return resultado
}







function mayorEdad(edad){
    const fechaActual = new Date()
    const cumpleanos = new Date(edad)
    let ano = fechaActual.getFullYear() - cumpleanos.getFullYear()
    let mes = fechaActual.getMonth() - cumpleanos.getMonth()
    let dia = fechaActual.getDate() - cumpleanos.getUTCDate()
    if(mes < 0 || (mes === 0 && dia < 0)){
        ano--
    }
    return ano >= 18
}
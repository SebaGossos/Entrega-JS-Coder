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
const usuarios = []

// CREANDO USUARIOS
// DOM FORMULARIO
const enviarFormularioRegistro = document.getElementById('enviarFormularioRegistro')

// FUNCTION PARA AGREGAR USUARIOS AL ARRAY
enviarFormularioRegistro.addEventListener('click', () => {
    const campoNombre = document.getElementById('nombre').value
    const campoApellido = document.getElementById('apellido').value
    const campoEmail = document.getElementById('email').value
    const campoEdad = document.getElementById('edad').value
    agregarUsuario(campoNombre, campoApellido, campoEmail, campoEdad)
})
const agregarUsuario = (nombre, apellido, email, edad) => {
    if (nombre == '' | apellido == '' | email == '' | edad == ''){
        alert('Complete el campo con su informacion!')
    }else{
        alert(edad)
        const nuevoUsuario =  new Usuario(nombre, apellido, email, edad)
        // usuarios.push(nuevoUsuario)
        // localStorage.setItem('usuarios',JSON.stringify(usuarios))
    }
}
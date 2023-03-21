let id = 0;

// COMPROBAR QUE EL USUARIO A REGISTRAR SEA VALIDO!!
// Class
class Usuario {
  constructor(nombre, contrasena, email, edad) {
    this.id = id;
    this.nombre = nombre;
    this.contrasena = contrasena;
    this.email = email;
    this.edad = edad;
    id++;
  }
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

// CREANDO USUARIOS
// DOM FORMULARIO
const formulario = document.getElementById("formulario");
// FUNCTION PARA AGREGAR USUARIOS AL ARRAY
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const campoNombre = document.getElementById("nombre").value;
  const campoContrasena = document.getElementById("contrasena").value;
  const campoEmail = document.getElementById("email").value;
  const campoEdad = document.getElementById("edad").value;
  agregarUsuario(campoNombre, campoContrasena, campoEmail, campoEdad);
});

const agregarUsuario = (nombre, contrasena, email, edad) => {
  if ((nombre === "") | (contrasena === "") | (email === "") | (edad === "")) {
    Toastify({
      text: `Debes llenar todos los campos del formulario!!`,
      duration: 3000,
      gravity: "top",
      position: "center",
      style: {
        background: "linear-gradient(to right, #E3371E 75%, #103778)",
      },
    }).showToast();
    formulario.reset();
    document.getElementById("nombre").focus();
  } else {
    crearUsuario(mayorEdad(edad), nombre, contrasena, email, edad);
  }
};

const solicitarEdad = (edad) => {
  return new Promise((resolve, reject) => {
    if (edad === true) {
      resolve();
    } else {
      reject("Sos menor de edad anda pa alla!");
    }
  });
};

const crearUsuario = (booleano, nombre, contrasena, email, edad) => {
  const respuesta = comprobarRepetidos(email);
  solicitarEdad(booleano)
    .then(() => {
      if (usuarios.length < 1) {
        const nuevoUsuario = new Usuario(nombre, contrasena, email, edad);
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        Swal.fire({
          title: "Inicio de Sesión Satisfactorio",
          icon: "success",
          confirmButtonText: "Menu Principal",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "";
          }
        });
      } else if (respuesta === true) {
        Toastify({
          text: `El Usuario ya ha sido creado!`,
          duration: 3000,
          gravity: "top",
          position: "center",
          style: {
            background: "linear-gradient(to right, #E3371E 75%, #103778)",
          },
        }).showToast();
      } else {
        const nuevoUsuario = new Usuario(nombre, contrasena, email, edad);
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        Swal.fire({
          title: "Inicio de Sesión Satisfactorio",
          icon: "success",
          confirmButtonText: "Menu Principal",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "../index.html";
          }
        });
      }
    })
    .catch((error) => {
      Toastify({
        text: error,
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
          background: "linear-gradient(to right, #E3371E 75%, #103778)",
        },
      }).showToast();
    });
};

function comprobarRepetidos(email) {
  let resultado = false;
  usuarios.find((usuario) => {
    if (usuario.email === email) {
      resultado = true;
    }
  });
  return resultado;
}

function mayorEdad(edad) {
  const fechaActual = new Date();
  const cumpleanos = new Date(edad);
  let ano = fechaActual.getFullYear() - cumpleanos.getFullYear();
  let mes = fechaActual.getMonth() - cumpleanos.getMonth();
  let dia = fechaActual.getDate() - cumpleanos.getUTCDate();
  if (mes < 0 || (mes === 0 && dia < 0)) {
    ano--;
  }
  return ano >= 18;
}

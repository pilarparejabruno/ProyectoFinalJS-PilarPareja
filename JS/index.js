//Validacion del input y registro de emails
const inputEmail = document.getElementById("E-mail");
const btnSuscribir = document.getElementById("btn-suscribirse");
const formSuscribir = document.querySelector("#formSuscribir");

const cuentasEmail = [];

function validarInput() {
  if (inputEmail.value.includes("@")) {
    verificarEmailRegistrado();
  } else {
    Swal.fire({
      text: `Por favor ingrese un email válido`,
      icon: "error",
      iconColor: "#beb894",
      confirmButtonColor: "#beb894",
    });
  }
}

function verificarEmailRegistrado() {
  const existe = cuentasEmail.some((mail) => mail.email === inputEmail.value);
  if (existe) {
    const email = cuentasEmail.find((correo) => {
      return correo.email === inputEmail.value;
    });
    if (inputEmail.value === email.email) {
      Swal.fire({
        title: "Email ya registrado",
        text: `Por favor ingrese otro`,
        icon: "warning",
        iconColor: "#beb894",
        confirmButtonColor: "#beb894",
      });
    }
  } else {
    registrarEmail();
  }
}

btnSuscribir.addEventListener("click", (e) => {
  e.preventDefault();
  verificarEmailRegistrado();
  limpiarForm();
});

function registrarEmail() {
  const nuevaCuenta = new CuentaEmail(inputEmail.value);
  cuentasEmail.push(nuevaCuenta);
  console.log(cuentasEmail);
  Toastify({
    text: `¡Bienvenidx a nuestra tribu!`,
    duration: 5000,
    className: "colorToast",
    close: true,
    gravity: "top",
    position: "center",
    style: {
      background: "#beb894",
    },
  }).showToast();
}

function limpiarForm() {
  formSuscribir.reset();
}

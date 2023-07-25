const inputEmail = document.getElementById("E-mail");
const btnSuscribir = document.getElementById("btn-suscribirse");
const formSuscribir = document.querySelector("#formSuscribir");

const cuentasEmail = [];

function validarInput() {
  if (inputEmail.value.includes("@")) {
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
    registrarEmail();
  } else {
    Swal.fire({
      text: `Por favor ingrese un email válido`,
      icon: "error",
      iconColor: "#beb894",
      confirmButtonColor: "#beb894",
    });
  }
}

function emailRegistrado() {
  const email = cuentasEmail.find((correo) => {
    correo.email === inputEmail.value;
  });
  if (inputEmail.value === email.email) {
    Swal.fire({
      title: "Email ya registrado",
      text: `Por favor ingrese otro`,
      icon: "warning",
      iconColor: "#beb894",
      confirmButtonColor: "#beb894",
    });
  } else {
    validarInput();
  }
}

btnSuscribir.addEventListener("click", (e) => {
  e.preventDefault();
  emailRegistrado();
  /*   validarInput(); */
  limpiarForm();
});

function registrarEmail() {
  const nuevaCuenta = new CuentaEmail(inputEmail.value);
  cuentasEmail.push(nuevaCuenta);
  console.log(cuentasEmail);
}

function limpiarForm() {
  formSuscribir.reset();
}

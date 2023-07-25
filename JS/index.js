const inputEmail = document.getElementById("E-mail");
const btnSuscribir = document.getElementById("btn-suscribirse");
const formSuscribir = document.querySelector("#formSuscribir");

const cuentasEmail = [];

/* inputEmail.addEventListener ("change", () => {
    if ( inputEmail.value.includes ("gmail.com") || ("hotmail.com"))
}) */

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

btnSuscribir.addEventListener("click", (e) => {
  e.preventDefault();
  validarInput();
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

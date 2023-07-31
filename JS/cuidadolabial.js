let stock = [];

let carrito = [];

let total = 0;

let stockCuidadoFacial;
// Traigo los productos del JSON

fetch("../JS/productos.json")
  .then((resp) => resp.json())
  .then((productos) => {
    stock = productos;
    stockCuidadoLabial = stock.filter(
      (prod) => prod.categoria == "Cuidado labial"
    );
    dibujarProductos(stockCuidadoLabial);
    clickAgregarCarrito(stockCuidadoLabial);
  });

function dibujarProductos(arrayDeProductos) {
  const listaItems = document.getElementById("listaItems");
  listaItems.innerHTML = ``;
  arrayDeProductos.forEach((producto) => {
    const row = document.createElement("div");
    row.setAttribute("class", "col-12 col-md-6 col-lg-4");
    row.innerHTML = `
            <div class="card-group mx-3">
            <div class="card card border-dark h-100 my-3">
              <img
                src="../img/fotosproductos/${producto.imagen}"
                class="card-img-top "
                alt="${producto.nombre}"
               width="600"
               height="450"
              />
              <div class="card-body text-center">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text card-text">$${producto.precio}</p>
                <button
                  id="btnAgregarCarrito-${producto.id}"
    
                  type="button"
                  class="btn btn-outline-dark"
                >
                  AGREGAR AL CARRITO
                </button>
              </div>
            </div>     
                `;
    listaItems.appendChild(row);
  });
}

// Dibujo del carrito

function mostrarCarrito() {
  let tablaCarrito = document.getElementById("modalCarrito");
  tablaCarrito.innerHTML = "";
  tablaCarrito.style.backgroundColor = "white";
  carrito.forEach((producto, index) => {
    let containerModal = document.createElement("div");
    containerModal.innerHTML = `
        <img src="../img/fotosproductos/${producto.imagen}" class="" alt="${
      producto.nombre
    }"  width="100"  height="100"  />
           <p scope="row" class="paragraph mb-0">${producto.nombre} $ ${
      producto.precio * producto.cantidad
    } </p>
           <p scope="row" class="paragraph mb-0">Cantidad: ${
             producto.cantidad
           } </p>
           <button type="button" class=" my-3 btn btn-outline-dark" id="btn-incrementar-${
             producto.id
           }">+</button>
           <button type="button" class=" my-3 btn btn-outline-dark" id="btn-decrementar-${
             producto.id
           }">-</button>
        </div>
        `;

    tablaCarrito.appendChild(containerModal);
    localStorage.setItem("carrito", JSON.stringify(carrito));

    const botonSumar = document.getElementById(
      `btn-incrementar-${producto.id}`
    );
    botonSumar.addEventListener("click", () => {
      console.log(producto.id);
      producto.cantidad++;
      console.log(producto);
      mostrarCarrito();
    });
    const botonRestar = document.getElementById(
      `btn-decrementar-${producto.id}`
    );
    botonRestar.addEventListener("click", () => {
      producto.cantidad--;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      if (producto.cantidad == 0) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        Toastify({
          text: `${producto.nombre} fue eliminadx del carrito`,
          duration: 2000,
          className: "info",
          gravity: "top",
          position: "center",
          style: {
            background: "black",
          },
        }).showToast();
      }
      mostrarCarrito();
    });
  });

  total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const footerModal = document.createElement("div");
  footerModal.innerHTML = `<h3>TOTAL: $ ${total}</h3>`;
  footerModal.className += "footer-modal";
  tablaCarrito.appendChild(footerModal);
}

function clickAgregarCarrito() {
  stockCuidadoLabial.forEach((producto) => {
    let btnAgregarCarrito = document.getElementById(
      `btnAgregarCarrito-${producto.id}`
    );

    btnAgregarCarrito.addEventListener("click", () => {
      const productoExistente = carrito.find((p) => p.id == producto.id);

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({
          imagen: producto.imagen,
          nombre: producto.nombre,
          precio: producto.precio,
          id: producto.id,
          cantidad: 1,
        });
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
      Toastify({
        text: `${producto.nombre} añadidx al carrito`,
        duration: 2000,
        className: "info",
        gravity: "bottom",
        position: "center",
        style: {
          background: "black",
        },
      }).showToast();
    });
  });
}
function vaciarCarrito() {
  const botonVaciar = document.getElementById(`vaciarCarrito`);
  botonVaciar.addEventListener("click", () => {
    Swal.fire({
      title: "¿Desea vaciar el carrito?",
      confirmButtonText: "Si",
      showCancelButton: true,
      cancelButtonText: "No, salir",
    }).then((result) => {
      if (result.isConfirmed) {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
        Swal.fire({
          title: "Carrito vaciado",
          icon: "success",
        });
      }
    });
  });
}

carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function abrirCarrito() {
  const verCarrito = document.querySelector("#verCarrito");
  verCarrito.addEventListener("click", mostrarCarrito);
}

const btnMenorPrecio = document.getElementById("menorAMayor");
const btnMayorPrecio = document.getElementById("mayorAMenor");
const btnMasViejo = document.getElementById("viejoANuevo");
const btnMasNuevo = document.getElementById("nuevoAViejo");

function menorAMayor() {
  btnMenorPrecio.addEventListener("click", () => {
    stockCuidadoLabial.sort(
      (producto1, producto2) => producto1.precio - producto2.precio
    );
    dibujarProductos(stockCuidadoLabial);
  });
}
function mayorAMenor() {
  btnMayorPrecio.addEventListener("click", () => {
    stockCuidadoLabial.sort(
      (producto1, producto2) => producto2.precio - producto1.precio
    );
    dibujarProductos(stockCuidadoLabial);
  });
}

function viejoANuevo() {
  btnMasViejo.addEventListener("click", () => {
    stockCuidadoLabial.sort(
      (producto1, producto2) => producto1.id - producto2.id
    );
    dibujarProductos(stockCuidadoLabial);
  });
}

function nuevoAViejo() {
  btnMasNuevo.addEventListener("click", () => {
    stockCuidadoLabial.sort(
      (producto1, producto2) => producto2.id - producto1.id
    );
    dibujarProductos(stockCuidadoLabial);
  });
}

abrirCarrito();
vaciarCarrito();
mostrarCarrito();
menorAMayor();
mayorAMenor();
viejoANuevo();
nuevoAViejo();

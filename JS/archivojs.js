const stock = [];

let carrito = [];

let total = 0;

stock.push(
  new Producto(
    "Crema Cielo",
    "Cuidado facial",
    "hidratante facial",
    "Kamikaze",
    5040,
    1,
    "fotoproducto-cremacielo.jpg"
  )
);

stock.push(
  new Producto(
    "Espuma Nube",
    "Cuidado facial",
    "espuma de limpieza facial",
    "Kamikaze",
    2850,
    2,
    "fotoproducto-espumanube.jpg"
  )
);

stock.push(
  new Producto(
    "Scrub facial de almendras",
    "Cuidado facial",
    "exfoliante facial",
    "Kamikaze",
    3180,
    3,
    "fotoproducto-scrubfacial.jpg"
  )
);

stock.push(
  new Producto(
    "Mascarilla Neptuno",
    "Cuidado facial",
    "Mascarilla de arcilla",
    "Kamikaze",
    2520,
    4,
    "fotoproducto-mascarillaneptuno.jpg"
  )
);
stock.push(
  new Producto(
    "Sheetmask",
    "Cuidado facial",
    "Mascara facial",
    "Kamikaze",
    150,
    5,
    "fotoproducto-mascarillaneptuno.jpg"
  )
);
stock.push(
  new Producto(
    "Shampoo solido",
    "Cuidado capilar",
    "Shampoo fortalecedor y restaurador",
    "Kamikaze",
    2160,
    6,
    "fotoproducto-shampoo.jpg"
  )
);
stock.push(
  new Producto(
    "Acondicionador solido",
    "Cuidado capilar",
    "HIdratacion intensa",
    "Kamikaze",
    2160,
    7,
    "fotoproducto-acondicionador.jpg"
  )
);
stock.push(
  new Producto(
    "balsamo labial",
    "Cuidado labial",
    "balsamo labial con color y aroma",
    "Kamikaze",
    2270,
    8,
    "fotoproducto-balsamolabial.jpg"
  )
);
stock.push(
  new Producto(
    "Pad XL",
    "Accesorio",
    "Pad facial reutilizable",
    "Kamikaze",
    900,
    9,
    "fotoproducto-padxl.jpg"
  )
);
stock.push(
  new Producto(
    "Gua Sha",
    "Accesorio",
    "Piedra para masaje facial",
    "Kamikaze",
    3000,
    10,
    "fotoproducto-guasha.jpg"
  )
);
stock.push(
  new Producto(
    "Hidrolato de rosas",
    "Cuidado facial",
    "Tónico hidratante",
    "Kamikaze",
    3860,
    11,
    "fotoproducto-hidrolatoderosas.jpg"
  )
);
stock.push(
  new Producto(
    "Aceite de jojoba",
    "Cuidado facial",
    "Pi",
    "Kamikaze",
    2800,
    12,
    "fotoproducto-aceitedejojoba.jpg"
  )
);
stock.push(
  new Producto(
    "Rollon Magnolia",
    "Cuidado facial",
    "Contorno de ojos",
    "Kamikaze",
    5000,
    13,
    "fotoproducto-rollonmagnolia.jpg"
  )
);
stock.push(
  new Producto(
    "Halo Lunar",
    "Cuidado facial",
    "Agua micelar",
    "Kamikaze",
    2160,
    14,
    "fotoproducto-aguamicelar.jpg"
  )
);

// Dibujo de stock de productos

listaItems = document.getElementById("listaItems");

function dibujarProductos() {
  const row = document.createElement("div");
  row.classList.add("row");
  row.innerHTML = ``;
  stock.forEach((producto) => {
    row.innerHTML += `
    <div class="col-12 col-md-6 col-lg-3">
        <div class="card-group">
        <div class="card card border-dark h-100">
          <img
            src="../img/fotosproductos/${producto.imagen}"
            class="card-img-top img-fluid "
            alt="${producto.nombre}"
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
        
        </div>
            `;
    listaItems.appendChild(row);
  });
}

// Dibujo del carrito

function mostrarCarrito() {
  let tablaCarrito = document.getElementById("tableCarrito");
  tablaCarrito.innerHTML = "";
  tablaCarrito.style.backgroundColor = "white";
  carrito.forEach((producto) => {
    let containerModal = document.createElement("div");
    containerModal.innerHTML = `
    <div class="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Carrito de compras</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img src="../img/fotosproductos/${producto.imagen}" class="" alt="${
      producto.nombre
    }"  width="100"  height="100"  />
           <p scope="row" class="paragraph">${producto.nombre} $ ${
      producto.precio * producto.cantidad
    } </p>
           <p scope="row" class="paragraph">Cantidad: ${producto.cantidad} </p>
           <button type="button" class="btn btn-outline-dark" id="btn-incrementar-${
             producto.id
           }">+</button>
           <button type="button" class="btn btn-outline-dark" id="btn-decrementar-${
             producto.id
           }">-</button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
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
      console.log(producto.id);
      producto.cantidad--;
      console.log(producto);
      mostrarCarrito();
    });
  });

  total = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  const footerCard = document.createElement("div");
  footerCard.innerHTML = `<h3>TOTAL: $ ${total}</h3>`;
  tablaCarrito.appendChild(footerCard);
}

function clickAgregarCarrito() {
  stock.forEach((producto) => {
    let btnAgregarCarrito = document.getElementById(
      `btnAgregarCarrito-${producto.id}`
    );
    btnAgregarCarrito.addEventListener("click", () => {
      carrito.push({
        imagen: producto.imagen,
        nombre: producto.nombre,
        precio: producto.precio,
        id: producto.id,
        cantidad: 1,
      });
    });
  });
}

carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function abrirCarrito() {
  const verCarrito = document.querySelector("#verCarrito");
  verCarrito.addEventListener("click", mostrarCarrito);
}

dibujarProductos();
clickAgregarCarrito();
abrirCarrito();

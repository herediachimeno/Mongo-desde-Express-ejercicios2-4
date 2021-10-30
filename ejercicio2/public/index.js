recibirLibros();

function recibirLibros() {
  fetch("api/libros")
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let libros = "";
      for (let i = 0; i < datos.length; i++) {
        libros += `
                <div>
                    <h3>${datos[i].titulo}</h3>
                    <p>Estado: ${datos[i].estado}</p>
                </div>
            `;
      }
      document.getElementById("div1").innerHTML = libros;
    });
}

function buscar() {
  const titulo = document.getElementById("libroBuscar").value;

  fetch(`api/libros/${titulo}`)
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let libro = `
            <div>
                <h3>${datos[0].titulo}</h3>
                <p>Estado: ${datos[0].estado}</p>
            </div>
        `;
      document.getElementById("div1").innerHTML = libro;
    });
}

function anyadir() {
  const tituloInsertar = document.getElementById("libroAnyadir").value;

  fetch(`/api/nuevoLibro/${tituloInsertar}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      recibirLibros();
    });
}

function editar() {
  const libroEditar = document.getElementById("libroEditar").value;

  fetch(`/api/editarLibro/${libroEditar}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      recibirLibros();
    });
}

function borrar() {
  const libro = document.getElementById("libroBorrar").value;

  fetch(`api/borrarLibro/${libro}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      recibirLibros();
    });
}

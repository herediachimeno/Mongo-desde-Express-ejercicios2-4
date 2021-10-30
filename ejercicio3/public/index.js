recibirSeries();

function recibirSeries() {
  fetch("api/series")
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      let series = "";
      for (let i = 0; i < datos.length; i++) {
        series += `
                <div>
                    <h3>${datos[i].titulo}</h3>
                    <p>Plataforma: ${datos[i].plataforma}</p>
                    <p>Nota: ${datos[i].nota}</p>
                </div>
            `;
      }
      document.getElementById("div1").innerHTML = series;
    });
}

function buscar() {
  let titulo = document.getElementById("serieBuscar").value;

  fetch("/api/serie/" + titulo)
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      document.getElementById("div1").innerHTML = `
            <div>
                <h3>${datos[0].titulo}</h3>
                <p>Plataforma: ${datos[0].plataforma}</p>
                <p>Nota: ${datos[0].nota}</p>
            </div>
            `;
    });
}

function anyadir() {
  const titulo = document.getElementById("titulo").value;
  const plataforma = document.getElementById("plataforma").value;
  const nota = parseInt(document.getElementById("nota").value);

  const serieInsertar = {
    titulo,
    plataforma,
    nota,
  };

  fetch("/api/nuevaSerie/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serieInsertar),
  })
    .then(function (res) {
      return res.json();
    })
    .then(function (datos) {
      console.log(datos);
      recibirSeries();
    });
}

const express = require("express");
const app = express();
const mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let db;

MongoClient.connect("mongodb://localhost:27017", function (err, client) {
  err
    ? (console.log("MongoDB no conectado"), console.log(`error: ${err}`))
    : ((app.locals.db = client.db("pruebas")),
      console.log("MongoDB se ha conectado correctamente"));
});

app.get("/api/libros", function (req, res) {
  db.collection("libros")
    .find()
    .toArray(function (err, datos) {
      err
        ? (console.log(err), res.send({ mensaje: "error:" + err }))
        : (console.log(datos), res.send({ results: datos }));
    });
});

app.get("/api/libros/:titulo", function (req, res) {
  const titulo = req.params.titulo;

  db.collection("libros")
    .find({ titulo: titulo })
    .toArray(function (err, datos) {
      err
        ? (console.log(err), res.send({ mensaje: "error:" + err }))
        : (console.log(datos), res.send({ results: datos }));
    });
});

app.post("/api/nuevoLibro/:titulo", function (req, res) {
  const libro = {
    titulo: req.params.titulo,
    estado: "Sin leer",
  };

  db.collection("libros").insertOne(libro, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      db.collection("libros")
        .find()
        .toArray(function (err, data) {
          if (err !== null) {
            res.send(err);
          } else {
            res.send(data);
          }
        });
    }
  });
});

app.put("/api/editarLibro/:titulo", function (req, res) {
  const titulo = req.params.titulo;

  db.collection("libros").updateOne(
    { titulo: titulo },
    { $set: { estado: "Leído" } },
    function (err, datos) {
      if (err !== null) {
        res.send(err);
      } else {
        res.send(datos);
      }
    }
  );
});

app.delete("/api/borrarLibro/:titulo", function (req, res) {
  const titulo = req.params.titulo;

  db.collection("libros").deleteOne({ titulo: titulo }, function (err, datos) {
    if (err !== null) {
      res.send(err);
    } else {
      res.send(datos);
    }
  });
});

app.listen(3000);

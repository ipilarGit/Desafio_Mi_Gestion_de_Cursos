const express = require("express");
const app = express();
const {
    getCursos,
    nuevoCurso,
    editarCurso,
    deleteCurso,
} = require("./consultas");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server ON");
});

app.get("/", (rer, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/cursos", async(req, res) => {
    const respuesta = await getCursos();
    res.send(respuesta);
});

app.post("/curso", async(req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;

    const respuesta = await nuevoCurso(
        nombre,
        nivelTecnico,
        fechaInicio,
        duracion
    );
    res.send(respuesta);
});

app.put("/curso", async(req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion, id } = req.body;

    const respuesta = await editarCurso(
        nombre,
        nivelTecnico,
        fechaInicio,
        duracion,
        id
    );
    res.send(respuesta);
});

app.delete("/curso/:id", async(req, res) => {
    const { id } = req.params;
    const respuesta = await deleteCurso(id);
    respuesta > 0 ?
        res.send(`El curso: ${id} fue eliminado con éxito`) :
        res.send("No existe un curso registrado con ese id");
});
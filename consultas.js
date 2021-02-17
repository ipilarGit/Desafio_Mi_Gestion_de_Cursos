const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "postgres",
    database: "cursos",
    port: 5432,
});

const getCursos = async() => {
    try {
        const result = await pool.query("SELECT * FROM cursos");
        return result.rows;
    } catch (err) {
        return err;
    }
};

const nuevoCurso = async(nombre, nivelTecnico, fechaInicio, duracion) => {
    try {
        const result = await pool.query(
            `INSERT INTO cursos(nombre, nivel, fecha, duracion) VALUES('${nombre}',${nivelTecnico},'${fechaInicio}',${duracion}) RETURNING *`
        );
        console.log(result.rows[0]);
        return result.rows;
    } catch (err) {
        console.log(err.code);
        return err;
    }
};

const editarCurso = async(nombre, nivelTecnico, fechaInicio, duracion, id) => {
    try {
        const result = await pool.query(
            `UPDATE cursos 
                SET 
                nombre = '${nombre}', 
                nivel = ${nivelTecnico}, 
                fecha = '${fechaInicio}', 
                duracion = ${duracion}  
            WHERE id = '${id}' RETURNING *`
        );
        return result.rows;
    } catch (err) {
        console.log(err);
        return err;
    }
};

const deleteCurso = async(id) => {
    try {
        const result = await pool.query(
            `DELETE FROM cursos WHERE id = '${id}' RETURNING *`
        );
        return result.rowCount;
    } catch (err) {
        return err;
    }
};
module.exports = {
    getCursos,
    nuevoCurso,
    editarCurso,
    deleteCurso,
};
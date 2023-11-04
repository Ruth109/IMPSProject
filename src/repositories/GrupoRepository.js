const pool = require('../config/databaseController');

module.exports = {
    //Consulta para obtener todos los grupos
    obtenerTodosLosGrupos: async () => {
        try {
            const result = await pool.query('SELECT a.idgrupo, a.num_grupo, a.anio, a.ciclo, b.materia, c.nombre FROM grupos a, materias b, profesores c WHERE a.idmateria = b.idmateria AND a.idprofesor = c.idprofesor;');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de grupos: ', error);
        }
    },

    // Eliminar un grupo
    eliminarGrupo: async (idgrupo) => {
        try {
            const result = await pool.query('DELETE FROM grupos WHERE idgrupo = ?', [idgrupo]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro', error);
        }
    },

    // Insertar un grupo
    insertarGrupo: async (nuevoGrupo) => {
        try {
            const result = await pool.query('INSERT INTO grupos SET ?', nuevoGrupo);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar el registro', error);
        }
    },

    // Actualizar un grupo
    actualizarGrupo: async (idgrupo, datosActualizados) => {
        try {
            const result = await pool.query('UPDATE grupos SET ? WHERE idgrupo = ?', [datosActualizados, idgrupo]);
            return result.affectedRows > 0;;
        } catch (error) {
            console.error('Error al actualizar el registro', error);
        }
    },

    //Obtener un grupo por su ID
    obtenerGrupoPorId: async (idgrupo) => {
        try {
            const result = await pool.query('SELECT * FROM grupos WHERE idgrupo = ?', [idgrupo]);
            if (result.length > 0) {
                return result[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener el registro', error);
        }
    },

    //Asignar grupo
    asignarGrupo: async (asignacion) => {
        try {
            const result = await pool.query("INSERT INTO grupo_estudiantes SET ? ",
                asignacion);
            console.log('resultado: ', result)
            return result;
        } catch (error) {
            console.log('Ocurrio un problema al asignar el grupo', error);
        }
    }
}
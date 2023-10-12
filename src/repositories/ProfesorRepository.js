const pool = require('../config/databaseController');

module.exports = {
    //Consulta para obtener todos los profesores
    obtenerTodosLosProfesores: async () => {
        try {
            const result = await pool.query('SELECT * FROM profesores');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de profesores: ', error);
        }
    },

    // Eliminar un profesor
    eliminarProfesor: async (idprofesor) => {
        try {
            const result = await pool.query('DELETE FROM profesores WHERE idprofesor = ?', [idprofesor]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro', error);
        }
    },

    // Insertar un profesor
    insertarProfesor: async (nuevoProfesor) => {
        try {
            const result = await pool.query('INSERT INTO profesores SET ?', nuevoProfesor);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar el registro', error);
        }
    },

    // Actualizar un profesor
    actualizarProfesor: async (idprofesor, datosActualizados) => {
        try {
            const result = await pool.query('UPDATE profesores SET ? WHERE idprofesor = ?', [datosActualizados, idprofesor]);
            return result.affectedRows > 0;;
        } catch (error) {
            console.error('Error al actualizar el registro', error);
        }
    },

    //Obtener un profesor por su ID
    obtenerProfesorPorId: async (idprofesor) => {
        try {
            const result = await pool.query('SELECT * FROM profesores WHERE idprofesor = ?', [idprofesor]);
            if (result.length > 0) {
                return result[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al obtener el registro', error);
        }
    }
}
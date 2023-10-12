const pool = require('../config/databaseController');

module.exports = {
    //Consulta para obtener todos las materias
    obtenerTodasLasMaterias: async () => {
        try {
            const result = await pool.query('SELECT * FROM materias');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de materias: ', error);
        }
    
    },

    // Eliminar una materia
    eliminarMateria: async (idmateria) => {
        try {
            const result = await pool.query('DELETE FROM materias WHERE idmateria = ?', [idmateria]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro', error);
        }
    },

    // Insertar una materia
    insertarMateria: async (nuevaMateria) => {
        try {
            const result = await pool.query('INSERT INTO materias SET ?', nuevaMateria);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar el registro', error);
        }
    },

    // Actualizar una materia
    actualizarMateria: async (idmateria, datosActualizados) => {
        try {
            const result = await pool.query('UPDATE materias SET ? WHERE idmateria = ?', [datosActualizados, idmateria]);
            return result.affectedRows > 0;;
        } catch (error) {
            console.error('Error al actualizar el registro', error);
        }
    },

    //Obtener una materia por su ID
    obtenerMateriaPorId: async (idmateria) => {
        try {
            const result = await pool.query('SELECT * FROM materias WHERE idmateria = ?', [idmateria]);
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
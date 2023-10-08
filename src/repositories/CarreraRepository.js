const pool = require('../config/databaseController');

module.exports = {
    //Consulta para obtener todos las carreras
    obtenerTodasLasCarreras: async () => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Ocurrio un problema al consultar la lista de carreras: ', error);
        }
    
    },

    // Eliminar una carrera
    eliminarCarrera: async (idcarrera) => {
        try {
            const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro', error);
        }
    },

    // Insertar una carrera
    insertarCarrera: async (nuevaCarrera) => {
        try {
            const result = await pool.query('INSERT INTO carreras SET ?', nuevaCarrera);
            return result.insertId;
        } catch (error) {
            console.error('Error al insertar el registro', error);
        }
    },

    // Actualizar una carrera
    actualizarCarrera: async (idcarrera, datosActualizados) => {
        try {
            const result = await pool.query('UPDATE carreras SET ? WHERE idcarrera = ?', [datosActualizados, idcarrera]);
            return result.affectedRows > 0;;
        } catch (error) {
            console.error('Error al actualizar el registro', error);
        }
    },

    //Obtener una carrera por su ID
    obtenerCarreraPorId: async (idcarrera) => {
        try {
            const [carrera] = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return carrera;
        } catch (error) {
            console.log('Error al obtener el registro');
        }
    }
}
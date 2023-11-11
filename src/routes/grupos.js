const express = require('express');
const router = express.Router();
const queries = require('../repositories/GrupoRepository');
const materiasQuery = require('../repositories/MateriaRepository');
const profesoresQuery = require('../repositories/ProfesorRepository');
const estudiantesQuery = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos los grupos
router.get('/', isLoggedIn, async (request, response) => {
    const grupos = await queries.obtenerTodosLosGrupos();

    response.render('grupos/listado', { grupos }); // Mostramos el listado de grupos
});

// Endpoint que permite mostrar el formulario para agregar un nuevo grupo
router.get('/agregar', isLoggedIn, async (request, response) => {
    const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
    const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();

    // Renderizamos el formulario
    response.render('grupos/agregar', { lstMaterias, lstProfesores });
});

// Endpoint para agregar un grupo
router.post('/agregar', isLoggedIn, async (request, response) => {
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
    const nuevoGrupo = { num_grupo, anio, ciclo, idmateria, idprofesor };

    const resultado = await queries.insertarGrupo(nuevoGrupo);

    if (resultado) {
        request.flash('success', 'Registro insertado con exito');
    } else {
        request.flash('error', 'Ocurrio un problema al guardar el registro');
    }

    response.redirect('/grupos');
});

// Endpoint que permite eliminar un grupo
router.get('/eliminar/:idgrupo', isLoggedIn, async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idgrupo
    const { idgrupo } = request.params;
    const resultado = await queries.eliminarGrupo(idgrupo);
    if (resultado > 0) {
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/grupos');
});

// Endpoint que permite mostrar el formulario para modificar un grupo
router.get('/modificar/:idgrupo', isLoggedIn, async (request, response) => {
    const { idgrupo } = request.params;
    const grupo = await queries.obtenerGrupoPorId(idgrupo);

    if (grupo) {
        const lstMaterias = await materiasQuery.obtenerTodasLasMaterias();
        const lstProfesores = await profesoresQuery.obtenerTodosLosProfesores();
        // Renderizamos el formulario
        response.render('grupos/modificar', { lstMaterias, lstProfesores, idgrupo, grupo });
    } else {
        response.redirect('/grupos');
    }
});

// Endpoint para actualizar un estudiante
router.post('/modificar/:idgrupo', isLoggedIn, async (request, response) => {
    const { idgrupo } = request.params;
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = request.body;
    const datosActualizados = { num_grupo, anio, ciclo, idmateria, idprofesor };

    const resultado = await queries.actualizarGrupo(idgrupo, datosActualizados);

    if (resultado) {
        request.flash('success', 'Registro actualizado con exito');
        response.redirect('/grupos');
    } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
        response.redirect('/grupos/modificar/' + idgrupo);
    }
});

// Enpoint que permite navegar a la pantalla para asignar un grupo
router.get('/asignargrupo/:idgrupo', isLoggedIn, async (request, reponse) => {
    const { idgrupo } = request.params;
    // Consultamos el listado de estudiantes disponible
    const lstEstudiantes = await estudiantesQuery.obtenerTodosLosEstudiantes();
    reponse.render('grupos/asignargrupo', { lstEstudiantes, idgrupo });
});
// Endpoint que permite asignar un grupo
router.post('/asignargrupo', isLoggedIn, async (request, response) => {
    const data = request.body;
    let resultado = null;
    const result = processDataFromForm(data);
    for (const tmp of result.grupo_estudiantes) {
        //const asignacion = [tmp.idgrupo, tmp.idestudiante];
        //const { idgrupo, idestudiante } = tmp;
        //const asignacionObj = {idgrupo, idestudiante};
        resultado = await queries.asignarGrupo(tmp);
    }
    if (resultado) {
        request.flash('success', 'Asignacion de grupo realizada con exito');
    } else {
        request.flash('error', 'Ocurrio un problema al realizar asignacion');
    }
    response.redirect('/grupos');
});

// Función para procesar los datos del formulario
function processDataFromForm(data) {
    const result = {
        grupo_estudiantes: []
    };
    for (const key in data) {
        if (key.startsWith('grupo_estudiantes[')) {
            const match = key.match(/\[(\d+)\]\[(\w+)\]/);
            if (match) {
                const index = parseInt(match[1]);
                const property = match[2];
                if (!result.grupo_estudiantes[index]) {
                    result.grupo_estudiantes[index] = {};
                }
                result.grupo_estudiantes[index][property] = data[key];
            }
        } else {
            result[key] = data[key];
        }
    }
    return result;
}

module.exports = router;

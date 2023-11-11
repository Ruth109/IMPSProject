const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const carrerasQuery = require('../repositories/CarreraRepository');
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todos los estudiantes
router.get('/', isLoggedIn, async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();

    response.render('estudiantes/listado', { estudiantes }); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', isLoggedIn, async (request, response) => {
    const lstCarreras = await carrerasQuery.obtenerTodasLasCarreras();
    // Renderizamos el formulario
    response.render('estudiantes/agregar', { lstCarreras });
});

// Endpoint para agregar un estudiante
router.post('/agregar', isLoggedIn, async (request, response) => {
    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    const nuevoEstudiante = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.insertarEstudiante(nuevoEstudiante);

    if (resultado) {
        request.flash('success', 'Registro insertado con exito');
    } else {
        request.flash('error', 'Ocurrio un problema al guardar el registro');
    }

    response.redirect('/estudiantes');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', isLoggedIn, async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);
    if (resultado > 0) {
        request.flash('success', 'Eliminacion correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }
    response.redirect('/estudiantes');
});

// Endpoint que permite mostrar el formulario para modificar un estudiante
router.get('/modificar/:idestudiante', isLoggedIn, async (request, response) => {
    const { idestudiante } = request.params;
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante);

    if (estudiante) {
        const lstCarreras = await carrerasQuery.obtenerTodasLasCarreras();
        // Renderizamos el formulario
        response.render('estudiantes/modificar', { lstCarreras, idestudiante, estudiante });
    } else {
        response.redirect('/estudiantes');
    }
});

// Endpoint para actualizar un estudiante
router.post('/modificar/:id', isLoggedIn, async (request, response) => {
    const { id } = request.params;
    const { idestudiante, nombre, apellido, email, idcarrera, usuario } = request.body;
    const datosActualizados = { idestudiante, nombre, apellido, email, idcarrera, usuario };

    const resultado = await queries.actualizarEstudiante(id, datosActualizados);

    if (resultado) {
        request.flash('success', 'Registro actualizado con exito');
        response.redirect('/estudiantes');
    } else {
        request.flash('error', 'Ocurrio un problema al actualizar el registro');
        response.redirect('/estudiantes/modificar/' + idestudiante);
    }
});

module.exports = router;

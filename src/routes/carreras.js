const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todas las carreras
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();

    response.render('carreras/listado', {carreras}); // Mostramos el listado de carreras
});

// Endpoint que permite mostrar el formulario para agregar una nueva carrera
router.get('/agregar', async (request, response) => {
    // Renderizamos el formulario
    response.render('carreras/agregar');
});

// Endpoint para agregar una carrera
router.post('/agregar', async (request, response) => {
    const {idcarrera, carrera} = request.body;
    const nuevaCarrera = {idcarrera, carrera};

    const resultado = await queries.insertarCarrera(nuevaCarrera);
    response.redirect('/carreras');
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idcarrera', async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idestudiante
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/carreras');
});

// Endpoint que permite mostrar el formulario para modificar un estudiante
router.get('/modificar/:idcarrera', async (request, response) => {
    const {idcarrera} = request.params;
    const carrera = await queries.obtenerCarreraPorId(idcarrera);

    if(carrera){   
        // Renderizamos el formulario
        response.render('carreras/modificar', {carrera});
    }else{
        response.redirect('/carreras');
    }
});

// Endpoint para actualizar un estudiante
router.post('/modificar/:idcarrera', async (request, response) => {
    const {idcarrera} = request.params;
    const {carrera} = request.body;
    const datosActualizados = {carrera};

    const resultado = await queries.actualizarCarrera(idcarrera, datosActualizados);
    
    if(resultado){
        console.log('Carrera actualizada con exito');
        response.redirect('/carreras');
    }else{
        console.log('Error al actualizar la carrera');
        response.redirect('/carreras/modificar/' + idcarrera);
    }
});

module.exports = router;

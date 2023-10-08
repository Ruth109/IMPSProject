const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todas las carreras
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();

    response.render('carreras/listado', {carreras: carreras}); // Mostramos el listado de carreras
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
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idcarrera
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/carreras');
});

// Endpoint que permite mostrar el formulario para modificar una carrera
router.get('/modificar/:idcarrera', async (request, response) => {
    const {idcarrera} = request.params;
    const carrera = await queries.obtenerCarreraPorId(idcarrera);

    if(carrera){   
        // Renderizamos el formulario
        response.render('carreras/modificar', {idcarrera, carrera});
    }else{
        response.redirect('/carreras');
    }
});

// Endpoint para actualizar una carrera
router.post('/modificar/:id', async (request, response) => {
    const {id} = request.params;
    const {idcarrera, carrera} = request.body;
    const datosActualizados = {idcarrera, carrera};

    const resultado = await queries.actualizarCarrera(id, datosActualizados);
    
    response.redirect('/carreras');
});

module.exports = router;

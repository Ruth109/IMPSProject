const express = require('express');
const router = express.Router();
const queries = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los profesores
router.get('/', async (request, response) => {
    const profesores = await queries.obtenerTodosLosProfesores();

    response.render('profesores/listado', {profesores}); // Mostramos el listado de profesores
});

// Endpoint que permite mostrar el formulario para agregar un nuevo profesor
router.get('/agregar', async (request, response) => {
    // Renderizamos el formulario
    response.render('profesores/agregar');
});

// Endpoint para agregar un profesor
router.post('/agregar', async (request, response) => {
    const {idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email} = request.body;
    const nuevoProfesor = {idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email};

    const resultado = await queries.insertarProfesor(nuevoProfesor);
    response.redirect('/profesores');
});

// Endpoint que permite eliminar un profesor
router.get('/eliminar/:idprofesor', async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idprofesor
    const { idprofesor } = request.params;
    const resultado = await queries.eliminarProfesor(idprofesor);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/profesores');
});

// Endpoint que permite mostrar el formulario para modificar un profesor
router.get('/modificar/:idprofesor', async (request, response) => {
    const {idprofesor} = request.params;
    const profesor = await queries.obtenerProfesorPorId(idprofesor);

    if(profesor){
        // Renderizamos el formulario
        response.render('profesores/modificar', {idprofesor, profesor});
    }else{
        response.redirect('/profesores');
    }
});

// Endpoint para actualizar un profesor
router.post('/modificar/:id', async (request, response) => {
    const {id} = request.params;
    const {idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email} = request.body;
    const datosActualizados = {idprofesor, nombre, apellido, fecha_nacimiento, profesion, genero, email};

    const resultado = await queries.actualizarProfesor(id, datosActualizados);
    
    if(resultado){
        console.log('Profesor actualizado con exito');
        response.redirect('/profesores');
    }else{
        console.log('Error al actualizar el profesor');
        response.redirect('/profesores/modificar/' + idprofesor);
    }
});

module.exports = router;

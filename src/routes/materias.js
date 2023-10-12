const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');

// Endpoint para mostrar todos las materias 
router.get('/', async (request, response) => {
    const materias = await queries.obtenerTodasLasMaterias();

    response.render('materias/listado', {materias}); // Mostramos el listado de materias
});

// Endpoint que permite mostrar el formulario para agregar una nueva materia
router.get('/agregar', async (request, response) => {
    // Renderizamos el formulario
    response.render('materias/agregar');
});

// Endpoint para agregar una materia
router.post('/agregar', async (request, response) => {
    const {idmateria, materia} = request.body;
    const nuevaMateria = {idmateria, materia};

    const resultado = await queries.insertarMateria(nuevaMateria);
    response.redirect('/materias');
});

// Endpoint que permite eliminar una materia
router.get('/eliminar/:idmateria', async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la peticion y extraemos el idmateria
    const { idmateria } = request.params;
    const resultado = await queries.eliminarMateria(idmateria);
    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }
    response.redirect('/materias');
});

// Endpoint que permite mostrar el formulario para modificar una materia
router.get('/modificar/:idmateria', async (request, response) => {
    const {idmateria} = request.params;
    const materia = await queries.obtenerMateriaPorId(idmateria);

    if(materia){  
        // Renderizamos el formulario
        response.render('materias/modificar', {idmateria, materia});
    }else{
        response.redirect('/materias');
    }
});

// Endpoint para actualizar una materia
router.post('/modificar/:id', async (request, response) => {
    const {id} = request.params;
    const {idmateria, materia} = request.body;
    const datosActualizados = {idmateria, materia};

    const resultado = await queries.actualizarMateria(id, datosActualizados);
    
    if(resultado){
        console.log('Materia actualizado con exito');
        response.redirect('/materias');
    }else{
        console.log('Error al actualizar la materia');
        response.redirect('/materias/modificar/' + idmateria);
    }
});

module.exports = router;

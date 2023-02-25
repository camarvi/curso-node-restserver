const { Router } = require('express');
const { check } = require('express-validator');
const { CrearCategoria, obtenerCategorias, ObtenerCategoria } = require('../controllers/categorias');

const { validarCampos, validarJWT } = require('../middlewares');
const { existeCategoriaPorId } = require('../helpers/db-validators');


const router = Router();

/**
 * {{url}}/api/categorias
 * 
 */

// Obtener Todas las Categorias - publico, todo el mundo puede acceder
router.get('/', obtenerCategorias);


// Obtener Una Categoria por id - publico, todo el mundo puede acceder
router.get('/:id', [
        check('id', 'No es un id de Mongo valido').isMongoId(),
        check('id').custom(existeCategoriaPorId),
        validarCampos,

    ],
    ObtenerCategoria);


// Crear un nueva Categoria - privado - cualquier persona con un token valido
router.post('/', [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], CrearCategoria);


// Modificar un nueva Categoria - privado - cualquier persona con un token valido
router.put('/:id', (req, res) => {
    res.json('put');
});


// Borrar un nueva Categoria - Admin
router.delete('/:id', (req, res) => {
    res.json('delete');
});




module.exports = router;
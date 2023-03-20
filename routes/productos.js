const { Router } = require('express');
const { check } = require('express-validator');
const {
    CrearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
} = require('../controllers/productos');


const { validarCampos, validarJWT, esAdminRole } = require('../middlewares');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');


const router = Router();


// Obtener Todos los Productos - publico, todo el mundo puede acceder
router.get('/', obtenerProductos);


// Obtener Un Producto por id - publico, todo el mundo puede acceder
router.get('/:id', [
        check('id', 'No es un id de Mongo valido').isMongoId(),
        check('id').custom(existeProductoPorId),
        validarCampos,
    ],
    obtenerProducto);


// Crear un nuevo Producto - privado - cualquier persona con un token valido
router.post('/', [validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], CrearProducto);


// Actualizar un  Producto - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    // check('categoria', 'No es un ID de Mongo').isMongoId,
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);


// Borrar un nueva Categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);




module.exports = router;
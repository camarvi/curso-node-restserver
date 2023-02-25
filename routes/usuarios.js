const { Router } = require('express');
const { check } = require('express-validator');

// MIDLLEWARE
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
// const { validarCampos } = require('../middlewares/validar-campos');

const {
    validarJWT,
    esAdminRole,
    tieneRole,
    validarCampos
} = require('../middlewares');

const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuario');




const router = Router();

router.get('/', usuariosGet);


router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // SE PUEDE PONER DE LAS DOS FORMAS
    //check('rol').custom( (rol) =>   esRoleValido(rol) ),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);


router.put('/:id', [
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPut);


router.delete('/:id', [
        validarJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un Id Valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
    ],
    usuariosDelete);

router.patch('/', usuariosPatch);




module.exports = router;
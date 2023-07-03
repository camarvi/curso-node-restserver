const dbValidator = require('./db-validators');
const generarJwt = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');


// Lo exporto expandiento todo su contenido

module.exports = {
    ...dbValidator,
    ...generarJwt,
    ...googleVerify,
    ...subirArchivo,
}
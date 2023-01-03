const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');




const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        // const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        // console.log(payload);

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el usuario que corresponde con ese uid

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en DB'
            });
        }


        // Comprobar que el usuario no esta borrado (estado=false)
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            });
        }

        //req.uid = uid;
        req.usuario = usuario;


        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });

    }





};




module.exports = {
    validarJWT
};
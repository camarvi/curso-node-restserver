const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");



const login = async(req, res = response) => {

    // obtener el correo y el password
    // que vienen en el req.body

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario/contraseña no valido - email'
            });
        }


        // Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario/contraseña no valido - estado:false'
            });
        }


        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario/contraseña no valido - password'
            });
        }

        // Si se cumple todo lo anterior => Generar el JWT
        const token = await generarJWT(usuario.id);



        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Se ha producido un error'
        })
    }


}

module.exports = {
    login
}
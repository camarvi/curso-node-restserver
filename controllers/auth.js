const { response, json } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");



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


const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;

    try {

        console.log(id_token);

        //const googleUser = await googleVerify(id_token);

        const { correo, nombre, img } = await googleVerify(id_token);

        console.log(correo);
        console.log(nombre);

        let usuario = await Usuario.findOne({ correo });
        //console.log(usuario);

        if (!usuario) {
            console.log("No existe el usuario")
            const data = {
                nombre,
                correo,
                password: 'pass',
                img,
                google: true,
                rol: 'USER_ROLE'
            };


            usuario = new Usuario(data);
            await usuario.save(); // Almaceno el usuario en la Base de datos
        }

        //Si el usuarion en BD
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario bloqueado'
            });
        }

        // GENERAR EL JSONWEBTOKEN

        const token = await generarJWT(usuario.id);


        //console.log(googleUser);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
    }



}


module.exports = {
    login,
    googleSignIn
}
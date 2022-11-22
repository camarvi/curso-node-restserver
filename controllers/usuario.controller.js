const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    //const query = req.query;

    // Sino viene nombre lo ponemos como no name
    //const { q, nombre = 'No Name', apikey, page = 1, limit } = req.query

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };


    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    // const resp = await Promise.all([
    //     Usuario.countDocuments(query),
    //     Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))
    // ]);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);


    res.json({
        //resp
        total,
        usuarios
    });

    // res.json({
    //     ok: true,
    //     msg: 'Get Api - Controlador',
    //     //query
    //     q,
    //     nombre,
    //     apikey,
    //     page,
    //     limit
    // });
};


const usuariosPost = async(req, res = response) => {



    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //VERIFICAR SI EL CORREO EXISTE
    // const existeEmail = await Usuario.findOne({ correo });
    // if (existeEmail) {
    //     return res.status(400).json({
    //         msg: 'El correo ya está registrado'
    //     });
    // }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);




    // Grabar los datos en MongoDB
    await usuario.save();

    res.json({
        ok: true,
        msg: 'Post Api - Controlador',
        //body
        usuario
    });
}


const usuariosPut = async(req, res = response) => {

    //const id = req.params.id;
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // Todo validar contra base de datos
    if (password) { //si existe => el usuario quiere actualizar su password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    // res.status(201).json({
    //     //ok: true,
    //     //msg: 'Put Api - Controlador',
    //     usuario
    // });

    res.json(usuario);
}

const usuariosPatch = (req, res = reponse) => {
    ///res.send('Hello World')
    res.json({
        ok: true,
        msg: 'Patch Api - Controlador',
        id
    });
}

const usuariosDelete = async(req, res = response) => {
    ///res.send('Hello World')

    const { id } = req.params;

    //BORRAR FISICAMENTE LE REGISTRO
    //const usuario = await Usuario.findByIdAndDelete(id);

    //cambiando el estado del usuario

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        ok: true,
        msg: 'findByIdAndUpdate',
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};
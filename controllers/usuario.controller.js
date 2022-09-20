const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    //const query = req.query;

    // Sino viene nombre lo ponemos como no name
    const { q, nombre = 'No Name', apikey } = req.query

    res.json({
        ok: true,
        msg: 'Get Api - Controlador',
        //query
        q,
        nombre,
        apikey
    });
};


const usuariosPost = (req, res = response) => {

    //const body = req.body;

    const { nombre, edad } = req.body;

    res.json({
        ok: true,
        msg: 'Post Api - Controlador',
        nombre,
        edad
    });
}


const usuariosPut = (req, res = response) => {
    ///res.send('Hello World')

    //const id = req.params.id;
    const { id } = req.params;

    res.status(201).json({
        ok: true,
        msg: 'Put Api - Controlador',
        id
    });
}

const usuariosPatch = (req, res = reponse) => {
    ///res.send('Hello World')
    res.json({
        ok: true,
        msg: 'Patch Api - Controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    ///res.send('Hello World')
    res.json({
        ok: true,
        msg: 'Delete Api - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
};
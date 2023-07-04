const { response } = require("express");
const { subirArchivo } = require('../helpers');


const cargarArchivo = async(req, res = response) => {

    //let sampleFile;
    //let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({ msg: 'No hay archivos que subir' });
        return;
    }

    if (!req.files.archivo) {
        res.status(400).json({ msg: 'No hay archivos que subir' });
        return;
    }

    //Subir ficheros, puedo establer las extensiones permitidas
    //para los archivos a subir

    try {
        //subir ficheros con extension txt,md en la carpeta textos
        //const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');

        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre
        });

    } catch (msg) {
        res.status(400).json({ msg });
    }



}

module.exports = { cargarArchivo };
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

    //Imagenes 
    const nombre = await subirArchivo(req.files);
    res.json({
        nombre
    });

}

module.exports = { cargarArchivo };
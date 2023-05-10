const path = require('path');

const { response } = require("express");


const cargarArchivo = (req, res = response) => {

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


    //sampleFile = req.files.sampleFile;
    const { archivo } = req.files;

    const uploadPath = path.join(__dirname, '../uploads/', archivo.name);

    archivo.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({ err });
        }

        res.json({ msg: 'File uploaded to ' + uploadPath });
    });

}

module.exports = { cargarArchivo };
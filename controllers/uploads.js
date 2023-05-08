const { response } = require("express");


const cargarArchivo = (req, res = response) => {

    res.json({
        msg: 'Ruta cargar Archivo'
    })

}

module.exports = { cargarArchivo };
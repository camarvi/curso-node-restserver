const { response } = require("express");
const { Categoria } = require("../models");



//Obtener Categorias -- Paginado - total - populate

const obtenerCategorias = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    })

};

//Obtener Categoria  - populate {}

const ObtenerCategoria = async(req, res = response) => {

    const { id } = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    res.json(categoria);
}

const CrearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `la categoria ${categoriaDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar 
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    console.log(data);

    const categoria = new Categoria(data);

    // Guardar en Base datos
    await categoria.save();

    res.status(201).json(categoria);


}

// Actualizar Categoria

const actualizarCategoria = async(req, res = response) => {

    const { id } = req.params;
    // por un lado extraigo el estado y el usuario, y el resto
    // en la data 
    const { estado, usuario, ...data } = req.body;

    // Poner el nombre de la categoria en mayuscula antes de guardarlo
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoriaAct = await Categoria.findByIdAndUpdate(id, data, { new: true });

    // res.json(categoria);

    res.json(categoriaAct);



}

// Borrar Categoria - estado : false
const borrarCategoria = async(req, res = response) => {
    const { id } = req.params;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json(categoriaBorrada);
}

module.exports = {
    CrearCategoria,
    obtenerCategorias,
    ObtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}
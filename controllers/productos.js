const { response } = require("express");
const { Producto } = require("../models");



//Obtener Productos -- Paginado - total - populate

const obtenerProductos = async(req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    })

};

//Obtener Producto  - populate {}

const obtenerProducto = async(req, res = response) => {

    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    res.json(producto);
}

const CrearProducto = async(req, res = response) => {

    console.log("Dentro CrearProducto Controller");

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `el producto ${productoDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar 
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    console.log(data);

    const producto = new Producto(data);

    // Guardar en Base datos
    await producto.save();

    res.status(201).json(producto);


}

// Actualizar Categoria

const actualizarProducto = async(req, res = response) => {

    const { id } = req.params;
    // por un lado extraigo el estado y el usuario, y el resto
    // en la data 
    const { estado, usuario, ...data } = req.body;

    // Poner el nombre de la categoria en mayuscula antes de guardarlo
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const productoAct = await Producto.findByIdAndUpdate(id, data, { new: true });

    // res.json(categoria);

    res.json(productoAct);



}

// Borrar Producto - estado : false
const borrarProducto = async(req, res = response) => {
    const { id } = req.params;

    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.status(200).json(productoBorrado);
}

module.exports = {
    CrearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}
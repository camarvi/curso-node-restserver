const { Categoria, Usuario, Role, Producto } = require('../models');
//const Role = require('../models/role');
//const Usuario = require('../models/usuario');


const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}


const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email: ${correo} ,ya esta registrado en la BD`)
    }
}


const existeUsuarioPorId = async(id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`No existe un usuario con ese ID: ${id}`)
    }
}


const existeCategoriaPorId = async(id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`No existe una categoria con ese ID: ${id}`)
    }
}

/**
 * Productos
 */

const existeProductoPorId = async(id = '') => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`No existe un producto con ese ID: ${id}`)
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
};
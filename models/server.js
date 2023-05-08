const express = require('express');
const cors = require('cors')

const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'
        };

        // this.usuariosPath = '/api/usuarios';
        // this.authPath = '/api/auth';

        //Conectar a Base de datos
        this.conectarDB();


        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }


    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y Parseo del body
        this.app.use(express.json());

        // Directorio Publico
        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));



        // this.app.get('/api', (req, res) => {
        //     ///res.send('Hello World')
        //     res.json({
        //         ok: true,
        //         msg: 'Get Api'
        //     });
        // });

        // this.app.put('/api', (req, res) => {
        //     ///res.send('Hello World')
        //     res.json({
        //         ok: true,
        //         msg: 'Put Api'
        //     });
        // });
        // this.app.post('/api', (req, res) => {
        //     ///res.send('Hello World')
        //     res.status(201).json({
        //         ok: true,
        //         msg: 'Post Api'
        //     });
        // });
        // this.app.delete('/api', (req, res) => {
        //     ///res.send('Hello World')
        //     res.json({
        //         ok: true,
        //         msg: 'Delete Api'
        //     });
        // });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor Corriendo en ", this.port);
        });
    }

}



module.exports = Server;
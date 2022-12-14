const express = require('express');
const cors = require('cors')

const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

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

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));


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
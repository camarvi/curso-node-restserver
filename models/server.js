const express = require('express');
const cors = require('cors')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
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
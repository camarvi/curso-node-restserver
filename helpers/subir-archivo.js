const path = require('path');
const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


const subirArchivo = (files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'],
    carpeta = '') => {


    return new Promise((resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // validar la extension
        //  const extensionesValidas = ;

        if (!extensionesValidas.includes(extension)) {
            return reject(`extension ${extension} no valida`)
                // return res.status(400).json({
                //     'msg': `extension ${extension} no valida`
                // });
        }


        const nombreTemp = uuidv4() + "." + extension;

        //const uploadPath = path.join(__dirname, '../uploads/', archivo.name);
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                //return res.status(500).json({ err });
                reject(err);
            }

            //res.json({ msg: 'File uploaded to ' + uploadPath });
            resolve('File uploaded as ' + nombreTemp);

        });



    });




}



module.exports = {
    subirArchivo
}
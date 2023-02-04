import fs from "fs";
const path = require('path');

const multer = require('multer');

const diskStorage = multer.diskStorage({
    /*destination: (req:any, file:any, cb:any) => {
        //cb(null, 'src/projectFiles');
    },*/
    destination: (req:any, file:any, cb:any) => {
        const { name } = req.params;
        const pathUpload = `./uploads/${name}`;
        if (!fs.existsSync(path.join(__dirname, '../projectFiles'))){
            fs.mkdirSync(path.join(__dirname, '../projectFiles'));
        }
        if (!fs.existsSync(path.join(__dirname, '../projectFiles/' + name))){
            fs.mkdirSync(path.join(__dirname, '../projectFiles/' + name));
        }
        const filepath = path.join(__dirname, '../projectFiles') + '/' + name ;
        cb(null, filepath);
    },
    filename: (req:any, file:any, cb:any) => {
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = file.originalname + '.' + fileType;
        cb(null, fileName);
    },
});

const fileFilter = (req:any, file:any, cb:any) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const storage = multer({ storage: diskStorage, fileFilter: fileFilter }).single(
    'image'
);

module.exports = storage;

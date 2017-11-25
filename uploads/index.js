let express = require('express')
    , router = express.Router()
    , path = require('path');
const multer = require('multer');

let uploadController = require('../schema/controller').uploadController
    , uploadMailController = require('../sendgrid/controller').uploadMailController;

let storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads/diskStorage');
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
router.use((req, res, next)=>{
   if(!req.user){
       res.redirect('/');
   }else{
       next();
   }
});
/*Get home page*/
router.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname +'/../views/upload.html'));
});

router.post('/upload',multer({ storage: storage}).single('fileToUpload'), async (req, res)=>{

    // TODO: userSession
    let userSession = req.session.passport.user;
    let uploadObj = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        type: req.body.group,
        userID: userSession.member_id || '109484023739009832780',
        userEmail: userSession.email || 'abhimanyuvashisht.av@gmail.com',
        filename: req.file.filename,
        mobile: req.body.tell,
        price: req.body.price
    };
    try {
        let upload = await uploadController(uploadObj);
        uploadMailController(upload);
        res.send('<!DOCTYPE html>' +
            '<html lang="en">' +
            '<head>' +
            '<meta charset="UTF-8">' +
            '<title>Upload Successful</title>' +
            '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">' +
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js">' +
            '</script></head><body><h2>Upload Successful</h2> <h3>UploadID: '+ upload.uploadID+'</h3> <a class="waves-effect waves-light btn" href="/">HOME</a>' +
            '</body>' +
            '</html>');
    }catch (err){
        console.log(err);
    }

});



module.exports = router;
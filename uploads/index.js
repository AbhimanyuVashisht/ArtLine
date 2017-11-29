let express = require('express')
    , router = express.Router()
    , path = require('path');
const multer = require('multer');

// spawn function to create the child process
const spawn = require('child_process').spawn;

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
    let userSession = req.session.passport.user;
    let uploadObj = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        type: req.body.group,
        userID: userSession.member_id,
        userEmail: userSession.email,
        filename: req.file.filename,
        mobile: req.body.tell,
        price: req.body.price
    };


    // Calling the child-process
    let py = spawn('python3', ['ML/nsfw_uploads/classify_nsfw.py', '-m', 'ML/nsfw_uploads/data/open_nsfw-weights.npy',  'uploads/diskStorage/' + uploadObj.filename]);
    let dataString = '';
    py.stdout.on('data', async (data)=>{
       dataString += data;
       dataString = dataString.split('\t');
       console.log('SFW ' + dataString[2]);
       console.log('NSFW ' + dataString[4]);
       if(dataString[2].split('\n')[0] > 0.50){
           console.log(200);
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
       }else{
           res.send('<!DOCTYPE html>' +
               '<html lang="en">' +
               '<head>' +
               '<meta charset="UTF-8">' +
               '<title>Warning</title>' +
               '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">' +
               '<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js">' +
               '</script></head><body><h2>Warning: </h2> <h3> Content Not Safe for Work</h3> <a class="waves-effect waves-light btn" href="/">HOME</a>' +
               '</body>' +
               '</html>');
       }
    });


    py.stderr.on('data', (data)=>{
        console.log(data.toString());
    });

    py.on('close', (code)=>{
        console.log('child process ' + code);
    });

});



module.exports = router;
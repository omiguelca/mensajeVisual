var express = require('express');
var multer  = require('multer')
var fs = require('fs');
//const xlsx = require('node-xlsx');
var router = express.Router();
var upload = multer({ dest: 'upload'});

router.post('/',upload.single('archivo'), function(req, res, next) {

    fs.rename('upload/'+req.file.filename, 'upload/'+req.file.originalname, function (err) {
      if (err) throw err;
      
      res.send("el archivo tiene: "+obj.length+" pestañas");
    });

  });

module.exports = router;

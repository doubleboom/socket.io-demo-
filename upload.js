var express = require('express')
var multer  = require('multer')
var upload = require('jquery-file-upload-middleware');

upload.configure({
    uploadDir: './public/images/',
    uploadUrl: '/images'
});

var app = express()

app.use(express.static('public'));


app.post('/upload', function (req, res, next) {
  upload.fileHandler()(req, res, next);
  console.log('upload success');
})

app.listen(3000,function(){
    console.log('server is running');
})
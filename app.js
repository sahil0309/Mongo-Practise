require('./api/data/dbconnection').open();
var express = require('express');
var app = express();
var path = require('path');
var routes = require('./api/routes');
var cors = require('cors');

var bodyParser=require('body-parser');

app.listen(3000);
console.log('Magic Happens on Port 3000');


app.use(function(req,res,next){

     console.log(req.method,req.url);
     next();
})

app.use(cors());
//app.use(express.static(path.join(__dirname,'dist/hotel')));
app.use(bodyParser.urlencoded({extended:false}))
app.use('/api',routes);


app.get('/',function(req,res){

    console.log('Got The Home');
  //  res.sendFile(path.join(__dirname,'dist/hotel','index.html'))
  res.send("Welcome To Node Server")
})
/*
app.get('/json',function(req,res){

    console.log('Got The Home');
    res.json({"jsondata":true})
})

app.get('/file',function(req,res){

    console.log('Got The Home');
    res.sendFile(path.join(__dirname,'app.js'));
})
*/
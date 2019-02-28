var MongoClient = require('mongodb').MongoClient;
var dburl ='mongodb://database:27017';

var _connection=null;

var open = function(){
    MongoClient.connect(dburl,function(err,client){
        if(err)
        {
            console.log("Connection Failed");
            return;
        }
        _connection=client.db('meanhotel');
        console.log("DB Connection Open");
    })
    //set connection
};

var get  =function(){
    return _connection;
}

module.exports={
    open:open,
    get:get
};

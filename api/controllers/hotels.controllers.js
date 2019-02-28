var hotelData = require('../data/hotel-data.json');
var dbconn = require('../data/dbconnection');
var ObjectId = require('mongodb').ObjectId;


module.exports.hotelsGetAll=function(req,res){

    var db =dbconn.get();
    var collection = db.collection("hotels");

    var offset=0;
    var count=20;
   
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count,10);
    }

    collection.find().skip(offset).limit(count).toArray(function(err,docs)
    {
        console.log("Found Hotels");
        res.status(200).json(docs);
    });
   
    /*
    console.log("db",db);
    console.log("Get The Hotels");
    console.log(req.query);
   
    var returnData = hotelData.slice(offset,offset+count);
    res.json(returnData);
    */
}

module.exports.hotelsGetOne=function(req,res){

    var db =dbconn.get();
    var collection = db.collection("hotels");
    var hotelId= req.params.hotelId;
    collection.findOne({
        _id:ObjectId(hotelId)
    },function(err,doc){
        res.status(200)
            .json(doc);
    });
    //var thisHotel=hotelData[hotelId];   
   // res.json(thisHotel);
    
}

module.exports.hotelsAddOne=function(req,res){
    var db =dbconn.get();
    var newHotel;
    var collection = db.collection("hotels");
 
    if(req.body && req.body.name && req.body.stars)
    {
        newHotel=req.body;
        newHotel.stars=parseInt(req.body.stars,10);
        collection.insertOne(newHotel,function(err,response){
            console.log(response.ops);
           res.status(201)
            .json(response.ops)
        })
     
    }
    else
    {
        console.log("Data Missing From Body");
        res.status(400)
        .json({message:"Required Data Missing From Body"});
    }
}
    module.exports.welcome=function(req,res){
        var db =dbconn.get();
        res.json({message:"Welecome From MongoDB"});
    }
    


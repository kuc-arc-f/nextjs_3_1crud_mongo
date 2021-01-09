var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//console.log(req);
console.log(req.body);
    var data = req.body
    var item = {
      title: data.title ,  
      content: data.content ,
      created_at: new Date(),
    };
    const collection = await LibMongo.get_collection("tasks" )
    await collection.insertOne(item); 
    /*
    var collection = await LibMongo.get_collection("tasks" )
    var items = await collection.find({}).sort({created_at: -1}).toArray()
    */
    var ret ={
      p1: "param222",
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
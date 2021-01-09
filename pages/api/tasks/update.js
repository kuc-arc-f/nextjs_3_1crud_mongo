var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//console.log(req.body);
    var data = req.body
    var id = data.id
    var item = {
      title: data.title ,  
      content: data.content ,
    };
//console.log(item);
      const collection = await LibMongo.get_collection("tasks" )
      var where = {"_id": new ObjectID( id )};
      await collection.updateOne(where, { $set: item })
//console.log(id);
    var ret ={
//      p1: "param222",
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var collection = await LibMongo.get_collection("tasks" )
    var items = await collection.find({}).sort({created_at: -1}).toArray()
    var ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
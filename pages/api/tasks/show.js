var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//    console.log("id=", req.query.id);
    var id = req.query.id
    const collection = await LibMongo.get_collection("tasks" )
    var where = { _id: new ObjectID(id) }
    var item = await collection.findOne(where)            
    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
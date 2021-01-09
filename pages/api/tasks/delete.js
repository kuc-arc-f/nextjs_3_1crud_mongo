var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//console.log(req.body);
    var data = req.body
    var id = data.id
    const collection = await LibMongo.get_collection("tasks" )
    var where = { "_id": new ObjectID( id ) };
    await collection.deleteOne(where)    
    var ret ={
      id: id
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
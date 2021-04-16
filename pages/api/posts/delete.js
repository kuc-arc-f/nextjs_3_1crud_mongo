var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//console.log(req.body);
    var data = req.body
    var id = data.id
    var where = { "_id": new ObjectID( id ) };
    let client = await LibMongo.get_client()
    const db = client.db( LibMongo.get_db_name() )
    const collection = db.collection("posts");
    await collection.deleteOne(where)   
    client.close()    
    var ret ={
      id: id
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
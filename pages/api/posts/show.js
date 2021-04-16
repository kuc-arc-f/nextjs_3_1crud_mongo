var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//    console.log("id=", req.query.id);
    var id = req.query.id
    var where = { _id: new ObjectID(id) }
    let client = await LibMongo.get_client()
    const db = client.db( LibMongo.get_db_name() );
    const collection = db.collection("posts");
    var item = await collection.findOne(where)
    client.close();
    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    let client = await LibMongo.get_client()
    const db = client.db( LibMongo.get_db_name() );
    const collection = db.collection("posts");
    var items = await collection.find({}).sort({created_at: -1}).toArray()
    client.close();
//console.log(items)
    var ret ={
      items: items
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
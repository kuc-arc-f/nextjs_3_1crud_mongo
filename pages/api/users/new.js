var ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
    let hashed_password = bcrypt.hashSync(data.password, 10);
// console.log(hashed_password);
    var item = {
      mail: data.mail,
      password: hashed_password,
      name: data.name,
      created_at: new Date(),
    }    
//console.log(item);
    const collection = await LibMongo.get_collection("users" )
    await collection.insertOne(item); 

    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
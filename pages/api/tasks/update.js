var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
    var data = req.body
// console.log(data);
    if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
      throw new Error('Invalid Token, csrf_check');
    }  
    var id = data.id
    var item = {
      title: data.title ,  
      content: data.content ,
    };
//console.log(item);
    var where = {"_id": new ObjectID( id )};
    await LibMongo.update_item("tasks" , where, item )
    var ret ={
      item: item
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async function (req, res){
  try{
//console.log(req.body);
    var data = req.body
    var token =data._token
// console.log(token)
    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
      throw new Error('Invalid Token, csrf_check');
    }    
    var item = {
      title: data.title ,  
      content: data.content ,
      created_at: new Date(),
    };
    const itemOne = await LibMongo.add_item("tasks" ,item )
    var ret ={
      item: itemOne
    }
    res.json(ret);
  } catch (err) {
      console.log(err);
      res.status(500).send();    
  }   
};
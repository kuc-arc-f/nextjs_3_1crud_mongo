var ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
var csrf = require('csrf');
var tokens = new csrf();

import LibMongo from "../../../libs/LibMongo"

//
export default async (req, res) => {
  try{
    if (req.method === "POST") {
      var retArr= {ret:0, user_id:0}
      var data = req.body
// console.log(data)
      if(tokens.verify(process.env.CSRF_SECRET, data._token) === false){
        throw new Error('Invalid Token, csrf_check');
      }  
      const collection = await LibMongo.get_collection("users" )
      var where = { mail: data.mail }
      var item = await collection.findOne(where)  
//console.log(item)
      if(item == null){ return res.json(retArr); }
      if (data.mail === item.mail
        && bcrypt.compareSync(data.password,  item.password )){
          //console.log("OK-auth:", data.mail)
          retArr.ret = 1
          item.password = ""
          retArr.user = item
          return res.json(retArr);
      }else{
        //console.log("NG-auth:", data.mail)
        return res.json(retArr);
      } 
    }
    return res.status(404).send("");
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}

//
const bcrypt = require('bcrypt');
//var cookie   = require('cookie');
//var ObjectID = require('mongodb').ObjectID;
var csrf = require('csrf');
var tokens = new csrf();

//import LibMongo from "../../libs/LibMongo"
//import LibCsrf from "../../libs/LibCsrf"
//
export default async (req, res) => {
  try{
    var retArr= {ret:0, user_id:0}
    var data = req.body
    var token =data._token
// console.log(token)
    if(tokens.verify(process.env.CSRF_SECRET, token) === false){
      throw new Error('Invalid Token, csrf_check');
    }else{
      console.log("OK, CSRF")
      retArr.ret = 1
    }
    return res.json(retArr);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}
/*
function valid_old(){
  if(typeof req.headers.cookie != 'undefined'){
    var parsed_cookie = cookie.parse(req.headers.cookie);
    console.log("sid:", parsed_cookie.session_id )
    var id = parsed_cookie.session_id
    const collection = await LibMongo.get_collection("sessions" )
    var where = { _id: new ObjectID(id) }
    var item = await collection.findOne(where)
    if(item != null){
      console.log("secret:",item.value.secret)
      await collection.deleteOne(where)
    }
  }
}
*/

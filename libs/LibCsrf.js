// LibCsrf
var csrf = require('csrf');
var tokens = new csrf();
import LibMongo from "../libs/LibMongo"

//
export default {
  get_token:async function(secret){
    try{
      var token = tokens.create(secret);
      var ret ={
        token: token,
      }
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_token');
    }
  },
  get_token_db:async function(user_id){
    try{
      var secret = tokens.secretSync();
      var token = tokens.create(secret);
      const collection = await LibMongo.get_collection("sessions" )
      var item = {
          value:{
            secret: secret,
            token: token,
          },
          user_id: user_id,
          created_at: new Date(),
      }
      var doc = await collection.insertOne(item);           
      var ret ={
        id: doc.insertedId.toString(),
        token: token,
      }
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_token');
    }
  },  
  valid_token:function(token){
    try{
//        var secret = req.session._csrf;
//        var token = req.cookies._csrf;
        if(tokens.verify(process.env.CSRF_SECRET, token) === false){
            throw new Error('Invalid Token');
        }
        return true
    } catch (e) {
        console.log(e);
        console.log("error, csrf token");
        req.flash('err', 'Error , csrf token');
        res.redirect('/')
        return false
    }  

  }

}
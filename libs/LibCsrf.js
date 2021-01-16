// LibCsrf
var csrf = require('csrf');
var tokens = new csrf();
import LibMongo from "../libs/LibMongo"

//
export default {
  get_token:async function(user_id){
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
//      console.log( doc.insertedId.toString() )
      var ret ={
        id: doc.insertedId.toString(),
        token: token,
      }
      return ret
    } catch (e) {
      console.log(e);
      throw new Error('error, get_token');
    //            return false
    }
  },
  valid_token:function(req, res){
      try{
          var secret = req.session._csrf;
          var token = req.cookies._csrf;
          if(tokens.verify(secret, token) === false){
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
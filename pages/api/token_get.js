//
const bcrypt = require('bcrypt');
//var cookie   = require('cookie');
//import LibMongo from "../../../libs/LibMongo"
import LibCsrf from "../../libs/LibCsrf"
//
export default async (req, res) => {
  try{
    var data = req.body
//    console.log(data)
    var csrf = await LibCsrf.get_token(process.env.CSRF_SECRET)
    var retArr= {
      ret:1, user_id:0, csrf: csrf
    }
    return res.json(retArr);
  } catch (err) {
    console.log(err);
    res.status(500).send();    
  }  
}

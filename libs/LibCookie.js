// LibCookie
import moment from 'moment'
//
export default {
  set_cookie: function(key, value){
    try{
      var dt = moment().add(10, 'year').toDate().toUTCString()
//      console.log( dt );
      document.cookie = `${key}=${value}; path=/; expires=${dt}`;
    } catch (e) {
      console.log(e);
      throw new Error('error, get_token');
    }
  },


}
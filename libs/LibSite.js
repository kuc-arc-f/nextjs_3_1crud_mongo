//LibSite

//
export default {
  valid_form :function(formData){
    try {
      var ret = false
      var name = formData.get( "name" )
//console.log( name)
      if(name == ""){
          alert("Error, name is required.")
          return ret
      }
      return true
    } catch (err) {
//            console.error(`Error: ${JSON.stringify(err)}`)
      throw new Error('Error , get_show_item');
    }          
  },  
  getRandomStr :function(){
    var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var random = Math.floor( Math.random()* s.length );
    if(random >= s.length){ throw new Error('Error , getRandomStr'); }
   //    console.log(s.length ,random )
   //    console.log(s[random] )
    return s[random]    
  },
  get_apikey :function(){
    try{
      var s = ""
      for(var i=0; i< 24; i++ ){
        s += this.getRandomStr()
      }
//      console.log(s)
      return s
    } catch (err) {
      console.log(err);
      throw new Error('error, get_apikey');
    }    
  },

}

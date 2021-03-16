
export default {
  add_test :async function(num , _token){
    try{
//      var content_name ="test_1"
      var item = {
        title: "title-" + num,
        content: "content-" + num,
        _token: _token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL + '/api/tasks/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });      
      if (res.status != 200) {
        throw new Error(await res.text());
      }
    } catch (err) {
      console.log(err);
      throw new Error("Error, add_test ");
    }
  },
  delete_count_items: async function(items){
    try{
      var api_key = process.env.MY_API_KEY
      var len = items.length
      for(var i=0; i < len; i++){
        var item = items[i]
//console.log(item._id)
        var delete_item = {
          id: item._id,
        }
        const response = await fetch(process.env.BASE_URL + '/api/tasks/delete', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',  'apikey': api_key
          },
          body: JSON.stringify(delete_item),
        });
        if (response.status !== 200) {
          throw new Error(await response.text());
        }        
      }
    } catch (err) {
      console.log(err);
      throw new Error('error, delete_count_items');
    }    
  },      

}

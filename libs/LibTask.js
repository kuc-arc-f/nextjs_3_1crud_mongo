
var ObjectID = require('mongodb').ObjectID;
import LibMongo from "../libs/LibMongo"

//
export default {
    get_show_item :async function(id){
        try {
            var item = []
            const collection = await LibMongo.get_collection("tasks" )
            var where = { _id: new ObjectID(id) }
            var item = await collection.findOne(where)            
console.log('#get_items.id=' ,id)
// console.log( item)            
            return item
        } catch (err) {
//            console.error(`Error: ${JSON.stringify(err)}`)
            throw new Error('Error , get_show_item');
        }          
    },    
    func1 :async function(){
    },

}

// LibAuth
import firebase from 'firebase'
//
export default {
    valid_auth:async function(firebase){
        await firebase.auth().onAuthStateChanged(function(user) {
            var ret = false
            if (user) {
//                console.log("#Auth-OK");
                return true
            } else {
                console.log('#no-User');
                return ret
            }
        })         
    },
    get_users: async function(firebase){
        try{
            var items = []
            this.database = firebase.firestore()
            var dbRef = this.database.collection('users')
            var querySnapshot = await dbRef.get()
            querySnapshot.forEach(function(doc) {
                var item = doc.data()
                items.push(item)            
            })
//console.log(items)
            return items
        } catch (e) {
            console.error(e);
            throw new Error('Error , get_users');
        }        
    },
    add_users: async function(firebase, user){
        try{
            var item = {
                name: user.displayName,
                mail: user.email ,  
                uid: user.uid,
                password: "",
                created_at: firebase.firestore.Timestamp.fromDate(new Date()),
            };
            var database = firebase.firestore()
            var docRef = await database.collection('users').add(item)
            console.log("Document written with ID: ", docRef.id)             
       } catch (e) {
            console.error(e);
            throw new Error('Error , add_users');
        }        
    },

}

export default {
    func1 :function(){
        console.log('#_func1aa')
    },
    func2 :function(){
        console.log('#_func2')
        this.func1()
    },

}

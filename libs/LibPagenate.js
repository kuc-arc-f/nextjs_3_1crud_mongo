// LibPagenate
import LibCommon from "../libs/LibCommon"

//
export default {
    init:function(){
        this.per_page = 20;
    },    
    set_per_page:function(num){
        this.per_page = num;
    },    
    get_page_start:function(page){
        var start_num = (page -1) * this.per_page;
        var ret ={
            start: start_num,  limit: this.per_page,
        }        
//        console.log("per_page:",this.per_page)
        return ret;
    },    
    get_per_page:function(){
        console.log("per_page:",this.per_page)
        return this.per_page;
    },
    is_paging_display(count){
        var ret = 0;
        var num = count / this.per_page;
        if(num >= 1){
            ret = 1
        }
        //ret = parseInt( num );
        return ret;
    },
    get_page_items(data){
        var paginate_disp = this.is_paging_display(data.length)
        var page_item = {
            "item_count":data.length ,"paginate_disp": paginate_disp
        }
        var param = {
             "docs": data ,
             "page_item": page_item,            
        };
        return  param;       
    }    
}
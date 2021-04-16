// import Link from 'next/link';
import React from 'react'
import cookies from 'next-cookies'
import Header from '../Layout/AppHead';
import IndexRow from './IndexRow';
import LibSite from '../../libs/LibSite';
import LibTest from '../../libs/LibTest';
//
export default class Page extends React.Component {
  static async getInitialProps(ctx) {
  //console.log(json)
    var url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
//console.log(json)
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
      items: [],
    }
  }
  constructor(props){
    super(props)
// console.log(this.props.csrf )
  }  
  async handleClick(){
    await this.delete_items()
    await this.add_item()
  } 
  async delete_items(){
    try{
      const res = await fetch(process.env.BASE_URL+ '/api/tasks/list')
      const json = await res.json();
//console.log(json.items )
      await LibTest.delete_count_items(json.items)
      } catch (e) {
      console.log(e);
      throw new Error('error, get_item');
    }    
  }  
  async add_item(){
    try{
      for(var i=0; i< 10; i++){
console.log("i=", i)
        var key = LibSite.get_apikey()
        await LibTest.add_test(key , this.props.csrf.token)
      }
    } catch (e) {
      console.log(e);
      throw new Error('error, get_item');
    }    
  }
  render() {
//console.log(this.props.items )
    const items = this.props.items
    return (
    <div>
      <h1>Tasks - test</h1>
      <ul>
      {items.map((item, index) => {
        return (<IndexRow key={index}
                id={item._id} title={item.title} />       
        )
      })}      
      </ul>
      <hr />
      <div className="form-group">
        <button className="btn btn-primary" onClick={this.handleClick.bind(this)}>Create
        </button>
      </div>                      
    </div>
    )
  }

}

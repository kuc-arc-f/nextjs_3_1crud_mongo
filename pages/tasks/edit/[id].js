import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import flash from 'next-flash';
import cookies from 'next-cookies'

import Layout from '../../../components/layout'
//
export default class extends React.Component {
  constructor(props){
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.state = {
      title: this.props.item.title, 
      content: this.props.item.content,
    }
//console.log(this.props )
  }
  static async getInitialProps(ctx) {
    console.log("id=", ctx.query.id)
    var id = ctx.query.id
    const res = await fetch('/api/tasks/show?id=' + id)
    const json = await res.json()
  // console.log(json)
    var item = json.item    
//console.log(item)
      return {
          id: id,
          item: item,
          user_id :cookies(ctx).user_id
      };
  }
  componentDidMount(){
//    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }
  }     
  handleChangeTitle(e){
    console.log("handleChangeTitle:")
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }  
  async handleClickDelete(){
    //delete
    console.log("#deete-id:" , this.props.id)
    try {
      var item = {
        title: this.state.title,
        content: this.state.content,
        id: this.props.id,
      }
//console.log(item)
        const res = await fetch('/api/tasks/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(item),
        });
      if (res.status === 200) {
        Router.push('/tasks');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }     
    /*
    var db= await LibStore.get_db()
    var docRef = db.collection("tasks").doc(this.props.id)
    docRef.delete().then(function() {
        console.log("Document successfully deleted!")
        Router.push('/tasks')
    }).catch(function(error) {
        console.error("Error removing document: ", error)
    })    
    */
  } 
  async handleClick(){
  console.log("#-handleClick")
//  console.log(this.state)
    await this.update_item()
  }     
  async update_item(){
    try {
      var item = {
        title: this.state.title,
        content: this.state.content,
        id: this.props.id,
      }
//console.log(item)
        const res = await fetch('/api/tasks/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
      if (res.status === 200) {
        Router.push('/tasks');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }     
  }  
  render() {
    return (
      <Layout>
          <div className="container">
            <hr className="mt-2 mb-2" />
            <h1>Tasks - Edit</h1>
            <div className="row">
              <div className="col-md-6">
                  <div className="form-group">
                      <label>Title:</label>
                      <input type="text" id="title" className="form-control"
                      value={this.state.title}
                      onChange={this.handleChangeTitle.bind(this)} />
                  </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                  <label>Content:</label>
                  <input type="text" className="form-control"
                    value={this.state.content}
                    onChange={this.handleChangeContent.bind(this)}/>
              </div>
              </div>
            </div><br />
            <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>Save
              </button>
            </div>
            <hr />                  
            <div className="form-group">
              <button className="btn btn-danger" onClick={this.handleClickDelete}>Delete
              </button>
            </div>

            <hr />
            ID : {this.props.id}
          </div>
      </Layout>
    );
  };
}
/*
Page.getInitialProps = async (ctx) => {
  console.log(ctx.query.id)
  var id = ctx.query.id
  var item = {
    title: "",
    content: "",
  }
  if(typeof id !== 'undefined'){
    item = await LibTask.get_show_item(id)
  }
console.log(item)
    return { id: id , item:item }
}
*/

//export default Page


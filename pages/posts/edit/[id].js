//import Head from 'next/head'
import Link from 'next/link';
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
      _token : this.props.csrf.token,
    }
//console.log(this.props )
  }
  static async getInitialProps(ctx) {
    console.log("id=", ctx.query.id)
    var id = ctx.query.id
    const res = await fetch(process.env.BASE_URL + '/api/posts/show?id=' + id)
    const json = await res.json()
    var item = json.item    
    var url = process.env.BASE_URL + '/api/token_get'
    var tokenRes = await fetch(url)
    var tokenJson = await tokenRes.json()    
  // console.log(json)
      return {
          id: id,
          item: item,
          user_id :cookies(ctx).user_id,
          csrf: tokenJson.csrf,
      };
  }
  componentDidMount(){
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
        _token: this.state._token
      }
//console.log(item)
        const res = await fetch(process.env.BASE_URL +'/api/posts/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify(item),
        });
      if (res.status === 200) {
        Router.push('/posts');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }     
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
        _token: this.state._token
      }
//console.log(item)
        const res = await fetch(process.env.BASE_URL +'/api/posts/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
      if (res.status === 200) {
        Router.push('/posts');
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
            <Link href="/posts">
              <a className="btn btn-outline-primary mt-2">Back</a></Link>
            <hr className="mt-2 mb-2" />
            <h1>Posts - Edit</h1>
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


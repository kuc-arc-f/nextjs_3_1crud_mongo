import Link from 'next/link';
import Router from 'next/router'
import flash from 'next-flash';
import React, {Component} from 'react';
import cookies from 'next-cookies'

import Layout from '../../components/layout'
//
export default class extends Component {
  static async getInitialProps(ctx) {
    var url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()
//console.log(json)
    return { 
      user_id :cookies(ctx).user_id,
      csrf: json.csrf,
    }
  }  
  constructor(props){
    super(props)
    this.state = {title: '', content: '', _token : ''}
    this.handleClick = this.handleClick.bind(this);
    this.database = null
//console.log(props)
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token });
    console.log( "user_id=" ,this.props.user_id )
    if(typeof this.props.user_id === 'undefined'){
      flash.set({ messages_error: 'Error, Login require' })
      Router.push('/login');
    }
  }   
  handleChangeTitle(e){
    this.setState({title: e.target.value})
  }
  handleChangeContent(e){
    this.setState({content: e.target.value})
  }   
  handleClick(){
    this.add_item()
  } 
  async add_item(){
    try {
      var item = {
        title: this.state.title,
        content: this.state.content,
        _token: this.state._token
      }
//console.log(item)
      const res = await fetch(process.env.BASE_URL + '/api/tasks/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
//        console.log(res)
        Router.push('/tasks');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      alert("Error, save item")
      console.error(error);
    }    
  } 
  render() {
    return (
      <Layout>
        <div className="container">
          <hr className="mt-2 mb-2" />
          <h1>Tasks - Create</h1>
          <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" className="form-control"
                    onChange={this.handleChangeTitle.bind(this)} />
                </div>
            </div>
          </div>
          <div className="row">
              <div className="col-md-6">
              <div className="form-group">
                  <label>Content:</label>
                  <input type="text" className="form-control"
                    onChange={this.handleChangeContent.bind(this)}/>
              </div>
              </div>
          </div><br />          
          <div className="form-group">
              <button className="btn btn-primary" onClick={this.handleClick}>Create
              </button>
          </div>                
          <hr />
        </div>
      </Layout>
    )    
  } 
}


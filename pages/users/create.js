import Link from 'next/link';
import Router from 'next/router'
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
    this.state = {
      name: '',
      mail: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);    
    this.handleClick = this.handleClick.bind(this);
    this.database = null
// console.log(props)
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token });
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
        mail: this.state.mail,
        password: this.state.password,
        name: this.state.name,
        _token: this.state._token
      }
//console.log(item)
        const res = await fetch('/api/users/new', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(item),
        });
      if (res.status === 200) {
        var json = await res.json()
console.log( json )
        alert("Success, User add")
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }    
  }
  handleChange(event) {
//    console.log(event.target.name )
    const value = event.target.value;
    if(event.target.name ==='mail' ){
        this.setState({mail: value });
    }
    if(event.target.name ==='name' ){
      this.setState({name: value });
  }
  if(event.target.name ==='password' ){
      this.setState({password: value });
    }    
  }   
  render() {
    return (
    <Layout>
      <div className="container">
        <hr className="mt-2 mb-2" />
        <h1>User - Create</h1>
        <div className="col-sm-6">
          <div className="form-group">
              <label>mail:</label>
              <input name="mail" type="text" className="form-control"
              value={this.state.mail}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="col-sm-6">
          <div className="form-group">
              <label>Name:</label>
              <input name="name" type="text" className="form-control"
              value={this.state.name}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>        
        <div className="col-sm-6">
          <div className="form-group">
              <label>password:</label>
              <input name="password" type="password" className="form-control"
              value={this.state.password}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick}>save
          </button>
        </div>
      </div>
    </Layout>
    )    
  } 
}


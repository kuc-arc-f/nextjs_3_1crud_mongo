
import React from 'react'
import Link from 'next/link';
import Router from 'next/router'
import cookies from 'next-cookies'
import flash from 'next-flash';

import Layout from '../components/layout'
import LibCookie from '../libs/LibCookie'
//
class Page extends React.Component {
  static async getInitialProps(ctx) {
    var url = process.env.BASE_URL + '/api/token_get'
    const res = await fetch(url)
    const json = await res.json()    
    return {
      initialName: '',
      flash: flash.get(ctx)|| {},
      csrf: json.csrf,
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: '',_token : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
// console.log(this.props)
  }
  componentDidMount(){
    this.setState({ _token: this.props.csrf.token });
  }
  handleClick(){
    this.post_item()
  }
  async post_item(){
    try {
      var item = {
        mail: this.state.mail,
        password: this.state.password,
        _token: this.state._token
      }
      const res = await fetch(process.env.BASE_URL + '/api/users/auth_check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        var json = await res.json()
        console.log(json )
        if(parseInt(json.ret) === 1){
          console.log("OK, post_item")
          LibCookie.set_cookie("user_id", json.user._id) 
          alert("Success, Login")          
          Router.push('/');
        }else{
          console.log("NG, post_item")
          alert("Error, Login")
        }
      } else {
        throw new Error(await res.text());
      }      
//console.log(item)
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
    if(event.target.name ==='password' ){
      this.setState({password: value });
    }    
  }
  render() {
    return (
    <Layout>
      { this.props.flash.messages_error ? 
      <div className="alert alert-danger" role="alert">{this.props.flash.messages_error}</div> 
      : <div /> }
      <div className="container">
        <h1>Login</h1>
        <hr />
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
              <label>password:</label>
              <input name="password" type="password" className="form-control"
              value={this.state.password}
              onChange={this.handleChange.bind(this)} />
          </div>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleClick}>Login
          </button>
        </div>
        <hr /> 
        <Link href="/users/create">
          <a className="btn btn-outline-primary">Signup</a>
        </Link>                 
      </div>
    </Layout>
    );
  }
}
export default Page


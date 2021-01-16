
import Layout from '../components/layout'
import React from 'react'
import Link from 'next/link';
import Router from 'next/router'
import cookies from 'next-cookies'
import flash from 'next-flash';
//
class Page extends React.Component {
  static async getInitialProps(ctx) {
    return {
      initialName: '',
      flash: flash.get(ctx)|| {}
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      mail: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
//console.log(this.props)
  }
  handleClick(){
    this.post_item()
  }
  async post_item(){
    try {
      var item = {
        mail: this.state.mail,
        password: this.state.password,
      }
      const res = await fetch('/api/users/auth_check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (res.status === 200) {
        var json = await res.json()
        console.log(json )
        if(parseInt(json.ret) === 1){
          console.log("OK, post_item")
          document.cookie = `user_id=${json.user._id}; path=/`;
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


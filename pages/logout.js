
import Layout from '../components/layout'
import React from 'react'
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
//console.log(this.props)
  }
  componentDidMount(){
    document.cookie = 'user_id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    Router.push('/login');
  }

  render() {
    return (
    <Layout>
      <div className="container">
        Logout
      </div>
    </Layout>
    );
  }
}
export default Page


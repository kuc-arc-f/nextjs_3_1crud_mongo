import React from 'react'
import cookies from 'next-cookies'

import Layout from '../components/layout'
import LoginBox from '../components/LoginBox'
//
function Home(props) {
//console.log( "user_id=", props.user_id )
  return (
  <Layout>
    <hr />
    <LoginBox user_id={props.user_id} />
    <div className="container">
      <h1>Home</h1>
      <p>This is home page.</p>
    </div>
    <hr />
  </Layout>
  )
}
export const getServerSideProps = async (ctx) => {
//  console.log("uid=", cookies(ctx).user_id)
  var user_id = cookies(ctx).user_id || ''
  return {
    props: { user_id } 
  }
}
  
export default Home
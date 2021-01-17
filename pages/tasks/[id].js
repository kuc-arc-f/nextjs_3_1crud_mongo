import Head from 'next/head'
import React from 'react'

import Layout from '../../components/layout'
//
function Page(data) {
console.log(data.item )
  var item = data.item

  return (
  <Layout>
    <div className="container">
      <div><h1>{item.title}</h1>
      </div>
      <div>Content: {item.content}
      </div>      
    </div>
  </Layout>
  )
}
//
Page.getInitialProps = async (ctx) => {
  console.log(ctx.query.id)
  var id = ctx.query.id
  const res = await fetch(process.env.BASE_URL +'/api/tasks/show?id=' + id)
  const json = await res.json()
// console.log(json)
  var item = json.item
  return { stars: "s1" , item:item }
}

export default Page


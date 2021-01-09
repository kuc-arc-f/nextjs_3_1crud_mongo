import Head from 'next/head'
import React from 'react'

import Header from '../Layout/AppHead';
//
function Page(data) {
console.log(data.item )
  var item = data.item

  return (
  <div>
    <Header />
    <div className="container">
      <div><h1>{item.title}</h1>
      </div>
      <div>Content: {item.content}
      </div>      
    </div>
  </div>
  )
}
//
Page.getInitialProps = async (ctx) => {
  console.log(ctx.query.id)
  var id = ctx.query.id
//  const res = await fetch('http://localhost:3000/api/tasks/show?id=' + id)
  const res = await fetch('/api/tasks/show?id=' + id)
  const json = await res.json()
// console.log(json)
  var item = json.item
  return { stars: "s1" , item:item }
}

export default Page


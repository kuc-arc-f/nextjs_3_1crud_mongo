import Head from 'next/head'
import React from 'react'
import Link from 'next/link';

import Layout from '../../components/layout'
//
function Page(props) {
  var item = props.item
console.log(item)
  return (
  <Layout>
    <div className="container">
      <Link href="/posts">
        <a className="btn btn-outline-primary mt-2">Back</a></Link>
      <hr />
      <div><h1>Title : {item.title}</h1>
      </div>
      <div>Content: {item.content}
      </div>      
    </div>
  </Layout>
  )
}

export const getServerSideProps = async (ctx) => {
  var id = ctx.query.id
  const res = await fetch(process.env.BASE_URL +'/api/posts/show?id=' + id)
  const json = await res.json()
  var item = json.item
  return {
    props: { item },
  }
}

export default Page


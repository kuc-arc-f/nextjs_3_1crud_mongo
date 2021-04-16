import Link from 'next/link';
import Layout from '../../components/layout'
import IndexRow from './IndexRow';
import cookies from 'next-cookies'
//
function Index(props) {
  const items = props.items
  return (
    <Layout>
      <div className="container">
        <Link href="/posts/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>  
        <hr className="mt-2 mb-2" />        
        <h3>Posts - index</h3>
        <table className="table table-hover">
          <thead>
          <tr>
              <th>Title</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => {
            return (<IndexRow key={index}
                  id={item._id} title={item.title} date={item.created_at} />       
            )
          })}
          </tbody>
        </table>
      </div>
    </Layout>
    )
}

export const getServerSideProps = async (ctx) => {
  //  console.log("uid=", cookies(ctx).user_id)
  const res = await fetch(process.env.BASE_URL+ '/api/posts/list')
  const json = await res.json()
  var user_id = cookies(ctx).user_id || ''
  var items = json.items
  return {
    props: { items, user_id } 
  }
}

export default Index

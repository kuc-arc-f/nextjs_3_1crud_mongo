import Link from 'next/link';
import Layout from '../../components/layout'
import IndexRow from './IndexRow';
import cookies from 'next-cookies'
//
export default class Page extends React.Component {
  constructor(props){
    super(props)
console.log(this.props)
  }  
  static async getInitialProps(ctx) {
    const res = await fetch(process.env.BASE_URL+ '/api/tasks/list')
    const json = await res.json()
//console.log(json)
    return { 
      items: json.items ,user_id :cookies(ctx).user_id
    }
  }
  render() {
    const items = this.props.items
console.log(items)
    return (
    <Layout>
      <div className="container">
        <Link href="/tasks/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>  
        <hr className="mt-2 mb-2" />        
        <h3>Tasks - index</h3>
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
}

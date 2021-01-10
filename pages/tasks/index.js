import Link from 'next/link';
import Header from '../Layout/AppHead';
import IndexRow from './IndexRow';
//
export default class Page extends React.Component {
  constructor(props){
    super(props)
//console.log(this.props.items )
  }  
  static async getInitialProps(ctx) {
//    const res = await fetch('http://localhost:3000/api/tasks/test1')
    const res = await fetch('/api/tasks/list')
    const json = await res.json()
//console.log(json)
    return { items: json.items  }
  }
  render() {
// console.log(this.props.items )
    const items = this.props.items
    return (
    <div>
      <Header />
      <div className="container">
        <Link href="/tasks/create">
          <a className="btn btn-primary mt-2">New</a>
        </Link>          
        <h1>Tasks</h1>
        <ul>
        {items.map((item, index) => {
          return (<IndexRow key={index}
                  id={item._id} title={item.title} />       
          )
        })}      
        </ul>
      </div>
    </div>
    )
  }
}

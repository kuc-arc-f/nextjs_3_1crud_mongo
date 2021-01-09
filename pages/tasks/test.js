// import Link from 'next/link';
import React from 'react'
import Header from '../Layout/AppHead';
import IndexRow from './IndexRow';
//import LibTask from '../../libs/LibTask';
//
export default class Page extends React.Component {
  constructor(props){
    super(props)
//console.log(this.props.items )
  }  
  static async getInitialProps(ctx) {
    const res = await fetch('http://localhost:3000/api/tasks/test1')
    const json = await res.json()
//console.log(json)
    return { items: json.items  }
  }
  render() {
console.log(this.props.items )
    const items = this.props.items
    return (
    <div>
      <h1>Tasks</h1>
      <ul>
      {items.map((item, index) => {
        return (<IndexRow key={index}
                id={item._id} title={item.title} />       
        )
      })}      
      </ul>
    </div>
    )
  }
}

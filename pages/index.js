import Header from './Layout/AppHead';
import Link from 'next/link';
//
export default function Home() {
  return (
  <div>
    <Header />
    <div className="container">
      <hr />
      <h1>Home</h1>
      <p>This is index page.</p>
    </div>
  </div>
  )
}

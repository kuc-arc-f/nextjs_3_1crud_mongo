import Link from 'next/link';
import Head from 'next/head';
//
export default function(){
  return (
  <div className ="footer_box mt5" id="id_foot" >
    <p>Foot : </p>
    <Link href="/about" >
      <a><p className="p_foot_str">About</p>
      </a>
    </Link>
  </div>
  );
}

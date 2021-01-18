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
    <style>{`
    .p_foot_str {
      color: #FFF;
    }
    .footer_box {
      margin-top: 20px;
      background-color: #757575;
      color: #fff;
      padding: 140px 40px;
    }
    `}</style> 
  </div>
  );
}

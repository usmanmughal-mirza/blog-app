import Head from 'next/head'
import Image from 'next/image'
import {PostCard,PostWidget,Categories} from "../components/index"
import { getPosts } from '../services';

export default function Home({posts}) {
  // console.log(posts);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     {/* layout --------------- */}

     <div className="container mx-auto px-10 mb-8">
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

         {/* first div ---- */}
         <div className="lg:col-span-8 col-span-1">
           {posts.map( (post,index) =>(
             <PostCard key={index} post={post.node}  />
           ))}
         </div>

         {/* second div---------------- */}
         <div className="lg:col-span-4 col-span-1">
           <div className="lg:sticky relative  top-8">
             <PostWidget />
             <Categories />
           </div>
         </div>
       </div>
     </div>
    </>
  )
}


// fetch data at build time ------------

export async function getStaticProps(){
const posts=  (await getPosts() ) || [];

return{
  props:{
    posts
  }
}
}
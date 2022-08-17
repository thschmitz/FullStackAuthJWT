import Link from "next/link"
import React from 'react'
import { posts } from "../src/auth/session"

export const getServerSideProps = posts((ctx) => {
  return {
    props: {
      data: {
        session: ctx,
        posts: ctx,
      }
    }
  }
})

const Post = (props) => {
  const posts = props.data.posts.posts
  console.log(posts)

  return (
    <>
      <Link href="/dashboard"><button className="bg-blue-500 rounded-full p-2 text-white m-4 cursor-pointer">Voltar</button></Link>
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-3xl mt-10">Posts</h1>
        {posts.map((post) => {
          return (
            <div className="mt-20 bg-white" key={post.id}>
              <h2 className="text-black">{post.titulo}</h2>
              <p className="text-black">{post.conteudo}</p>
            </div>
          )
        })}
      </div>  
    </>

  )
}

export default Post
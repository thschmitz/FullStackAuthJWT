import Head from 'next/head';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { authService } from "../src/auth/authService";
import { withSession } from "../src/auth/session";

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    }
  }
})

export default function Home(props) {
  const router = useRouter();

  const [values, setValues] = useState({
    title: "Teste",
    content: "Teste"
  })

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    console.log(fieldValue, fieldName)

    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue
      }
    })
  }

  return (
    <>
      <Link href="/dashboard"><button className="bg-blue-500 rounded-full p-2 text-white m-4 cursor-pointer">Voltar</button></Link>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Home</title>
        </Head>

        <div id="login" style={{display:"block"}} className="max-w-sm w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create you own post !</h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Post's Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="title"
                  value={values.title}
                  required
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Title"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Content
                </label>
                <input
                  id="content"
                  name="content"
                  type="content"
                  required
                  value={values.content}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Content"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={async (event)=> {
                  event.preventDefault();
                  
                  authService.createPost({
                    title:values.title,
                    content:values.content
                  }).then((resposta) => {
                    console.log("RESPOSTALOGIN: ", resposta)
                    router.push("/dashboard");
                  }) 
                }}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>


      </div>
    </>
    
  )
}
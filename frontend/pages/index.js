import { LockClosedIcon } from '@heroicons/react/solid';
import Head from 'next/head';
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { authService } from "../src/auth/authService";
import { tokenService } from "../src/auth/tokenService";

export default function Home() {
  const router = useRouter();
  const token = tokenService.getAccessToken(null)

  if(token){
    router.push("/dashboard")
  }

  const [values, setValues] = useState({
    email: "thomas.henrique.schmitz@gmail.com",
    senha: "thomas05"
  })

  const [valuesCriar, setValuesCriar] = useState({
    nome: "",
    email: "",
    senha: "",
  })

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue
      }
    })
  }

  function handleChangeCriar(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    console.log(fieldValue, fieldName)

    setValuesCriar((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue
      }
    })
  }

  function handleCriar() {
    document.getElementById("criar").style.display = "block";
    document.getElementById("login").style.display = "none";

  }

  function handleLogin() {
    document.getElementById("criar").style.display = "none";
    document.getElementById("login").style.display = "block";
  }

  return (
    <>
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
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={async (event)=> {
            event.preventDefault();
            
            authService.login({
              email:values.email,
              senha:values.senha
            }).then((resposta) => {
              console.log("RESPOSTALOGIN: ", resposta)
              router.push("/dashboard");
            }) 
          }}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  value={values.email}
                  required
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={values.senha}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button onClick={() => handleCriar()}><a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Don't you have an account?
                </a></button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

          <div id="criar" style={{display:"none"}} className="-inset-y-1/4max-w-sm w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={async (event)=> {
              event.preventDefault();

              authService.criar({
                nome: valuesCriar.nome,
                email: valuesCriar.email,
                senha: valuesCriar.senha
              }).then(async (resposta) => {
                console.log("RespostaIndex: ", resposta)
                await authService.login({
                  email:valuesCriar.email,
                  senha:valuesCriar.senha
                })
                window.location.reload();
              }) 
            }}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="nome-address" className="sr-only">
                    Name
                  </label>
                  <input
                    id="nome-address"
                    name="nome"
                    type="nome"
                    value={valuesCriar.nome}
                    required
                    onChange={handleChangeCriar}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    value={valuesCriar.email}
                    required
                    onChange={handleChangeCriar}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="senha" className="sr-only">
                    Senha
                  </label>
                  <input
                    id="senha"
                    name="senha"
                    type="senha"
                    required
                    value={valuesCriar.senha}
                    onChange={handleChangeCriar}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="senha"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember_me"
                    name="remember_me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <button onClick={() => handleLogin()}><a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Back to login
                  </a></button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
    
  )
}
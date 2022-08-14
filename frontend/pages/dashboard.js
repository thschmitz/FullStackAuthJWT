import { Popover, Transition } from '@headlessui/react';
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon
} from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Link from "next/link";
import React, { Fragment, useState } from 'react';
import { withSession } from "../src/auth/session";
import { tokenService } from '../src/auth/tokenService';


export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx,
    }
  }
})

const Dashboard = (props) => {

    const usuario = props.session.usuarioInfo;
  
  
    function handleLogout(e) {
      e.preventDefault();
      try{
        tokenService.deleteAccessToken(props.ctx)
        tokenService.deleteRefreshToken(props.ctx)
        window.location.reload()
  
      } catch(erro){
        console.log(erro)
      }
    }

    return (
      <div className="mt-10 flex flex-col items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold text-center">
            Welcome to the Dashboard
          </h1>
          <h1 className="text-3xl font-bold text-center">
            {usuario.nome}
          </h1>
        </div>
        <div className="mt-20 max-w-lg w-full cursor-pointer flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <Link href="/posts">
            <h2>See All the Posts</h2>
          </Link>
        </div>
        <div className="mt-20 max-w-lg w-full cursor-pointer flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <Link href="/createPost">
            <h2>Make a new post</h2>
          </Link>
        </div>
        <button onClick={(e) => handleLogout(e)} className="mt-20 max-w-lg w-full cursor-pointer flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          <h2>Logout</h2>
        </button>
        
      </div>
    )
}

export default Dashboard
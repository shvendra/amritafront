"use client"
import Link from 'next/link'
import { apiConstants } from "../../apiConstrants";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { exit } from 'process';

export default function SignUp() {
  
const [fullname, setFullName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [password2, setPasswordsecond] = useState('');
  const register = (event:any) => {
    event.preventDefault();
    if(event.target.password.value != event.target.password2.value) {
      toast.error('Confirm password not correct', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        exit();
    }
    var position = event.target.email.value.search('amrita.edu');
    if(position == -1) {
      toast.error('Email is not valid for the registration', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
        exit();
    }
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "name": event.target.fullname.value,
      "email": event.target.email.value,
      "password": event.target.password.value
    });
    

    fetch(apiConstants.REGISTER_API_URL, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.text())
      .then(result => 
        {
          if(JSON.parse(result).message) 
          {
            toast.error(JSON.parse(result).message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
          } else {
            toast.success('Registration success', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })
          }
        }
       
        )
      .catch(error => console.log('error', error));
  }

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <ToastContainer />

          {/* Page header */}
          {/* <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">we can add some text here for sign up page</h1>
          </div> */}

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <div className="flex items-center my-6">
              <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-400">Register with your email</div>
              <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
            </div>

            <form onSubmit={register}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="full-name">Full Name <span className="text-red-600">*</span></label>
                  <input name="fullname" value={fullname} onChange={e => setFullName(e.target.value)} id="full-name" type="text" className="form-input w-full text-gray-300" placeholder="First and last name" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">College Email <span className="text-red-600">*</span></label>
                  <input name="email" value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                  <input name="password" value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password2">Confirm Password <span className="text-red-600">*</span></label>
                  <input name='password2' value={password2} onChange={e => setPasswordsecond(e.target.value)} id="password2" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button  className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign up</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Already have account? <Link href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

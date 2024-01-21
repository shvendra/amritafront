"use client"
import Link from 'next/link'
import { apiConstants } from "../../apiConstrants";
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react";
import { useRouter } from 'next/navigation'

import OtpInput from 'react-otp-input';
const otpStyle = {
  display: 'none',

};
export default function SignIn() {
  const router = useRouter();
  var otpfield = document.getElementById('otpfield');
  var uname = document.getElementById('uname');
  var pwd = document.getElementById('password');
var buttontext = document.getElementById('save');

const [email, setEmail] = useState('');
const [serotp, setSerotp] = useState('');
const [uotp, setuotp] = useState('');
const [name, setName] = useState('');
const [token, setToken] = useState('');


const [password, setPassword] = useState('');

  const login = async(event:any) => {
    event.preventDefault();
    if(serotp =='') { 
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "email": event.target.email.value,
        "password": event.target.password.value
      });
      fetch(apiConstants.LOGIN_API_URL, {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      })
        .then(response => response.text())
        .then(result => {
          if (JSON.parse(result).message === 'Success') {
            setSerotp(JSON.parse(result).otp);
            setToken(JSON.parse(result).token);
            setEmail(JSON.parse(result).email);
            setName(JSON.parse(result).name);
            buttontext.innerHTML = 'Verify';
            otpfield.style.display = 'block';          // Show
            uname.style.display = 'none';          // hide
            pwd.style.display = 'none';          // hide
  
  
        } else {
          console.log(JSON.parse(result).message);
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
        }
      }
      )
        .catch(error => console.log('error', error));
    } else {
      console.log(uotp +'---'+serotp)
      if (uotp == serotp) {
         await localStorage.setItem('utype', 'test');
         await localStorage.setItem('uemail', email);
         await localStorage.setItem('name', name);
         await localStorage.setItem('token', token);

         toast.success('OTP is correct', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
          router.push('/profile')

      } else {
        setuotp('')
        toast.error('OTP is not correct', {
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
   
  }
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        <ToastContainer />

          {/* Page header */}
          {/* <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">We can add some text here for sign in page</h1>
          </div> */}

          {/* Form */}
          <div className="max-w-sm mx-auto">
          
            <div className="flex items-center my-6">
              <div className="border-t border-gray-700 border-dotted grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-400">Sign in with your email</div>
              <div className="border-t border-gray-700 border-dotted grow ml-3" aria-hidden="true"></div>
            </div>
            <form onSubmit={login}>
              <div id="uname" className="flex flex-wrap -mx-3 mb-4 uname">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input onChange={e => setEmail(e.target.value)} name='email' id="email" type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required />
                </div>
              </div>
              <div id="password" className="flex flex-wrap -mx-3 mb-4 password">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input onChange={e => setPassword(e.target.value)} name='password' id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                </div>
              </div>
              <div id={'otpfield'} style={otpStyle} className="center flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Enter OTP you received in email</label>
              
                  <OtpInput 
                  inputStyle={'otp'}
                  containerStyle={'otp'}
                  value={uotp}
      onChange={setuotp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />  </div>
              </div>
             
              {/* <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-400 ml-2">Keep me signed in</span>
                    </label>
                    <Link href="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                  </div>
                </div>
              </div> */}
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button id="save" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign in</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Don’t you have an account? <Link href="/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

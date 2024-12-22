'use client';

import { useState } from 'react';
import supabase from '../lib/supabaseClient';
import { redirect } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);



  const handleLogin = async () => {
  setLoading(true);

  // Authenticate the user
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    if (error.message.includes("Invalid Refresh Token")) {
      alert("Session expired. Please log in again.");
      sessionStorage.clear();
    } else {
      alert("Unauthorized Access");
    }
  } else {
    alert("Login Successfully");
    sessionStorage.setItem("user", JSON.stringify(data.user));
    redirect('/homepage');
  }
};

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img className="w-8 h-8 mr-2" src="logo.png" alt="logo"></img>
            Bloggie
        </a>
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                <input type="email" name="email"  className=" border  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required="" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                <input type="password" name="password"  placeholder="••••••••" className=" border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              </div>
              <div className="flex items-center justify-between">
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline text-primary-500">Forgot password?</a>
              </div>
              <button className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-800'} rounded-md py-3 font-semibold text-white`} onClick={handleLogin} disabled={loading}>
                {loading ? 'Loading...' : 'Sign in'}
              </button>
              <p className="text-sm font-light text-gray-400">
                Don't have an account yet? <a href='/signup' className="font-medium text-primary-600 hover:underline text-primary-500 cursor-pointer" >Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


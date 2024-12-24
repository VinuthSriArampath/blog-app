"use client";

import { useState } from "react";
import supabase from "@/lib/supabaseClient";

export default function signUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [birthday, setBirthday] = useState("");
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  async function signUpNewUser() {
    setLoading(true);
    if (password == cPassword) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: password,
        options: {
          data: {
            first_name: fName,
            last_name: lName,
            age:age,
            phone:mobile,
            birthday:birthday,
            address:address,
          },
        },
      });
      if (error) {
        console.log(error.message);
        
        alert("Something went wrong");
        setLoading(false);
      } else {
        console.log(data);
        alert("Successfully Registered! Verify your Email Address");
        setLoading(false);
      }
    } else {
      alert("Password Mismatch!");
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></img>
          Bloggie
        </a>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-lg xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">Create an account</h1>
                <div className="space-y-4 md:space-y-6">
                    <h3 className="font-bold leading-tight tracking-tight text-white">Personal Details</h3>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-white">First Name</label>
                                <input type="text" name="first-name" id="first-name" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out" onChange={(e) => setFirstName(e.target.value)} required=""></input>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-white">Last Name</label>
                                <input type="text" name="last-name" id="last-name" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out" onChange={(e) => setLastName(e.target.value)} required=""></input>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                            <div>
                                <label htmlFor="age" className="block mb-2 text-sm font-medium text-white">Age</label>
                                <input type="number" name="age" id="age" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out" onChange={(e) => setAge(e.target.value)} required=""></input>
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-white">Mobile No</label>
                                <input type="tel" name="mobile" id="mobile" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out" onChange={(e) => setMobile(e.target.value)} required=""></input>
                            </div>
                            <div>
                                <label htmlFor="birthday" className="block mb-2 text-sm font-medium text-white">Birthday</label>
                                <input type="date" name="birthday" id="birthday" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out" onChange={(e) => setBirthday(e.target.value)} required=""></input>
                            </div>
                        </div>
                        
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-white">Address</label>
                        <input type="text" name="address" id="address" className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out" onChange={(e) => setAddress(e.target.value)} required=""></input>
                    </div>
                    <h3 className="font-bold leading-tight tracking-tight text-white">Login Details</h3>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                        <input type="email" name="email" id="email" className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" onChange={(e) => setEmail(e.target.value)} required="" ></input>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required=""></input>
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-white">Confirm password</label>
                        <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" onChange={(e) => setCPassword(e.target.value)} className=" border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required=""></input>
                    </div>
                    <button className={`w-full ${ loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-800"} rounded-md py-3 font-semibold text-white`}onClick={signUpNewUser}disabled={loading}>{loading ? "Loading..." : "Create an account"}</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account?{" "}<a href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer" >Login here</a></p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

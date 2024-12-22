"use client"; // Ensure this is at the top

import { useState, useEffect } from 'react';
import supabase  from '@/lib/supabaseClient';

export default function NavBar({ onPostCreated }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    const createPost = async () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        console.log(user.id);
        
      const { error } = await supabase.from('post').insert([
        { title,content, is_premium: false, created_by: user.id },
      ]);
  
      if (error) {
        console.error(error);
      } else {
        alert('Post created!');
        setModalOpen(false)
        setTitle('');
        setContent('');
        onPostCreated();
      }
    };
    const handleLogOut = () => {
        localStorage.clear()
        window.location.href = '/';
    }
    
    return (
        <header className="antialiased sticky top-0">
            <nav className="px-4 lg:px-6 py-2.5 bg-gray-800">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <a href="/" className="flex mr-4">
                            <img src="logo.png" className="mr-3 h-8" alt="FlowBite Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Bloggie</span>
                        </a>
                    </div>
                    <div className="flex items-center lg:order-2">
                        <button onClick={() => setModalOpen(true)} className="hidden sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                            <svg aria-hidden="true" className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                            </svg> Create Blog
                        </button>
                        <div className={`fixed z-10 inset-0 overflow-y-auto ${modalOpen ? '' : 'hidden'}`}>
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                                <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl p-5 transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
                                    <div className='flex justify-center p-4'>
                                        <h1 className='text-xl font-bold '>Create Your Blog</h1>              
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="title" className="block text-sm text-white font-bold">Title</label>
                                        <input type="text" name="title" id="title" className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring-indigo-500 sm:text-sm text-gray-200 bg-gray-700" required onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="content" className="block text-sm text-white font-bold">Content</label>
                                        <textarea id="content" name="content" rows={20} className="mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring-indigo-500 sm:text-sm text-gray-200 bg-gray-700" required onChange={(e) => setContent(e.target.value)}></textarea>
                                    </div>
                                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-white shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={createPost}>
                                            Create
                                        </button>
                                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:mr-3 sm:w-auto sm:text-sm" onClick={() => setModalOpen(false)}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleLogOut}>
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
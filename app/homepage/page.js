'use client'

import { useState, useEffect } from 'react';
import supabase from '../../lib/supabaseClient';
import NavBar from '../navbar';
import Modal from '../components/Modal';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostTitle, setSelectedPostTitle] = useState('');
  const [selectedPostContent, setSelectedPostContent] = useState('');

  const fetchPosts = async () => {
    const { data, error } = await supabase.from('post').select('*');
    if (error) {
      console.error('Error fetching posts:', error.message);
      return;
    }
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const openModal = (title,content) => {
    setSelectedPostTitle(title);
    setSelectedPostContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPostContent('');
  };

  return (
    <>
      <NavBar onPostCreated={fetchPosts} />
      <section className="bg-gray-900 h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-white">Our Blog</h2>
              <p className="font-light sm:text-xl text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
          </div> 
          <div className="grid gap-8 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="p-6 rounded-lg border shadow-md bg-gray-800 border-gray-700 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-5 text-gray-500">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                            {post.category}
                        </span>
                        <span className="text-sm">{post.created_at}</span>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-white">{post.title}</h2>
                    <pre className="mb-5 font-light text-gray-400 overflow-hidden overflow-ellipsis line-clamp-3">{post.content}</pre>
                    <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center space-x-4">
                            <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt={`avatar`} />
                            <span className="font-medium text-white">
                                writer
                            </span>
                        </div>
                        <button onClick={() => openModal(post.title,post.content)} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                            Read more
                            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                </article>
              ))}
          </div>  
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedPostTitle} content={selectedPostContent} />
    </>
  );
}

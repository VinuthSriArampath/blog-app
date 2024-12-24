'use client'

import { useState, useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import NavBar from '../navbar';
import Modal from '../components/Modal';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('post').select('*');
      if (!error) setPosts(data);
    };
    fetchPosts();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <NavBar onPostCreated={() => fetchPosts()} />
      <main className="bg-gray-900 min-h-screen">
        <section className="py-8 px-4">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">Our Blog</h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-lg p-6 shadow-lg flex flex-col justify-between" >
                <h2 className="text-white text-xl font-bold mb-4">{post.title}</h2>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.content}</p>
                <div className='flex justify-between'>
                <button onClick={() => openModal(post)} className="text-primary-600 hover:underline" > Read More </button>
                <button onClick={() => openModal(post)} className="text-primary-600 hover:underline" > Read More </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedPost.title}
          content={selectedPost.content}
        />
      </main>
    </>
  );
}

'use client'; 

import { useState } from 'react';
import supabase from '@/lib/supabaseClient';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const { error } = await supabase.from('post').insert([
      { title,content, is_premium: false },
    ]);

    if (error) {
      console.error(error);
    } else {
      alert('Post created!');
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

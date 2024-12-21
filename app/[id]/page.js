'use client'; 

import supabase from '../../../lib/supabaseClient';

export default async function Post({ params }) {
  const { id } = params; // Retrieve the dynamic `id` from the URL

  // Fetch the post data using Supabase
  const { data: post, error } = await supabase
    .from('post')
    .select('*')
    .eq('id', id)  // Use the `id` parameter to query the specific post
    .single();

  if (error) {  
    return <p>Error loading post: {error.message}</p>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

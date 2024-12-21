import supabase from '../../lib/supabaseClient';

export default async function Dashboard() {
  const { data: posts, error } = await supabase
    .from('post')
    .select('*');

  if (error) {
    console.error('Error fetching posts:', error.message);
    return <p>Error loading posts</p>;
  }

  return (
    <div className='container mx-auto'>
      <h1 className='underline font-bold '>Blog Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h2 className='underline font-bold mt-10'>{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
}

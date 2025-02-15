'use client'
import { useState } from 'react'

interface Post {
  id: number
  user: string
  recipeName: string
  description: string
  likes: number
  comments: number
  imageUrl: string
  isFollowing: boolean
}

const FeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: 'Alice',
      recipeName: 'Avocado Toast',
      description: 'A simple yet delicious breakfast with avocado on toast.',
      likes: 10,
      comments: 3,
      imageUrl: 'https://i.pinimg.com/originals/a8/04/93/a804932d08e03b9e84d1e163167d5e65.jpg',
      isFollowing: false,
    },
    {
      id: 2,
      user: 'Bob',
      recipeName: 'Katsu Curry',
      description: 'Made this in 5 minutes 😝',
      likes: 5,
      comments: 2,
      imageUrl: 'https://woonheng.com/wp-content/uploads/2021/03/Tofu-Katsu-Japanese-Curry-1638x2048.jpg',
      isFollowing: false,
    },
  ])

  const handleLike = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    )
  }

  const handleFollow = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, isFollowing: !post.isFollowing } : post
      )
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="grid grid-cols-1 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="font-semibold text-xl">{post.user}</div>
              <button
                onClick={() => handleFollow(post.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full ${
                  post.isFollowing
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {post.isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
            <h2 className="text-2xl font-semibold mt-4">{post.recipeName}</h2>
            <p className="text-gray-700 mt-2">{post.description}</p>
            <div className="mt-4">
              <img
                src={post.imageUrl}
                alt={post.recipeName}
                className="rounded-lg w-full h-[800px] object-cover mt-2"
              />
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center space-x-2 text-lg text-red-500 hover:text-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11.049 5.998a5.93 5.93 0 00-2.074.564c-.626-.8-1.738-1.338-2.975-1.338C4.37 5.224 2 7.548 2 10.202c0 1.992.798 3.876 2.114 5.022 1.57 1.418 3.673 2.135 5.438 2.14 2.235 0 4.524-.801 6.182-2.26 1.366-1.111 2.332-2.567 2.621-4.064-.988.438-2.038.693-3.142.69-.748 0-1.467-.178-2.127-.523l-.459-.242c-1.244-.649-2.055-1.84-2.055-3.126 0-.619.188-1.22.51-1.718.504-1.28 1.262-2.169 2.115-2.701 1.736-1.002 3.81-.687 5.192.91 1.032.94 1.555 2.158 1.577 3.426.067 1.208-.278 2.384-.994 3.339-.51.706-1.161 1.284-1.91 1.774-.064-.106-.132-.214-.2-.318-.853-1.271-1.675-2.645-2.423-4.053-.184-.31-.413-.579-.644-.86-.145-.214-.31-.417-.47-.626-.073.207-.153.417-.235.629l-.13-.264a7.018 7.018 0 01-1.672-3.78z"
                  />
                </svg>
                <span>{post.likes} Likes</span>
              </button>
              <div className="text-sm text-gray-500">{post.comments} Comments</div>
            </div>
            <div className="mt-4">
              <button className="text-blue-500">Comment</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeedPage;
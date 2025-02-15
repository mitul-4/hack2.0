"use client";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaPaperPlane } from "react-icons/fa";

interface Post {
  id: number;
  user: string;
  recipeName: string;
  description: string;
  likes: number;
  comments: string[];
  imageUrl: string;
  isFollowing: boolean;
  newComment: string;
}

const FeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: "Alice",
      recipeName: "Avocado Toast",
      description: "A simple yet delicious breakfast with avocado on toast.",
      likes: 10,
      comments: ["Looks yummy!", "I need to try this!"],
      imageUrl:
        "https://i.pinimg.com/originals/a8/04/93/a804932d08e03b9e84d1e163167d5e65.jpg",
      isFollowing: false,
      newComment: "",
    },
    {
      id: 2,
      user: "Bob",
      recipeName: "Katsu Curry",
      description: "Made this in 5 minutes 😝",
      likes: 5,
      comments: ["So fast??", "That looks amazing!"],
      imageUrl:
        "https://woonheng.com/wp-content/uploads/2021/03/Tofu-Katsu-Japanese-Curry-1638x2048.jpg",
      isFollowing: false,
      newComment: "",
    },
  ]);

  const handleLike = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleFollow = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, isFollowing: !post.isFollowing } : post
      )
    );
  };

  const handleCommentChange = (id: number, text: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, newComment: text } : post
      )
    );
  };

  const handleSendComment = (id: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id && post.newComment.trim()
          ? { ...post, comments: [...post.comments, post.newComment], newComment: "" }
          : post
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 max-w-lg mx-auto"
          >
            {/* User + Follow Button */}
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg">{post.user}</div>
              <button
                onClick={() => handleFollow(post.id)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition duration-200 ${
                  post.isFollowing
                    ? "bg-gray-300 text-gray-700"
                    : "bg-[#00a36c] text-white hover:bg-[#007f4c]"
                }`}
              >
                {post.isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            {/* Recipe Details */}
            <h2 className="text-xl font-semibold mt-2">{post.recipeName}</h2>
            <p className="text-gray-700 text-sm mt-1">{post.description}</p>

            {/* Image */}
            <div className="mt-4">
              <img
                src={post.imageUrl}
                alt={post.recipeName}
                className="rounded-lg w-full h-30 object-cover mt-2"
              />
            </div>

            {/* Like & Comment Buttons */}
            <div className="mt-4 flex items-center space-x-4 text-sm">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center space-x-2 text-red-500 hover:text-red-700"
              >
                {post.likes > 10 ? (
                  <FaHeart className="text-red-500" size={18} />
                ) : (
                  <FaRegHeart className="text-red-500" size={18} />
                )}
                <span>{post.likes} Likes</span>
              </button>
              <div className="text-gray-500">{post.comments.length} Comments</div>
            </div>

            {/* Comments Section */}
            <div className="mt-2">
              {post.comments.length > 0 && (
                <div className="space-y-1">
                  {post.comments.slice(-3).map((comment, index) => (
                    <div key={index} className="text-gray-700 text-sm">
                      {comment}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div className="mt-4 flex items-center border rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={post.newComment}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                className="w-full outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={() => handleSendComment(post.id)}
                className="text-gray-500 hover:text-gray-700 transition duration-200"
              >
                <FaPaperPlane size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;

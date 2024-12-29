import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import profileImage from "@/assets/profile.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer"; // Adjust the import path for your rootReducer

// TypeScript type definition for a post
interface Post {
  id: string;
  description: string;
  images: string[] | null;
  videos: string[] | null;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profileImage: {
      url: string;
      altText: string;
    } | null;
  };
  _count: {
    favoritedBy: number;
    comments: number;
  };
}

export default function RightSide() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get authenticated user's ID from Redux store
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const currentUserId = currentUser?.id;

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://marianom-backend.vercel.app/api/v1/post");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        const allPosts = data?.data?.meta?.data || [];

        // Filter posts to include authenticated user's posts and other users' posts
        const filteredPosts = allPosts.filter((post: Post) =>
          post.user.id === currentUserId || post.user.id !== currentUserId
        );

        setPosts(filteredPosts);
      } catch (error) {
        setError((error as any).message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUserId]);

  // Helper function to validate image URLs
  const getValidImageURL = (image: string) => {
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }
    return `https://your-backend-server.com/${image}`;
  };

  return (
    <div>
      <main className="flex-1 bg-primary p-5">
        {/* Header Section */}
        <div className="flex justify-between flex-col md:flex-row md:items-center pb-6 mb-6 border-b border-[#796943] gap-5 md:gap-0">
          <div>
            <h1 className="text-2xl font-semibold text-white">Global News Feed</h1>
            <p className="text-white text-sm">Updates from everyone</p>
          </div>
          {/* Search Section */}
          <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="py-2 px-4 rounded-lg border border-[#EAECF04D] bg-transparent text-white w-full md:w-auto focus:outline-none"
            />
            <button className="py-2 px-3 bg-[#FEB80045] rounded-lg text-white">Search</button>
          </div>
        </div>

        {/* Feed Content */}
        {loading ? (
          <p className="text-center text-white">Loading posts...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-white">No posts available</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="text-white border-b border-[#796943] p-4 space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-4 flex-wrap">
                  <Image
                    src={post.user.profileImage?.url || profileImage.src} // Fallback to imported profile image
                    alt={post.user.profileImage?.altText || "Default user profile image"}
                    width={80}
                    height={80}
                    className="rounded-full w-20 h-20"
                  />
                  <div>
                    <p className="font-semibold mb-1 text-[18px] sm:text-[20px]">
                      {post.user.firstName} {post.user.lastName}
                    </p>
                    <p className="text-sm text-gray-400">Posted on {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="mt-2">{post.description || "No description provided."}</p>

                {/* Post Images */}
                {post.images &&
                  post.images.length > 0 &&
                  post.images.map((image, index) => (
                    <Image
                      key={index}
                      src={getValidImageURL(image)}
                      alt={`Post Image ${index + 1}`}
                      width={300}
                      height={100}
                      className="rounded-md w-[300px] h-auto"
                    />
                  ))}

                {/* Post Videos */}
                {post.videos &&
                  post.videos.map((video, index) => (
                    <video
                      key={index}
                      controls
                      className="rounded-md w-[300px] h-auto mt-4"
                    >
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-500">
                    <MdFavoriteBorder /> {post._count.favoritedBy} Favorite
                  </button>
                  <button className="flex items-center gap-2 text-gray-300 hover:text-yellow-500">
                    <FaRegCommentDots /> {post._count.comments} Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

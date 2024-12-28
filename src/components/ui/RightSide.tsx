import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaRegCommentDots, FaPaperPlane } from "react-icons/fa6";
import { MdFavoriteBorder, MdMessage } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Link from "next/link";
import profileImage from "@/assets/profile.png"; // Ensure this path is correct

// Typescript type definition
interface Post {
  id: string;
  description: string;
  images: string[] | null;
  videos: string[] | null;
  createdAt: string;
  updatedAt: string;
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
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState("");

  // Function to fetch posts from the API
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://marianom-backend.vercel.app/api/v1/post"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();

        // Access posts from `data.data.meta.data`
        const posts = data?.data?.meta?.data || [];
        setPosts(posts);

        console.log("Fetched Posts:", posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError((error as any).message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getValidImageURL = (image: string) => {
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }
    return `https://your-backend-server.com/${image}`;
  };

  // Handlers for the comment modal
  const handleCommentClick = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setComment("");
  };
  const handleSendComment = () => {
    console.log("Comment Sent:", comment);
    handleCloseModal();
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
            <button className="py-2 px-3 bg-[#FEB80045] rounded-lg text-white">
              Search
            </button>
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
              <div
                key={post.id}
                className="text-white border-b border-[#796943] p-4 space-y-4"
              >
                {/* User Info */}
                <div className="flex items-center gap-4 flex-wrap">
                  <Image
                    src={post.user.profileImage?.url || profileImage.src} // Fallback to imported profile image
                    alt={
                      post.user.profileImage?.altText || "Default user profile image"
                    }
                    width={80}
                    height={80}
                    className="rounded-full w-20 h-20"
                  />
                  <div>
                    <p className="font-semibold mb-1 text-[18px] sm:text-[20px]">
                      {post.user.firstName} {post.user.lastName}
                    </p>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <FaRegEdit /> Just now
                    </p>
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
                  <button
                    onClick={handleCommentClick}
                    className="flex items-center gap-2 text-gray-300 hover:text-yellow-500"
                  >
                    <FaRegCommentDots /> {post._count.comments} Comment
                  </button>
                  <Link
                    href="/message"
                    className="flex items-center gap-2 text-gray-300 hover:text-yellow-500"
                  >
                    <MdMessage /> Message
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Comment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1F1F1F] rounded-lg shadow-md p-6 w-[90%] max-w-md text-white">
            <h2 className="text-lg font-semibold mb-4">Write a Comment</h2>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Write something about the post..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                onClick={handleSendComment}
                className="p-3 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600"
              >
                <FaPaperPlane size={20} />
              </button>
            </div>
            <button
              onClick={handleCloseModal}
              className="mt-4 text-sm text-gray-400 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

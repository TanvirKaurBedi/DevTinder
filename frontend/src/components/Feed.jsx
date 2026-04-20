import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setFeedPosts } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.feed.posts);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(setFeedPosts(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < posts.length - 1 ? prev + 1 : prev));
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center px-4 overflow-hidden">
        <p className="text-center">No more profiles 😴</p>
      </div>
    );
  }

  const currentUser = posts[currentIndex];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 overflow-hidden">
      <UserCard post={currentUser} onAction={handleNext} />

      <p className="text-sm text-gray-400 mt-4">
        {currentIndex + 1} / {posts.length}
      </p>
    </div>
  );
};
export default Feed;

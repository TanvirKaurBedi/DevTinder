import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFeedPosts } from "../utils/feedSlice";
import BASE_URL from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const posts = useSelector((store) => store.feed.posts);
  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(setFeedPosts(res.data.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="mb-4 flex justify-center">
          <UserCard post={post} />
        </div>
      ))}
    </>
  );
};
export default Feed;

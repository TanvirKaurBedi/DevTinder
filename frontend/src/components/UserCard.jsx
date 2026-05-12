import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeedPosts } from "../utils/feedSlice";
const UserCard = ({ post }) => {
  const dispatch = useDispatch();
  const handlConnection = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeedPosts(id));
      // alert("Connection request sent successfully");
    } catch (err) {
      console.error("Error sending connection request:", err);
      // alert("Failed to send connection request");
    }
  };

  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure>
        <img
          src={post.photoUrl}
          alt={post.name}
          className="w-full h-80 object-contain bg-base-200"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{post.name}</h2>
        {post.age && post.gender && (
          <p>
            {post.age}, {post.gender}
          </p>
        )}
        <p>{post.about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handlConnection("ignored", post._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handlConnection("interested", post._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;

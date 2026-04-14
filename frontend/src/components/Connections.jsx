import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.length === 0) {
    return <div>No connections found.</div>;
  }
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Connections</h2>
      </div>
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="flex mb-4 p-4 border rounded gap-4"
        >
          <img
            src={connection.photoUrl}
            alt={connection.name}
            width="100"
            height="100"
            className="rounded-full object-cover"
          />
          <div>
            <p>{connection.name}</p>
            {connection.age && connection.gender && (
              <p>
                {connection.age} {connection.gender}
              </p>
            )}
            <p>{connection.about}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Connections;

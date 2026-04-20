import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connections);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConnections = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/user/connections?page=${page}&limit=10`,
        { withCredentials: true },
      );

      const newData = res.data.data;

      // stop when no more data
      if (newData.length < 10) {
        setHasMore(false);
      }

      dispatch(addConnections(newData));
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Error fetching connections:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections(); // initial load
  }, []);

  if (connections.length === 0 && !hasMore) {
    return <div className="text-center mt-10">No connections found.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Connections</h2>

      <InfiniteScroll
        dataLength={connections.length}
        next={fetchConnections}
        hasMore={hasMore}
        loader={<p className="text-center">Loading...</p>}
        endMessage={
          <p className="text-center text-gray-400">
            🎉 You have seen all connections
          </p>
        }
      >
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="flex mb-4 p-4 border rounded gap-4"
          >
            <img
              src={connection.photoUrl}
              alt={connection.name}
              className="w-16 h-16 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold">{connection.name}</p>

              {connection.age && connection.gender && (
                <p className="text-sm text-gray-400">
                  {connection.age}, {connection.gender}
                </p>
              )}

              <p className="text-sm">{connection.about}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Connections;

import { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const ConnectionRequests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  const handleRequest = async (requestId, action) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${action}/${requestId}`,
        {},
        { withCredentials: true },
      );

      // 🔥 Remove request from UI after action
      const updatedRequests = requests.filter((req) => req._id !== requestId);
      dispatch(addRequests(updatedRequests));
    } catch (err) {
      console.error(`Error ${action} request:`, err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0) {
    return <div className="text-center mt-10">No requests found.</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Requests</h2>

      {requests.map((request) => (
        <div
          key={request._id}
          className="flex mb-4 p-4 border rounded gap-4 items-center justify-between"
        >
          {/* LEFT SIDE */}
          <div className="flex gap-4 items-center">
            <img
              src={request.fromUserId.photoUrl}
              alt={request.fromUserId.name}
              className="w-20 h-20 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold">{request.fromUserId.name}</p>

              {request.fromUserId.age && request.fromUserId.gender && (
                <p className="text-sm text-gray-500">
                  {request.fromUserId.age} {request.fromUserId.gender}
                </p>
              )}

              <p className="text-sm">{request.fromUserId.about}</p>
            </div>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex gap-2">
            <button
              className="btn btn-success btn-sm"
              onClick={() => handleRequest(request._id, "accepted")}
            >
              Accept
            </button>

            <button
              className="btn btn-error btn-sm"
              onClick={() => handleRequest(request._id, "rejected")}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConnectionRequests;

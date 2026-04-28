import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import socket from "../utils/socket";
import BASE_URL from "../utils/constants";

const normalizeId = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value._id) return value._id;
  return String(value);
};

const normalizeMessage = (raw) => {
  const fromUserId = normalizeId(raw?.fromUserId || raw?.senderId);
  const toUserId = normalizeId(raw?.toUserId || raw?.receiverId);

  return {
    ...raw,
    fromUserId,
    toUserId,
  };
};

const Chat = () => {
  const user = useSelector((store) => store.user);
  const [connections, setConnections] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [threads, setThreads] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const activeThread = useMemo(() => {
    if (!selectedUser?._id) return [];
    return threads[selectedUser._id] || [];
  }, [selectedUser, threads]);

  const fetchConnections = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${BASE_URL}/user/connections?page=1&limit=50`,
        {
          withCredentials: true,
        },
      );

      const unique = [];
      const seen = new Set();
      (res.data.data || []).forEach((person) => {
        const id = person?._id;
        if (!id || seen.has(id)) return;
        seen.add(id);
        unique.push(person);
      });

      setConnections(unique);
      if (unique.length > 0) {
        setSelectedUser(unique[0]);
      }
    } catch (err) {
      console.error("Error fetching chat connections:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (!user?._id) return;
    socket.emit("join", user._id);
  }, [user]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!selectedUser?._id) return;

      try {
        const res = await axios.get(`${BASE_URL}/history/${selectedUser._id}`, {
          withCredentials: true,
        });

        const messages = (res.data || []).map(normalizeMessage);
        setThreads((prev) => ({
          ...prev,
          [selectedUser._id]: messages,
        }));
      } catch (err) {
        console.error("Error fetching chat history:", err);
      }
    };

    fetchHistory();
  }, [selectedUser?._id]);

  useEffect(() => {
    const onReceiveMessage = (rawData) => {
      const data = normalizeMessage(rawData);
      const senderId = data?.fromUserId;
      const receiverId = data?.toUserId;
      const currentUserId = normalizeId(user?._id);
      if (!senderId || !receiverId || !currentUserId) return;

      const otherUserId = senderId === currentUserId ? receiverId : senderId;

      setThreads((prev) => ({
        ...prev,
        [otherUserId]: [...(prev[otherUserId] || []), data],
      }));

      if (!selectedUser) {
        const fromList = connections.find((c) => c._id === otherUserId);
        if (fromList) setSelectedUser(fromList);
      }
    };

    socket.on("receiveMessage", onReceiveMessage);

    return () => socket.off("receiveMessage", onReceiveMessage);
  }, [connections, selectedUser, user?._id]);

  const handleSend = () => {
    if (!message.trim() || !selectedUser?._id || !user?._id) return;

    const msgData = {
      fromUserId: user._id,
      toUserId: selectedUser._id,
      message: message.trim(),
    };

    socket.emit("sendMessage", msgData);
    setMessage("");
  };

  if (!user) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        Please login to use chat.
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] p-4 overflow-hidden">
      <div className="h-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 rounded-2xl border border-base-300 bg-base-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-base-300 font-semibold">
            Chats
          </div>
          <div className="overflow-y-auto">
            {isLoading && (
              <p className="p-4 text-sm text-base-content/70">
                Loading connections...
              </p>
            )}
            {!isLoading && connections.length === 0 && (
              <p className="p-4 text-sm text-base-content/70">
                No connected users found.
              </p>
            )}
            {connections.map((person) => (
              <button
                key={person._id}
                onClick={() => setSelectedUser(person)}
                className={`w-full text-left p-3 border-b border-base-300 flex items-center gap-3 hover:bg-base-200 ${selectedUser?._id === person._id ? "bg-base-200" : ""}`}
              >
                <img
                  src={person.photoUrl}
                  alt={person.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-xs text-base-content/60">
                    {person.about || "Connected"}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 rounded-2xl border border-base-300 bg-base-100 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-base-300 flex items-center gap-3">
            {selectedUser ? (
              <>
                <img
                  src={selectedUser.photoUrl}
                  alt={selectedUser.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{selectedUser.name}</p>
                  <p className="text-xs text-base-content/60">Active now</p>
                </div>
              </>
            ) : (
              <p className="font-semibold">
                Select a connection to start chatting
              </p>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeThread.length === 0 && selectedUser && (
              <p className="text-sm text-base-content/60 text-center mt-8">
                Start your conversation with {selectedUser.name}
              </p>
            )}
            {activeThread.map((msg, index) => {
              const mine = msg.fromUserId === user._id;
              return (
                <div
                  key={`${msg.fromUserId}-${msg.message}-${index}`}
                  className={`chat ${mine ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble ${mine ? "chat-bubble-primary" : ""}`}
                  >
                    {msg.message}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 border-t border-base-300">
            <div className="flex gap-2">
              <input
                className="input input-bordered flex-1"
                placeholder={
                  selectedUser
                    ? "Type a message..."
                    : "Pick a user to start chat"
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!selectedUser}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
              <button
                onClick={handleSend}
                className="btn btn-primary"
                disabled={!selectedUser || !message.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

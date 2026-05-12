import { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = () => {
  const user_res = useSelector((store) => store.user);
  const [name, setName] = useState(user_res?.name || "");
  const [gender, setGender] = useState(user_res?.gender || "");
  const [about, setAbout] = useState(user_res?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user_res?.photoUrl || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState(user_res?.age || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user_res) return;
    setName(user_res?.name || "");
    setGender(user_res?.gender || "");
    setAbout(user_res?.about || "");
    setPhotoUrl(user_res?.photoUrl || "");
    setAge(user_res?.age || "");
  }, [user_res]);

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          name,
          gender,
          about,
          photoUrl,
          age,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      setMessage("Profile updated successfully");
      setError("");
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="h-full min-h-0 box-border bg-base-200 px-4 py-4 overflow-hidden flex items-center justify-center">
      <div className="card h-full max-h-full w-full max-w-md shadow-2xl bg-base-100 overflow-hidden">
        <div className="px-6 pt-6 pb-3 shrink-0">
          <h2 className="text-2xl font-bold text-center">Edit Profile</h2>
        </div>

        <div className="px-6 pb-4 overflow-y-auto flex-1 space-y-4">
          {/* Name */}
          <div className="form-control w-full gap-1">
            <label className="label justify-start py-0">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full gap-1">
            <label className="label justify-start py-0">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Gender */}
          <div className="form-control w-full gap-1">
            <label className="label justify-start py-0">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* About */}
          <div className="form-control w-full gap-1">
            <label className="label justify-start py-0">
              <span className="label-text">About</span>
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Photo URL */}
          <div className="form-control w-full gap-1">
            <label className="label justify-start py-0">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Success Message */}
          {message && (
            <p className="text-green-500 text-sm mt-3 text-center">{message}</p>
          )}

          {/* Error Message */}
          {error && (
            <p className="text-error text-sm mt-3 text-center">{error}</p>
          )}

          <div className="h-2" />
        </div>

        <div className="px-6 py-4 border-t border-base-300 bg-base-100 shrink-0">
          <button className="btn btn-primary w-full" onClick={handleUpdate}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

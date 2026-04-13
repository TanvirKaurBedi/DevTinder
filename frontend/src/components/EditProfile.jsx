import { useState } from "react";
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
      console.log("RES", res);
      dispatch(addUser(res.data.data));
      setMessage("Profile updated successfully");
      setError("");
    } catch (err) {
      console.log("EKSSSS", err.response.data.message);
      setMessage("");
      setError(err.response?.data?.message || "Failed to update profile");
      return res.status(500).json({
        message: err.message || "Server error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>

          {/* Name */}
          <div className="form-control">
            <label className="label w-[100px]">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered"
            />
          </div>

          <div className="form-control">
            <label className="label w-[100px]">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered"
            />
          </div>

          {/* Gender */}
          <div className="form-control mt-3">
            <label className="label w-[100px]">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered"
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
          <div className="form-control mt-3">
            <label className="label w-[100px]">
              <span className="label-text">About</span>
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered"
            />
          </div>

          {/* Photo URL */}
          <div className="form-control mt-3">
            <label className="label w-[100px]">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="input input-bordered"
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

          {/* Button */}
          <div className="form-control mt-5">
            <button className="btn btn-primary w-full" onClick={handleUpdate}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

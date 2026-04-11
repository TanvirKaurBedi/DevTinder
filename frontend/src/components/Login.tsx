import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("rashmipreet@gmail.com");
  const [password, setPassword] = useState("123");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          {/* Email */}
          <div className="form-control ">
            <label className="label min-w-[100px]">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered"
            />
          </div>

          {/* Password */}
          <div className="form-control mt-3">
            <label className="label min-w-[100px]">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right mt-2">
            <a className="link link-primary text-sm">Forgot password?</a>
          </div>

          {/* Button */}
          <div className="form-control mt-5">
            <button className="btn btn-primary w-full" onClick={handleLogin}>
              Login
            </button>
          </div>

          {/* Signup */}
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <span className="link link-primary cursor-pointer">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

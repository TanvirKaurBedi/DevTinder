import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";

export default function Body() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthPage = location.pathname === "/login";
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <div className="h-dvh flex flex-col overflow-hidden">
      {!isAuthPage && <Navbar />}
      <main className="flex-1 min-h-0 overflow-hidden">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed.jsx";
import Profile from "./components/Profile.jsx";
import Connections from "./components/Connections.jsx";
import ConnectionRequests from "./components/ConnectionRequests.jsx";
import Chat from "./components/Chat.jsx";
function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Body />
                </div>
              }
            >
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/requests" element={<ConnectionRequests />} />
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

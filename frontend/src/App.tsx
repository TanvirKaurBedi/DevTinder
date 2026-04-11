import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";

function App() {
  return (
    <>
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
            <Route path="" element={<div></div>} />
            <Route path="" element={<div></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

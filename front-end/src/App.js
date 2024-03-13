import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { useState } from "react";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const isAuthenticated = () => {
  //   return isLoggedIn;
  // };

  // const Protected = ({ isLoggedIn, children }) => {
  //   if (!isLoggedIn) {
  //     return <Navigate to="/" replace />;
  //   }
  //   return children;
  // };
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPass" element={<ForgetPassword />} />
        <Route path="/posts" element={<Posts />} />
        {/* <Route
          path="/posts"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <Posts />
            </Protected>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;

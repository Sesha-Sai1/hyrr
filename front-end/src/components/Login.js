import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailDirty(true);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordDirty(true);
  };
  const handleCheckpass = () => {
    setShowPassword(!showPassword);
  };
  // const getData = () => {
  //   axios
  //     .get("http://localhost:9988/Register/getAllRegisters")
  //     .then((result) => {
  //       setData(result.data);
  //       console.log(result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err, "Error while getting the Registers");
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);
  const handleDashboard = async () => {
    setEmailDirty(true);
    setPasswordDirty(true);

    try {
      const response = await fetch(
        "https://hyrr.onrender.com/Register/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        alert("Invalid Credentials");

        throw new Error("Invalid credentials");
      } else {
        const data = await response.json();
        const { token } = data;

        localStorage.setItem("token", token);
        navigate("/posts");
      }
    } catch (error) {
      alert("Error While login");
      console.log(error);
    }
  };
  return (
    <div className="main-container">
      <div className="container1">
        <h3>
          <i class="fa-solid fa-arrow-left"></i>Login Page
          <i class="fa-solid fa-arrow-right"></i>
        </h3>
        <label className="lb">Email*</label>

        <input
          type="email"
          placeholder="Enter your Email Address"
          value={email}
          onChange={(e) => {
            handleEmail(e);
          }}
        />
        {emailDirty && !email.length && (
          <span className="validation">Email is Required</span>
        )}
        {!email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) &&
          email.length > 0 && (
            <span className="validation">Enter a valid Email</span>
          )}
        <label className="lb">Password*</label>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => {
            handlePassword(e);
          }}
        />
        {password.length > 0 && (
          <span className="rb">
            <input
              type="checkbox"
              onClick={handleCheckpass}
              value={showPassword}
            />
            Show Password
          </span>
        )}
        {passwordDirty && !password.length && (
          <span className="validation">Password is Required</span>
        )}
        {password.length !== 8 && password.length > 0 && (
          <span className="validation">
            Your Password should contain only 8 digits
          </span>
        )}
        {!password.match(/\d/) && passwordDirty && password.length !== 0 && (
          <span className="validation">
            Your password should contain atleast one number
          </span>
        )}
        {!password.match(/[A-Z]/) && passwordDirty && password.length !== 0 && (
          <span className="validation">
            Your Password should contain atleast one Capital letter
          </span>
        )}
        {!password.match(/[-+_!@#$%^&*.,() ?]/) &&
          passwordDirty &&
          password.length !== 0 && (
            <span className="validation">
              Your Password should contain atleast one special character
            </span>
          )}
        <button onClick={handleDashboard} className="btn">
          Submit
        </button>
        <p
          onClick={() => {
            navigate("/");
          }}
          className="link"
        >
          Don't have an account <b>signUp here..!</b>
        </p>
        <p
          onClick={() => {
            navigate("/forgetPass");
          }}
          className="link"
        >
          <b>Forget Password..?</b>
        </p>
      </div>
    </div>
  );
};

export default Login;

// const foundUser = data.find((register) => register.email === email);
// if (foundUser) {
//   alert("Your login is successful");
//   setEmail("");
//   setPassword("");
//   navigate("/posts");
// } else {
//   alert("Invalid email or password");
//   setEmail("");
//   setPassword("");
// }

import React, { useState } from "react";
import "../css/index.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [name, setName] = useState("");
  const [check, setCheck] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [password2Dirty, setPassword2Dirty] = useState(false);
  const [nameDirty, setnameDirty] = useState(false);
  const navigate = useNavigate();

  const handlename = (e) => {
    setName(e.target.value);
    setnameDirty(true);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailDirty(true);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordDirty(true);
  };
  const handlePassword2 = (g) => {
    setPassword2(g.target.value);
    setPassword2Dirty(true);
  };
  const handleCheck = () => {
    setCheck(!check);
  };
  const handleCheckpass = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckpass2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleSignUp = () => {
    setEmailDirty(true);
    setnameDirty(true);
    setPasswordDirty(true);
    setPassword2Dirty(true);

    if (
      email.length !== 0 &&
      name.length !== 0 &&
      password.length !== 0 &&
      password2.length !== 0 &&
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      password.length === 8 &&
      password2.length === 8 &&
      password.match(/\d/) &&
      password2.match(/\d/) &&
      password.match(/[A-Z]/) &&
      password2.match(/[A-Z]/) &&
      password.match(/[-+_!@#$%^&*.,() ?]/) &&
      password2.match(/[-+_!@#$%^&*.,() ?]/) &&
      check
    ) {
      axios
        .post("https://hyrr.onrender.com/Register/register", {
          name,
          email,
          password,
        })
        .then((result) => {
          console.log(result);
          setEmail("");
          setName("");
          setPassword("");
          setPassword2("");
          alert("Successfully Registered");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data === "Email already exists") {
            alert("Email already exists");
          }
        });
    }
  };
  return (
    <div className="main-container">
      <div className="container1">
        <h3>
          <i class="fa-solid fa-arrow-left"></i>SignUp Page
          <i class="fa-solid fa-arrow-right"></i>
        </h3>
        <label className="lb">Name*</label>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            handlename(e);
          }}
        />
        {nameDirty && !name.length && (
          <span className="validation">name is Required</span>
        )}
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
            Your Password should contain a Capital letter
          </span>
        )}
        {!password.match(/[-+_!@#$%^&*.,() ?]/) &&
          passwordDirty &&
          password.length !== 0 && (
            <span className="validation">
              Your Password should contain a special character
            </span>
          )}
        <label className="lb">Password*</label>

        <input
          type={showPassword2 ? "text" : "password"}
          placeholder="Enter your Confirm Password"
          value={password2}
          onChange={(g) => {
            handlePassword2(g);
          }}
        />
        {password2.length > 0 && (
          <span className="rb">
            <input
              type="checkbox"
              onClick={handleCheckpass2}
              value={showPassword2}
            />
            Show Password
          </span>
        )}
        {password2Dirty && !password2.length && (
          <span className="validation">Password is Required</span>
        )}
        {password2.length !== 8 && password2.length > 0 && (
          <span className="validation">
            Your Confirm Password should contain only 8 digits
          </span>
        )}
        {password !== password2 &&
          password.length > 0 &&
          password2.length > 0 && (
            <span className="validation">
              Your Password are mismatched correct it
            </span>
          )}
        {!password2.match(/\d/) && password2Dirty && password2.length !== 0 && (
          <span className="validation">
            Your password should contain atleast one number
          </span>
        )}
        {!password2.match(/[A-Z]/) &&
          password2Dirty &&
          password2.length !== 0 && (
            <span className="validation">
              Your Password should contain a Capital letter
            </span>
          )}
        {!password2.match(/[-+_!@#$%^&*.,() ?]/) &&
          password2Dirty &&
          password2.length !== 0 && (
            <span className="validation">
              Your Password should contain a special character
            </span>
          )}
        <span>
          <input
            type="checkbox"
            value={check}
            onChange={handleCheck}
            // checked={check ? true : false}
          />
          <a>Terms and Conditions</a>
        </span>
        {!check &&
          email.length > 0 &&
          password.length > 0 &&
          password2.length > 0 && (
            <span className="validation">
              Please agree to the terms and conditions
            </span>
          )}

        <button onClick={handleSignUp} className="btn">
          Submit
        </button>
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="link"
        >
          Do u have an account <b>SignIn here...!</b>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

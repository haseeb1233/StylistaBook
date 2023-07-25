import React, { useState } from "react";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar1 from "../homepage/Navbar1";

function Login() {
  const location = useLocation();
  let navigate = useNavigate();
  const [selectuser, setUser] = useState("");
  const [login, setLogin] = useState({ email: "", password: "" });

  const handleSelect = (e) => {
    setUser(e.target.value);
  };

  const handleInput = (e) => {
    let { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      if (selectuser == "customer") {
        const response = await fetch(
          "https://stylistabookbackend-production.up.railway.app/user/login-user",
          {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
              "content-type": "application/json",
            },
          }
        );

        let res = await response.json();
        // console.log(res);
        // console.log(res.message);
        if (res.status == "ok") {
          // console.log(res);
          alert("Login successfull");
          localStorage.setItem("token", res.data);
          const { from } = location.state || { from: { pathname: "/" } };
          navigate(from);
        } else {
          alert("wrong credentials");
          console.log(res);
        }
      } else if (selectuser == "stylist") {
        const response = await fetch(
          "https://stylistabookbackend-production.up.railway.app/stylist/login",
          {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
              "content-type": "application/json",
            },
          }
        );

        let res = await response.json();

        if (res.token) {
          console.log(res);
          alert("Login successful");
          localStorage.setItem("token", res.token);
          localStorage.setItem("name", res.stylist.name);
          navigate("/business");
        } else {
          alert("wrong credentials");

          console.log(res);
        }
      }
    } catch (error) {
      alert("wrong credentials");
      console.log(error);
    }
  };

  console.log(selectuser, login);

  return (
    <>
      <Navbar1 />
      <div className="login">
        <div className="btnsdiv">
          <button className="btns">Sign Up</button>
          <button
            style={{ backgroundColor: "black", color: "white" }}
            className="btns"
          >
            Login
          </button>
        </div>

        <form className="loginform" action="" onSubmit={handleLoginUser}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <select name="selectuser" id="" onChange={handleSelect}>
            <option value="">select user</option>
            <option value="customer">customer</option>
            <option value="stylist">stylist</option>
          </select>
          <input id="submitformbtn" type="submit" value="Log In" />
        </form>
        <div className="parttwo">
          <div id="frgtpswd">
            <p>Forgot password</p>
          </div>
          <p id="or">or</p>
          <button
            className="googleauth"
            onClick={() => {
              window.location.href =
                "https://stylistabookbackend-production.up.railway.app/user/auth/google";
            }}
          >
            <img
              src="https://ragsdalemartin.com/wp-content/uploads/2020/07/white-google-logo.png"
              alt="googlelogo"
            />

            <p>Continue With Google </p>
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;

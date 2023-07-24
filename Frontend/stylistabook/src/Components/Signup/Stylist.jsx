import React, { useState } from "react";
import "./Stylist.css";
import { Navigate } from "react-router-dom";

function Stylist() {
  const [stylistUser, setStylistUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
    salonName: "",
    address: "",
    bio: "",
  });
  const nav = Navigate();
  const handleInput = (e) => {
    let { name, value } = e.target;
    setStylistUser({
      ...stylistUser,
      [name]: value,
    });
  };

  const handleStylistUser = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(
        "https://stylistabookbackend-production.up.railway.app/stylist/register",
        {
          method: "POST",
          body: JSON.stringify(stylistUser),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      let res = await response.json();
      console.log(res);
      console.log(res.token);
      if (!res.token) {
        nav("/login");
      } else {
        alert("wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(stylistUser);

  return (
    <div className="stylistsignup">
      <div className="btnsdiv">
        <button
          style={{ backgroundColor: "black", color: "white" }}
          className="btns"
        >
          Sign Up
        </button>
        <button className="btns">Login</button>
      </div>
      <form className="stylistform" action="" onSubmit={handleStylistUser}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleInput}
        />
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          onChange={handleInput}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInput}
        />
        <input
          type="number"
          placeholder="Mobile Number"
          name="phone"
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Enter image url"
          name="image"
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Enter Salon Name"
          name="salonName"
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Enter Adress"
          name="address"
          onChange={handleInput}
        />
        <input
          type="text"
          placeholder="Enter bio"
          name="bio"
          onChange={handleInput}
        />
        <input id="submitformbtn" type="submit" value="Create Account" />
      </form>
    </div>
  );
}

export default Stylist;

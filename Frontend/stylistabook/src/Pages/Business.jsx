import React, { useEffect, useState } from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
// import { Link } from "react-router-dom";
import styles from "../css/BusnessDashboard.module.css";
import BDHighlights from "../Components/BDHighlights";
import TodayApp from "../Components/TodayApp";
import Islogin from "../helper/Islogin";

function Bussiness() {
  Islogin();
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHlsaXN0SWQiOiI2NGJkMjIwOGQ1ZjlmZGNjNWE2YzE4NWQiLCJpYXQiOjE2OTAxMjg0MTcsImV4cCI6MTY5MDczMzIxN30.uLw-gE_bbh2VrjSTrjEkZE6vz0MzGwjBv5q4G5ZjCk4";
  const [apdta, setApdata] = useState([]);
  const [higlights, sethiglights] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/app/today/stylist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.appointments) {
          setApdata(data.appointments);
        }
      });
    fetch(`${process.env.REACT_APP_BASE_URL}/app/highlights`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.appointments) {
          sethiglights(data);
        }
      });
  }, []);
  return (
    <>
      <BusinessNavbar />
      <div className={styles.mainBody}>
        <BDHighlights data={higlights} />
        <TodayApp data={apdta} />
      </div>
    </>
  );
}

export default Bussiness;

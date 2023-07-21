import React from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
// import { Link } from "react-router-dom";
import styles from "../css/BusnessDashboard.module.css";
import BDHighlights from "../Components/BDHighlights";
import TodayApp from "../Components/TodayApp";

function Bussiness() {
  return (
    <>
      <BusinessNavbar />
      <div className={styles.mainBody}>
        <BDHighlights />
        <TodayApp />
      </div>
    </>
  );
}

export default Bussiness;

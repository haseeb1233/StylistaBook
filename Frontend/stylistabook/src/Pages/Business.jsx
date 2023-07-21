import React from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
// import { Link } from "react-router-dom";
import styles from "../css/BusnessDashboard.module.css";
import BDHighlights from "../Components/BDHighlights";

function Bussiness() {
  return (
    <>
      <BusinessNavbar />
      <div className={styles.mainBody}>
        <BDHighlights />
        <div className={styles.today_appointments}>
          <div className={styles.TD_header}>
            <h3>Today Appointments</h3>
          </div>
          <div className={styles.TDA_body}>
            <div className={styles.TDA_headings}>
              <div>TIME</div>
              <div>CUSTOMORE NAME</div>
              <div>SERVICE</div>
              <div>PRICE</div>
              <div>STATUS</div>
            </div>
            <div className={styles.TDA_card}>
              <div>08:00 PM</div>
              <div>Harry</div>
              <div>Hair Cut</div>
              <div>400</div>
              <div>Pending</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Bussiness;

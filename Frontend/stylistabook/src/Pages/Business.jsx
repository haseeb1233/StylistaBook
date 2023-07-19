import React from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
// import { Link } from "react-router-dom";
import styles from "../css/BusnessDashboard.module.css";

function Bussiness() {
  return (
    <>
      <BusinessNavbar />
      <div className={styles.mainBody}>
        <div className={styles.dashbord_header}>
          <div>Dashboard</div>
        </div>

        <div className={styles.dashboard_highlights}>
          <div>
            <p>2</p>
            <p>APPOINTMENT</p>
          </div>
          <div>
            <p>RS .600.00</p>
            <p>ESTIMATED SALES</p>
          </div>
          <div>
            <p>3</p>
            <p>CUSTMORES</p>
          </div>
        </div>
      </div>

      <div className={styles.today_appointments}>
        <div className={styles.today_appointments_header}></div>
      </div>
    </>
  );
}

export default Bussiness;

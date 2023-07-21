import React from "react";
import styles from "../css/BusnessDashboard.module.css";

function BDHighlights() {
  return (
    <>
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
        <div>
          <p>4</p>
          <p>REQUESTS</p>
        </div>
      </div>
    </>
  );
}

export default BDHighlights;

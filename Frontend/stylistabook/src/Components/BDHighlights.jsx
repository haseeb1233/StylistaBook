import React from "react";
import styles from "../css/BusnessDashboard.module.css";

function BDHighlights({ data }) {
  return (
    <>
      <div className={styles.dashbord_header}>
        <div>Dashboard</div>
      </div>

      <div className={styles.dashboard_highlights}>
        <div>
          <p>{data.appointments}</p>
          <p>APPOINTMENT</p>
        </div>
        <div>
          <p>RS {data.totalEarned}.00</p>
          <p>ESTIMATED SALES</p>
        </div>
        <div>
          <p>{data.totalCustomers}</p>
          <p>CUSTMORES</p>
        </div>
        <div>
          <p>{data.pendingCount}</p>
          <p>REQUESTS</p>
        </div>
      </div>
    </>
  );
}

export default BDHighlights;

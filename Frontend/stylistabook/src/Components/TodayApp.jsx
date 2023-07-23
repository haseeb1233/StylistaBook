import React from "react";
import styles from "../css/TodayAp.module.css";
import AppointentsList from "./AppointentsList";

function TodayApp({ data: cardData }) {
  return (
    <>
      <div className={styles.today_appointments}>
        <div className={styles.TD_header}>
          <h3>Today Appointments</h3>
        </div>
        <AppointentsList cardData={cardData} />
        {/* <div className={styles.noApp}>
          <p>You dont have Appointments Today</p>
          <p>Enjoy your day🤩</p>
        </div> */}
      </div>
    </>
  );
}

export default TodayApp;

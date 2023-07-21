import React from "react";
import styles from "../css/TodayAp.module.css";
import AppointentsList from "./AppointentsList";

function TodayApp() {
  const cardData = [
    {
      time: "08:00 PM",
      name: "Harry",
      service: "Hair Cut",
      price: "400",
      status: "Pending",
    },
    {
      time: "08:00 PM",
      name: "Harry",
      service: "Hair Cut",
      price: "400",
      status: "Pending",
    },
    {
      time: "08:00 PM",
      name: "Harry",
      service: "Hair Cut",
      price: "400",
      status: "Pending",
    },
    {
      time: "08:00 PM",
      name: "Harry",
      service: "Hair Cut",
      price: "400",
      status: "Pending",
    },
  ];
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

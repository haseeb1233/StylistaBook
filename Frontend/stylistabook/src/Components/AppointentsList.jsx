import React from "react";
import styles from "../css/TodayAp.module.css";

function AppointentsList({ cardData }) {
  return (
    <div>
      {" "}
      <div className={styles.TDA_content}>
        <div className={styles.TDA_headings}>
          <div>TIME⏱</div>
          <div>CUSTOMORE🙎‍♂️</div>
          <div>SERVICE</div>
          <div>PRICE</div>
          <div>STATUS</div>
        </div>
        {cardData.map((card, index) => (
          <div key={index} className={styles.TDA_card}>
            <div>{card.time}</div>
            <div>{card.name}</div>
            <div>{card.service}</div>
            <div>{card.price}</div>
            <div>{card.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AppointentsList;

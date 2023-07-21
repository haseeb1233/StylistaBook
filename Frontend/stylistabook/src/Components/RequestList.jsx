import React from "react";
import styles from "../css/TodayAp.module.css";
import styles2 from "../css/Request.module.css";

function RequestsList({ cardData }) {
  return (
    <div>
      {" "}
      <div className={styles.TDA_content}>
        <div className={styles2.TDA_headings}>
          <div>TIME⏱</div>
          <div>CUSTOMORE🙎‍♂️</div>
          <div>SERVICE</div>
          <div>PRICE</div>
          <div>STATUS</div>
          <div></div>
          <div></div>
        </div>
        {cardData.map((card, index) => (
          <div key={index} className={styles2.req_card}>
            <div>{card.time}</div>
            <div>{card.name}</div>
            <div>{card.service}</div>
            <div>{card.price}</div>
            <div>{card.status}</div>
            <div>
              <button className={styles2.acc_btn}>Accept</button>
            </div>
            <div>
              <button className={styles2.rej_btn}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestsList;

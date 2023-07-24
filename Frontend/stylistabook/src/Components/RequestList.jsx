import React from "react";
import styles from "../css/TodayAp.module.css";
import styles2 from "../css/Request.module.css";

function RequestsList({ cardData, handaleclick }) {
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
            <div>{card.customerId.fname}</div>
            <div>{card.serviceId.name}</div>
            <div>{card.serviceId.pricing}</div>
            <div>{card.status}</div>
            <div>
              <button
                onClick={() => {
                  handaleclick("accepted", card._id);
                  alert("accepted");
                }}
                className={styles2.acc_btn}
              >
                Accept
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  handaleclick("rejected", card._id);
                  alert("rejected");
                }}
                className={styles2.rej_btn}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestsList;

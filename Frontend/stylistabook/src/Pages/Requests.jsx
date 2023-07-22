import React from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
import styles from "../css/TodayAp.module.css";
import styles1 from "../css/BS_app.module.css";
import RequestsList from "../Components/RequestList";
function Requests() {
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
      <BusinessNavbar />
      <div className={styles.today_appointments}>
        <div></div>

        <div className={styles.TD_header}>
          <h3>Your Requests</h3>
          <div className={styles1.AP_Filters_search}>
            <div className={styles1.filterBYdate}>
              <div>FILTER BY DATE</div>
              <div>
                <div className={styles1.datesinput}>
                  <div>FROM</div>
                  <div>
                    <input type="date" name="" id="" />
                  </div>
                </div>
                <div className={styles1.datesinput}>
                  <div>TO</div>
                  <div>
                    <input type="date" name="" id="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles1.serchInp}>
              <form action="">
                <input type="search" placeholder="Search Here" />
                <input type="submit" value={"search"} />
              </form>
            </div>
          </div>

          <RequestsList cardData={cardData} />
        </div>
      </div>
    </>
  );
}

export default Requests;

import React, { useEffect, useState } from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
import styles from "../css/TodayAp.module.css";
import styles1 from "../css/BS_app.module.css";
import AppointentsList from "../Components/AppointentsList";
import Islogin from "../helper/Islogin";
function BusinessApointments() {
  Islogin();
  let token = localStorage.getItem("token") || null;
  const [apdta, setApdata] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/app/stylist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.appointments) {
          setApdata(data.appointments);
        }
      });
  }, []);

  return (
    <>
      <BusinessNavbar />
      <div className={styles.today_appointments}>
        <div></div>

        <div className={styles.TD_header}>
          <h3>Your Appointments</h3>
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
          {apdta.length > 1 && <AppointentsList cardData={apdta} />}
        </div>
      </div>
    </>
  );
}

export default BusinessApointments;

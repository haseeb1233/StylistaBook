import React, { useEffect, useState } from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
import styles from "../css/TodayAp.module.css";
import styles1 from "../css/BS_app.module.css";
import RequestsList from "../Components/RequestList";
import Islogin from "../helper/Islogin";
function Requests() {
  Islogin();
  let token = localStorage.getItem("token") || null;
  const [apdta, setApdata] = useState([]);
  const [flag, setflag] = useState(false);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/app/requests/stylist`, {
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
  }, [flag]);

  function handaleclick(status, id) {
    fetch(`${process.env.REACT_APP_BASE_URL}/app/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          setflag(!flag);
        }
      });
  }

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

          <RequestsList handaleclick={handaleclick} cardData={apdta} />
        </div>
      </div>
    </>
  );
}

export default Requests;

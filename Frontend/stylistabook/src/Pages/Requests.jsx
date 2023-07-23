import React, { useEffect, useState } from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
import styles from "../css/TodayAp.module.css";
import styles1 from "../css/BS_app.module.css";
import RequestsList from "../Components/RequestList";
import Islogin from "../helper/Islogin";
function Requests() {
  Islogin();
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHlsaXN0SWQiOiI2NGJkMjIwOGQ1ZjlmZGNjNWE2YzE4NWQiLCJpYXQiOjE2OTAxMjg0MTcsImV4cCI6MTY5MDczMzIxN30.uLw-gE_bbh2VrjSTrjEkZE6vz0MzGwjBv5q4G5ZjCk4";
  const [apdta, setApdata] = useState([]);
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
  }, []);

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

          <RequestsList cardData={apdta} />
        </div>
      </div>
    </>
  );
}

export default Requests;

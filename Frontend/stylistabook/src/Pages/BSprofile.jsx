import React from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
import styles from "../css/BSProfile.module.css";
function BSprofile() {
  return (
    <>
      <BusinessNavbar />
      <div className={styles.profileBody}>
        <h1>hello</h1>
      </div>
    </>
  );
}

export default BSprofile;

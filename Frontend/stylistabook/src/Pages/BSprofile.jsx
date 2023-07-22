import React from "react";
import BusinessNavbar from "../Components/BusinessNavbar";
import styles from "../css/BSProfile.module.css";
function BSprofile() {
  return (
    <>
      <BusinessNavbar />
      <div className={styles.profileBody}>
        <div className={styles.profile_header}>
          <div>
            <div className={styles.BS_name}>
              <h2>Salon Shop</h2>
            </div>
          </div>
          <div>
            <div>
              <img
                src="https://d2zdpiztbgorvt.cloudfront.net/region1/us/864939/biz_photo/6b52dd77f1614986a63f5789d1fc1c-angela-s-beauty-palace-biz-photo-9488841906f84b3c945e8382f6c99f-booksy.jpeg?size=640x427"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BSprofile;

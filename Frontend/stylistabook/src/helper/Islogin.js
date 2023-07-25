import { useNavigate, useLocation } from "react-router-dom";

const Islogin = () => {
  const token = localStorage.getItem("token") || null;
  const location = useLocation();
  const navigate = useNavigate();
  fetch(`${process.env.REACT_APP_BASE_URL}/stylistauth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.message == "login hai") {
        console.log("login haiiiii");
      } else {
        navigate("/login", { state: { from: location.pathname } });
      }
    })
    .catch((error) => {
      console.error("Error creating event:", error);
      // navigate("/login", { state: { from: location.pathname } });
    });
};

export default Islogin;

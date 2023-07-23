import About from "./About";
import BookNow from "./BookNow";
import Footer from "./Footer";

import Header from "./Header";
import LatestNews from "./LatestNews";
import Navbar1 from "./Navbar1";
import Pricing from "./Pricing";
import Services from "./Services";
import Testimonials from "./Testimonials";
import "./style1.css";
const Homepage = () => {
  return (
    <>
      <Navbar1 />
      <Header />
      <About />
      <Services />
      <Pricing />
      <BookNow />
      <LatestNews />
      <Testimonials />
      <Footer />
    </>
  );
};
export default Homepage;

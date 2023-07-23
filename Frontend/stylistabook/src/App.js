import About from "./About";
// import BookNow from "./BookNow";
import Clients from "./Clients";
import Header from "./Header";
import LatestNews from "./LatestNews";
import Pricing from "./Pricing";
import Services from "./Services";
import Testimonials from "./Testimonials";
import React, { useState, useEffect } from 'react';
import CircularProgressBar from './CircularProgressBar';
import NavBar from "./Navbar";



function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress update for demonstration purposes
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>
  <NavBar/>
  <Header/>
  <About/>
  <Services/>
  <Pricing/>
  {/* <BookNow/> */}
  <LatestNews/>
  <Testimonials/>
  <Clients/>
  <div>
      <h1>Circular Progress Bar Example</h1>
      <CircularProgressBar progress={progress} />
      <p>Progress: {progress}%</p>
    </div>
    </>
    
}

export default App;

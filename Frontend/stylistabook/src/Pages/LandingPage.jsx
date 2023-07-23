import About from "./homepage/About"
import BookNow from "./homepage/BookNow"

import Header from "./homepage/Header"
import LatestNews from "./homepage/LatestNews"
import Pricing from "./homepage/Pricing"
import Services from "./homepage/Services"
import Testimonials from "./homepage/Testimonials"
import "./homepage/style1.css"

const LandingPage = () =>{
    return (
                <>
             <Header/> 
            <About/> 
            <Services/> 
          <Pricing/> 
           <BookNow/> 
           <LatestNews/> 
          <Testimonials/> 
        
                </>
    )
}
export default LandingPage;
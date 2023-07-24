import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./Client.css"

function Client() {
     const [userDetails,setUserDetails]=useState({fname:"",lname:"",email:"",password:""})
     const nav=useNavigate()
     const handleInput = (e) => {
      let {name,value}=e.target
      setUserDetails({
        ...userDetails,
        [name]:value
      })
 }
 
 const handleSignupUser= async(e)=>{
  try {
    e.preventDefault()
    const response = await fetch("https://stylistabookbackend-production.up.railway.app/user/register",{
           method:"POST",
           body:JSON.stringify(userDetails),
           headers:{
            "content-type":"application/json"
           }
    })
    
     let res = await response.json()
     console.log(res)
      console.log(res.token)
    if(!res.token){
      alert(res)
     nav("/login")

    }else{
      alert("wrong")
    }

  } catch (error) {
    console.log(error)
  }
 }

  return (
    <div className='clientsignup'>
       <div className='btnsdiv'>
        <button style={{backgroundColor:"black",color:"white"}} className='btns'>Sign Up</button>
        <button  className='btns'>Login</button>
      </div>
      <form className='clientform' action="" onSubmit={handleSignupUser}>
        <input type="text" name='fname' placeholder='First name' onChange={handleInput} />
        <input type="text"name='lname' placeholder='Last name' onChange={handleInput} />
        <input type="email" name='email' placeholder='Enter Email'onChange={handleInput} />
        <input type="password" name='password' placeholder='Password' onChange={handleInput}/>
        <input id='submitformbtn' type="submit" value="Create Account"  />
      </form>
    </div>
  )
}

export default Client

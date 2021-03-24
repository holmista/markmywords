import React, {useState} from 'react'
import  './signup.css'
import axios from 'axios'

function Signup(){
    const[email, setemail] = useState('')
    const[password, setpassword] = useState('')
    const[valid, setvalid] = useState(false)

    function validateEmail(email) {
        var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(validRegex)) {
          console.log("Valid email address!");
          setvalid(true)
          return true;
        } else {
          console.log("Invalid email address!");
          setvalid(false)
          return false
        }
    }

    const handleclick = async ()=>{
        if(valid && password.length>5){
            const data = {useremail:email, userpassword:password}
            try{
                let request = await axios.post('http://localhost:5000/signup', data)
                let response = request.data
                console.log(response)
            }catch(err){
                console.log(err)
            }
        }else if (password.length<=5){
            console.log('password should be at least 5 characters')
        }else{
            console.log('invalid email')
        }
    }

    const handleemail = (e)=>{
        let email = e.target.value
        setemail(email)
        validateEmail(e.target.value)
    }

    const handlepassword = (e)=>{
        let password = e.target.value
        setpassword(password)
    }

    return(
        
        <div class="parent">   
            
            <div className='inputs'>
                <h2 class="signupleft"> sign up </h2>
                <div class="input1"><input type = "text" className="centerinside" placeholder="Email" onChange={handleemail}/></div>
                <div class="input2"><input type = "text" className="centerinside" placeholder="Password" onChange={handlepassword}/></div>
                <button  class="signbutton" onClick = {handleclick}>Sign up</button>
                
            </div>
              
        </div>
            
        
    );
 
}
export default Signup
import {useState, React} from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'

const Auth = () => {

    const [isSignUp, setIsSignUp] = useState(true);

  return (
    <div className="Auth">
    {/* Left Side */}
        <div className="a-left">
            <img src={Logo} alt=""/>
            <div className="webName">
                <h1>Twittogram</h1>
                <h6>Connect with people throughout the world</h6>
            </div>
        </div>

        {/* Right Side */}
        <div className="a-right">
            <form className="infoForm authForm">

                <h3>{isSignUp? "Sign Up" : "Log In"}</h3>
                {isSignUp &&
                <div>
                    <input type="text" placeholder="First Name" 
                    className="FormInput" name="firstname"/>
                    <input type="text" placeholder="Last Name" 
                    className="FormInput" name="Lastname"/>
                </div>
                }
                <div>
                    <input type="text" placeholder="Username" 
                    className="FormInput" name="username"/>
                </div>
                <div>
                    <input type="password" placeholder="Password" 
                    className="FormInput" name="password"/>
                    {isSignUp &&
                    <input type="password" placeholder="Confirm Password" 
                    className="FormInput" name="confirmpassword"/>
                    }
                </div>

                <button className="Button SignUpButton" type="submit">{isSignUp?"Sign Up": "Log In"}</button>
                
                <div>
                    <span style={{fontSize: '15px', cursor: "pointer"}} onClick={()=>setIsSignUp((prev)=>!prev)}>
                    {isSignUp? "Already have an account? Login" : "Don't have an account? Signup"}
                    </span>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Auth
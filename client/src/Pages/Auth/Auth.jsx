import {useState, React} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {logIn, signUp} from '../../actions/AuthAction.js'
import './Auth.css'
import Logo from '../../img/logo.png'

const Auth = () => {

    const dispatch = useDispatch();
    const loading = useSelector((state)=>state.authReducer.loading);
    console.log(loading)
    const [isSignUp, setIsSignUp] = useState(true);
    const [data, setData] = useState({firstname: "", lastname: "", username: "", password: "", confirmpassword: ""});
    const [confirmPass, setConfirmPass] = useState(true);

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            (data.password === data.confirmpassword)? dispatch(signUp(data)): setConfirmPass(false);
        } else {
            dispatch(logIn(data));
        }
    }

    const resetForm = () => {
        setConfirmPass(true);
        setData({firstname: "", lastname: "", username: "", password: "", confirmpassword: ""});
    }

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
            <form className="infoForm authForm" onSubmit={handleSubmit}>

                <h3>{isSignUp? "Sign Up" : "Log In"}</h3>
                {isSignUp &&
                <div>
                    <input type="text" placeholder="First Name" 
                    className="FormInput" name="firstname" 
                    value={data.firstname} onChange={handleChange}/>
                    <input type="text" placeholder="Last Name" 
                    className="FormInput" name="lastname" 
                    value={data.lastname}onChange={handleChange}/>
                </div>
                }
                <div>
                    <input type="text" placeholder="Username" 
                    className="FormInput" name="username" 
                    value={data.username}onChange={handleChange}/>
                </div>
                <div>
                    <input type="password" placeholder="Password" 
                    className="FormInput" name="password" 
                    value={data.password} onChange={handleChange}/>
                    {isSignUp &&
                    <input type="password" placeholder="Confirm Password" 
                    className="FormInput" name="confirmpassword" 
                    value={data.confirmpassword} onChange={handleChange}/>
                    }
                </div>
                <span style={{display: confirmPass? 'none': 'block', color: 'red', fontSize: '12px'}}>
                    Confirm Password is not same
                </span>

                <button className="Button SignUpButton" type="submit" disabled={loading}>
                {loading? "Loading...":isSignUp?"Sign Up": "Log In"}</button>
                
                <div>
                    <span style={{fontSize: '15px', cursor: "pointer"}} onClick={()=>{setIsSignUp((prev)=>!prev); resetForm()}}>
                    {isSignUp? "Already have an account? Login" : "Don't have an account? Signup"}
                    </span>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Auth
import React, { useEffect, useState } from 'react';
import "../style/login.css"
import { makeApi } from '../api/callApi';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!email) {
      toast.error('Please fill email');
      return;
    }
    if (!password) {
      toast.error('Please fill password');
      return;
    }
    try {
      const response = await makeApi("/api/login-user", "POST", { password, email })
      localStorage.setItem("token", response.data.token)
      toast.success(response.data.message, {
        onClose: () => {
          if (response.data.user.role === "admin") {
            navigate("/admin/admin-dashboard")
          }
        }
      })

    } catch (error) {
      console.error('Error sending data:', error.response.data);
      toast.error(error.response.data.message);

    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const checkUserRole = async () => {
        try {
          const response = await makeApi("/api/my-profile", "GET");
          if (response.data.success === true) {
            if (response.data.user.role === "admin") {
              navigate("/admin/admin-dashboard")
            }else{
              navigate("https://palji-bakeryy.vercel.app/")
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
      checkUserRole()
    }
  }, [])


  return (
    <>
      <ToastContainer />
      <div className='main_login_page_div' >
        <form className="form" >
          <p className="login">Log in to Palji </p>
          <div className="login_inputContainer">
            <input
              placeholder="phone or email or username"
              type="text"
              // className="fInput email"
              className='login_input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
            <input
              placeholder="Enter your password"
              type="password"
              // className="fInput pass"
              // className="fInput email"

              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            {/* <input type="button" value="next" className="submit" /> */}
            <button type="submit" className="submit" onClick={(e) => handleSubmit(e)} >Log in</button>
          </div>
          <div>
            <Link to="/Forgot-Password">
              <button type="submit" className="forget">Forget password?</button>
            </Link>
          </div>
          {/* <div className="con"> */}
          {/* <p>Don't have an account?&nbsp;</p> */}
          {/* <a href="#">Sign up</a> */}
          {/* </div> */}
        </form>
      </div>
    </>
  );
}

export default LoginForm;

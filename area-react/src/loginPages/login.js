import logo from '../logo.svg';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LogoutUser = async () => {
  localStorage.clear();
}

const LoginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    if (email === "" || password === "") {
      window.alert("Email and password are required");
      reject(new Error("Email and password are required"));
      return;
    }

    const userData = {
      email: email,
      password: password,
    };

    console.log(userData);

    axios
      .post( localStorage.getItem("ip") + '/auth/login', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.alert("Success connection");
          console.log(response.data);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("token", response.data.token);
          resolve(response.data);
        } else {
          reject(new Error(`Unexpected response status: ${response.status}`));
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        window.alert(error.message);
        reject(error); // Reject with the error
      });
  });
};




export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  useEffect(() => {
    localStorage.setItem("ip", "http://localhost:8080");
  }, []);
  return (
    <div className="App">
      <div className='tab'>
        <h1>WELCOME BACK !</h1>
        <span>Don't have an account, <Link to = {"/register"}>SIGN UP</Link></span>
        <input className='inputconnexion' placeholder='deniel123@gmail.com' type='email' onChange={(e) => {setEmail(e.target.value)}}></input>
        <input className='inputconnexion' type='password' onChange={(e) => {setPassword(e.target.value)}}></input>
        <a>forget password ?</a>

        <button onClick={() => {LoginUser(email, password)
          .then((data) => {navigation("/workflow")})
          .catch((error) => {
            console.log(error);
          });
          }

        } 
          className='Button' >Sign In</button>

        <div className='line'></div>

        <div style={{display : "flex", justifyContent : 'space-between'}}>
          <div className='SocialButton'></div>
          <div className='SocialButton'></div>
          <div className='SocialButton'></div>
        </div>

      </div>
    </div>
  );
}

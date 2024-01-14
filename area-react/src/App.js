import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Login} from "./loginPages/login"
import { Register } from './loginPages/register';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Workflowpage } from './WorkflowPages/workflowpage';
import { useNavigation } from 'react-router-dom';
import { Github, Gitlab, Google, Spotify } from './loginPages/GithubPages/github';
import { Navbar } from './Utils/Navbar';
import { Frontmobile } from "./frontMobile/frontmobile";
function App() {
    const [basicpath, setBasicPath] = useState(null);

    useEffect(() => {
        localStorage.setItem("ip", "https://area-backend-production.up.railway.app");
        console.log(localStorage.getItem("ip"));
        if (localStorage.getItem("id") != null) {
            setBasicPath("/workflow");
            console.log(localStorage.getItem("id"));
        } else {
            setBasicPath("/login");
            console.log("hey2");
        }
    }, [window.location.pathname]);

    return (
        <BrowserRouter>
            {/* {
      basicpath != "/login" ?
      (<>
      <Navbar/></> ): null
    } */}
      <Routes>
        {basicpath != null ? (
          <>
            <Route path="/" element={<Navigate to={basicpath} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workflow" element={<Workflowpage />} />
            <Route path="/auth/github" element={<Github/>} />
            <Route path="/google" element={<Google/>} />
            <Route path="/spotify" element={<Spotify/>} />
            <Route path="/gitlab" element={<Gitlab/>} />
            <Route path="/frontMobile/:token/:service/:ip" element={<Frontmobile/>} />
          </>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {Login} from "./loginPages/login"
import { Register } from './loginPages/register';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Workflowpage } from './WorkflowPages/workflowpage';
import { useNavigation } from 'react-router-dom';
function App() {
  const [basicpath, setBasicPath] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('id') !== null) {
      setBasicPath("/workflow");
      console.log(localStorage.getItem('id'));
    } else {
      setBasicPath("/login");
      console.log("hey2");
    }
  }, [window.location.pathname]);

  return (
    <BrowserRouter>
      <Routes>
        {basicpath !== null ? (
          <>
            <Route path="/" element={<Navigate to={basicpath} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/workflow" element={<Workflowpage />} />
          </>
        ) : null}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

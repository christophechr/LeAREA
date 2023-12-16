import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Login} from "./loginPages/login"
import { Register } from './loginPages/register';
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
    </Routes>
    {/* <NavBar /> */}
</BrowserRouter>
  );
}

export default App;

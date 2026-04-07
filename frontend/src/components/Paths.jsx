import { Routes,Route } from "react-router-dom";
import Home from "./Home";
import { Fetch } from "./Fetch";
import { Showdata } from "./Showdata";
import { Map } from "./Map";

export default function Paths(){
    return(
        <div className="routes">
            <Routes>
                <Route path="/" element={<Home/>}/> 
                <Route path="/fetch/" element={<Fetch/>}/>
                <Route path="/info" element={<Showdata/>}/>   
                <Route path="/map" element={<Map/>}/>   
            </Routes>
        </div>
    );
}
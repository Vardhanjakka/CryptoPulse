import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
//import Home from "./components/Home";
import Paths from "./components/Paths";

export default function App(){
  return(
    <div className="app">
      <BrowserRouter>
      <Header/>
      <Paths/>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}
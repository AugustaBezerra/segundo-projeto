import React from "react";
import Messages from "./Messages";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./HomePage.tsx";
import Navbar from "./Navbar";
import Settings from "./Settings";

const App: React.FC = () => {
  return (
    <Router> 
      <Navbar/>
      <Routes>
          <Route path ="/" element = {<HomePage/>}/>
          <Route path ="/messages" element = {< Messages/>}/>
          <Route path ="/settings" element = {< Settings/>}/>

      </Routes>
    </Router>

  );
};

export default App;

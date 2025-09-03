 //import HomePage from "./Components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import  { Signin } from "./Components/Signin";
import { VideoRecord } from "./Components/VideoRecorder";
import './index.css'; 
import HomePage from "./Components/Home";
import { Signup } from "./Components/Signup";
import { Dashboard } from "./Components/Dashboard";

function App(){
  return( <div className="">
  <Router>
    <Routes>
      <Route path="/signin" element={<Signin/>}/>
      <Route path="/" element={<HomePage/>}/>
      <Route path="signup" element={<Signup/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="videorecord" element={<VideoRecord/>}/>
    </Routes>
  </Router>
  
  </div>
  )
}
export default App;
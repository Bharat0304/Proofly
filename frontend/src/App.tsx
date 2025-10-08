import {Router, Route, Routes,BrowserRouter} from "react-router-dom";
import HomePage from "./Components/Home";
import Signup from "./Components/Signup";
import { Signin } from "./Components/Signin";
import Dashboard from "./Components/Dashboard";
import TestimonialCard from "./Components/TestimonialCard";
import { Codepreview } from "./Components/CodePreview";
import { CodePrevBold } from "./Components/CodePrevBold";
import { CodePrevGlass } from "./Components/CodePrevGlass";
import { CodePrevModern } from "./Components/CodePrevModern";
function Home(){
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
     <Route path='/proof' element={<TestimonialCard/>}></Route>
      <Route path="snippet" element={<Codepreview/>}></Route>
      <Route path="snippet2" element={<CodePrevBold/>}></Route>
      <Route path="snippet3" element={<CodePrevGlass/>}></Route>
    
      <Route path="snippet4" element={<CodePrevModern/>}></Route>
      </Routes>


    </BrowserRouter>
  )
}
export default Home;
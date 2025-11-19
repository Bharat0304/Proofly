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
import VideoRecord from "./Components/VideoRecorder";
import { RequireAuth } from "./Components/RequireAuth";
import PublicSpacePage from "./Components/PublicSpacePage";
import { TestimonialSection } from "./Components/testing";
function Home(){
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard/>
          </RequireAuth>
        }
      ></Route>
     <Route path='/proof' element={<TestimonialCard/>}></Route>
      <Route path="snippet" element={<Codepreview/>}></Route>
      <Route path="snippet2" element={<CodePrevBold/>}></Route>
      <Route path="snippet3" element={<CodePrevGlass/>}></Route>
    
      <Route path="snippet4" element={<CodePrevModern/>}></Route>
      <Route path="/space/:shareId" element={<PublicSpacePage/>}></Route>
      <Route path="/video" element={<VideoRecord/>}></Route>
     <Route path="/test" element={<TestimonialSection/>}></Route><Route/>
      </Routes>
      


    </BrowserRouter>
  )
}
export default Home;
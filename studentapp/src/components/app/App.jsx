
import {Routes,Route} from "react-router-dom";
import './App.css';
import { NavBar } from '../navbar/Navbar';
import { SignUp } from "../users/user-signup/UserSignUp";
import { UserSignIn } from "../users/user-signin/UserSignIn";
import { AllStudents } from "../students/allstudents/AllStudents";
import { StudentRegister } from "../students/sign-up/StudentRegister";
import { StudentEdit } from "../students/studentEdit/StudentEdit";
import { Home } from "../home";

const App=()=>{
  return (
    <div className="App">
      <header className="App-header">
        <NavBar/>
      </header>
      
        <main className="main-content">
        <div className="content" >
        <Routes>
          <Route path="/register" element={<SignUp/>}></Route>
          <Route path="/login" element={<UserSignIn/>}></Route>
          <Route path="/Allstudents" element={<AllStudents/>}></Route>
          <Route path="/students/register" element={<StudentRegister/>}></Route>
          <Route path="/students/:id" element={<StudentEdit/>}></Route>
          <Route path="/" element={<Home/>}></Route>

        </Routes>
        </div>
        </main>
      
    </div>
  );
}

export default App;

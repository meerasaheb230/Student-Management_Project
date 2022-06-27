import {useState,useEffect} from "react";
import "./AllStudents.css";

import img from "./man.png";
import book from "./books.jpeg";
import axios from "axios";


export const AllStudents=()=>{
    const [students,setStudents]=useState([]);
useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:3001/students", {
        headers: {
            "content-type":"application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const students = response.data.data.students;
        setStudents(students);
       
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  

    return (
        <div className="container-students text-center text-white pt-5">

                        
                        {students.map((student)=>(
                            <div className="box">
                                <div className="row">
                                <div className="col">
                             <div className="card" key={student._id}>
                             <img src={book}  alt="book"  className="card-img-top"/>
                             <img src={img}  alt="human icon"  className="image"/>
                                 <div className="card-body">
                                     <h3><h4>{student.title}{ }</h4>{student.name}</h3>
                                     <p className="card-text">
                                     """ 
                                     CollegeName: {student.collegeName}<br/>
                                     gender: {student.gender}<br/>
                                     {/* Address: Street::{student.address.street}<br/><br/>
                                              City:: {student.address.city}<br/><br/>
                                              Pincode:: {student.address.pincode}<br/><br/> */}
                                     Mobile: {student.mobile}
                                     """
                                     </p>
                                 </div>
                             </div>
                             </div>
                             </div>
                             </div>
                        ))}

        </div>
    )
}

import React,{useState,useEffect} from 'react';
import "./StudentRegister.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import  books  from  "./books.jpeg";
import   man from   "./man.png";


export const StudentRegister=()=>{
    const [studentData,setStudentData]=useState({title:'',name:'',collegeName:'',gender:'',mobile:""});
const [form,setForm]=useState("")
const [students,setStudents]=useState([]);
const {title,name,collegeName,gender,mobile}=studentData;
const changeHandler=e=>{
  setStudentData({...studentData,[e.target.name]:e.target.value})
}
const submitHandler=e=>{
    e.preventDefault();
    if(studentData.title.trim().length===0||studentData.name.trim().length===0 || studentData.collegeName.trim().length===0 ||
    studentData.gender.trim().length===0 || studentData.mobile.trim().length===0){
        setForm(true);
        return;
    }
    const token=localStorage.getItem("accessToken")

    console.log(token);
    setForm(false);
    //console.log(data);
    axios.post("http://localhost:3001/students",studentData,{
        headers:{
            "content-type":"application/json",
            authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        if(response.data.success){
            const Student=response.data.data.students;
           // console.log(book);
            setStudents([...students,Student]);
            setStudentData({title:"",name:"",collegeName:"",gender:"",mobile:""})
        }
    }).catch((error)=>console.error(error))
}

const handleStudentDelete=(id)=>{
    const token=localStorage.getItem("accessToken");
    axios.delete(`http://localhost:3001/students/${id}`,{
     headers:{
         authorization:`Bearer ${token}`
     }
    }).then((response)=>{
     if(response.data.success){
         console.log(response.data.success);
         const data=students.filter(({_id})=> _id !== id )
         setStudents(data)
     }
    })
 }


useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // console.log(students)
    axios
      .get("http://localhost:3001/students", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const students = response.data.data.students;
        //console.log(response.data);
       // console.log(books);
        setStudents(students);
      })
      .catch((error) => {
        console.error(error);
      });
  },[]);


return(
    <div className='container-students text-center text-white pt-5'>
    <div className='register'>   
            <form onSubmit={submitHandler} className='register'>
            
            <br/>
                <div  className='input-group'>
                    {  <ul>
                          { 
                            students.map((item)=>{
                             return(
                                  

                                    <div className="box" key={item._id}>
                                <div className="row">
                                <div className="col">
                             <div className="card" key={item._id}>
                             <img src={books}  alt="book"  className="card-img-top"/>
                             <img src={man}  alt="human icon"  className="image"/>
                                 <div className="card-body">
                                     <h3><h4>{item.title}{ }</h4>{item.name}</h3>
                                     <p className="card-text">
                                     """ 
                                     CollegeName: {item.collegeName}<br/>
                                     gender: {item.gender}<br/>
                                     
                                     Mobile: {item.mobile}
                                     """
                                     <span >
                                                 <Link id="bg" to={"/students/" + item._id}>
                                                   <button id="icon">
                                                   <FontAwesomeIcon  icon={faPen} />
                                                   </button>
                                                 </Link>
                                                 </span>
                                                 <span >
                                                 <button id="bg" onClick={()=>handleStudentDelete(item._id)} >
                                                   <FontAwesomeIcon  icon={faTrash} />
                                                 </button>
                                                 </span>

                                     </p>
                                 </div>
                             </div>
                             </div>
                             </div>
                             </div>
                         

                                    )
                                        })
                                }
                         </ul>
                    }
                </div>
                <br/>
                <div className="form-inputs">
                <h2>Students Registration</h2>
                <div>
                    <label>Title</label>
                    <br/>
                    <input id='name' type="text" name="title" value={title} onChange={changeHandler} placeholder="Enter your title"></input>
                </div>
                <br/>
                <div>
                    <label>what is your name?</label><br/>
                    <input id='name' type="text" name="name" value={name} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <label>what is your gender</label><br/>
                    <input id='gender' type="text" name="gender" value={gender} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <label>Collage</label><br/>
                    <input id='collegeName' type="text" name="collegeName" value={collegeName} onChange={changeHandler}></input>
                </div>
                <br/>
                <div>
                    <label>Mobile</label><br/>
                    <input id='mobile' type="number" name="mobile" value={mobile} onChange={changeHandler}></input>
                </div>
                <br/>

                <div>
                    <button id='submit' type="submit">Submit</button>
                </div>
                </div>
            </form>
        {form ? (
        <div className="alert alert-danger">
          <p className="alert-message">
            Title and Category fields are required.
          </p>
        </div>
      ) : null}
    </div>
    </div>
)
}


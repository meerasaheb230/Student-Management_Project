import { useState } from "react";
import "./UserSignUp.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState(
        {
            title:"",
            name:"",
            email:"",
            password:""
        }
    );
        const [formError,setFormError]=useState(false);
      
    const changeHandler=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }



    const submitHandler=(e)=>{
        e.preventDefault();
        if(user.name.trim().length===0 || user.email.trim().length===0 || 
            user.password.trim().length===0 || user.title.trim().length===0)
        {
            setFormError(true);
            return;
        }
        setFormError(false);
        axios.post("http://localhost:3001/auth/users",user,{
            Headers:{
                "content-type":"application/json"
            },
        })
        .then((response=>{
            if(response.data.success){
                setUser({title:"",name:"",email:"",password:""});
                navigate("/login");
            }
        })).catch((error)=>{
            setFormError(true);
        })
    }
    return (
        <div className="container">
            

            <form  className="signIgn-form" onSubmit={submitHandler}>
            <div className="signup-header">
                <h1 className="signup-title">Sign-Up</h1>
            </div>
                <div className="input-group">
                    <label htmlFor="title">What is your  Title?</label>
                  
                     <input type="text" className="title-input"
                    id="title"
                    name="title"
                    value={user.title}
                    placeholder="title"
                    onChange={changeHandler}
                    />
                </div>
                <div className="input-group">
                    <lable htmlFor="name">What is your Name</lable>
                    <input type="text" className="name-input"
                    id="name"
                    name="name"
                    value={user.name}
                    placeholder="enter your name"
                    onChange={changeHandler}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">What is your Email</label>
                    <input type="email" className="email-input"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={changeHandler}
                        placeholder="Enter your mail"
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password"> What is your Password</label>
                    <input type="password" className="password-input"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={changeHandler}
                        placeholder="Enter your Password"
                    />
                </div>
                <br/>
                <div className="submit-button">
                   <button type="submit" className="btn btn-primary">
                    submit
                   </button>
                </div>

            </form>

            {formError ? (
                <div className="alert-denger">
                <p className="alert-message">
                    invalid details, please check once and resubmit..
                </p>
                </div>
            ):null}
        </div>
       
    );

};


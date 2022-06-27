import { useState } from "react";
import axios from "axios";
import "./UserSignIn.css";
export const UserSignIn=()=>{
    const [user,setUser]=useState({
        email:"",password:""
    });

    const [formError,setFormError]=useState(false);
    const changeHandler=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        if(user.email.trim().length===0 || user.password.trim().length===0)
        {
            setFormError(true);
            return;
        }
        setFormError(false);
        axios.post("http://localhost:3001/auth/login",user,{
            headers:{
                "content-type":"application/json"
            }
        }).then((response)=>{
            if(response.data.success)
            {
                setUser({email:"",password:""});
                const token=response.data.data.token;
                console.log(token);
                const user=response.data.data.user;
                localStorage.setItem("accessToken",token);
                localStorage.setItem("user",JSON.stringify(user));
                sessionStorage.setItem("accessToken",token);
            }
        }).catch((error)=>{
            console.log(error.response.data.message);
            setFormError(true);

        })
    }

    return (
        <div className="container">
            
        <form  className="signIgn-form" onSubmit={submitHandler}>
        <div className="signIn-header">
                <h1 className="signIn-title">
                    Sign-In
                </h1>
            </div>
            <div className="input-group">
                <label htmlFor="email">what is your email ?</label>
                <input type="text" className="email-input" 
                id="email"
                name="email"
                placeholder="Enter yout email"
                value={user.email}
                onChange={changeHandler}
                />
            </div>
            <div className="password-group">
                <label htmlFor="password">Password</label>
                <input type="password"  
                id="password"
                name="password"
                value={user.password}
                placeholder="**************"
                className="password-input"
                onChange={changeHandler}
                />
            </div>
            <div className="submit-buton">
               <button className="button btn-primary"  type="submit">
                Submit
               </button>

            </div>

        </form>
        {formError ? (
            <div className="alert-denger">
                <p className="aler-message">
                    invalid credentials,provide correct details...                </p>
            </div>
        ):null}
        </div>
    )
}
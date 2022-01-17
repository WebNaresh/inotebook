import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

export const Login = (props) => {    

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if (json.success){
            
            localStorage.setItem("token", json.authtoken);
            navigate("/")
            props.showAlert("succesfully Logged in","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }


    }

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input required minLength={5} type="email" name='email' value={credentials.email} onChange={onChange}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input required minLength={5} type="password" name='password'  value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

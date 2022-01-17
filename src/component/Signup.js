import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

export const Signup = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({email:"",password:"",name:"",cpassword:""})

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:4000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name,email,password })
        });
        const json = await response.json();
        console.log(json);
        try {
            
            localStorage.setItem("token", json.authtoken);
            navigate("/")
            props.showAlert("succesfully signup","success")
        } catch (error) {
            props.showAlert("Invalid Details","danger")
        }

       
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input  onChange={onChange} name='name'required type="text" className="form-control" id="name" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input  onChange={onChange} name='email'required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <small id="emailHelp" className="form-text text-muted"></small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input  onChange={onChange} name='password'required type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input  onChange={onChange} name='cpassword'required type="password" className="form-control" id="cpassword" />
                </div>
                <button type="submit" className="btn margin-auto align-items-center my-3 btn-primary">Submit</button>
            </form>
        </div>
    )
}

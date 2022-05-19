import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import createContext from "../context/createContext";


const Login = () => {
  const { login } = useContext(createContext);
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(credentials);
    if (result.success) {
      localStorage.setItem('token', result.token);
      navigate('/')
    } else {
      alert('Wrong credentials')
    }
  }
  return (
    <div className="container">
      <form onSubmit={handleLogin} >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input onChange={handleCredentials} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input onChange={handleCredentials} autoComplete='off' name="password" type="password" className="form-control" id="exampleInputPassword1" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
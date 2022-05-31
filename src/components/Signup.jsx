import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import createContext from '../context/createContext';

const Signup = () => {
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate()
  const { signup } = useContext(createContext);
  const singupFieldsHandler = (e) => {
    setNewUser((prev) => {
      return {
        ...prev, [e.target.name]: e.target.value
      }
    })
  }
  const singupHandler = async (e) => {
    e.preventDefault()
    const response = await signup(newUser)
    if (response.success) {
      localStorage.setItem("token", response.token)
      navigate('/')
    }else{
      alert('something is wrong')
    }
  }
  return (
    <div className="container">
      <form onSubmit={singupHandler} >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input onChange={singupFieldsHandler} name="name" type="text" className="form-control" id="name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={singupFieldsHandler} name="email" type="email" className="form-control" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={singupFieldsHandler} autoComplete='off' name="password" type="password" className="form-control" id="password" required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
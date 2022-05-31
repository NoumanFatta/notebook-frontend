import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
  useEffect(() => {
    if (localStorage.getItem('token'))
      document.title = "Notebook - Home";
  }, []);
  if (!localStorage.getItem('token'))
    return <Navigate to='/login' />
  return (<AddNote>
    <Notes />
  </AddNote>)
};

export default Home;

import React, { useState } from "react";
import Context from "./createContext";

const ContextProvider = (props) => {
  // const host = "http://localhost:5000";
  const host = "https://backend-notebook.herokuapp.com";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const showAlert = (msg, type) => {
    setAlert({
      msg, type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  const signup = async (credentials) => {
    const response = await fetch(`${host}/user/signup`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    return result;
  }
  const login = async (credentials) => {
    const response = await fetch(`${host}/user/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    return result;
  }

  // API call to Fetch All Notes From Database
  const getNotes = async () => {
    setLoading(true);
    const response = await fetch(`${host}/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const result = await response.json();
    setLoading(false);
    setNotes(result);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/notes/addnote`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const result = await response.json();
    if (result?.title) {
      setNotes(
        notes.concat({
          _id: result._id,
          title: result.title,
          tag: result.tag,
          description: result.description,
        })
      );
    }
  };

  const editNote = async (id, updatedNote) => {
    const { title, tag, description } = updatedNote;
    const response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const result = await response.json();
    if (result?.title) {
      const updatedNote = notes.map((obj) => {
        if (obj._id === id) {
          return { ...obj, title, tag, description };
        } else {
          return obj;
        }
      });
      setNotes(updatedNote);
    }
  };

  const deleteNote = async (id) => {
    const response = await fetch(`${host}/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const result = await response.json();
    if (result?.title) {
      setNotes(notes.filter((note) => note._id !== id));
    }
  };

  return (
    <Context.Provider
      {...props}
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        getNotes,
        editNote,
        loading,
        login,
        signup,
        showAlert,
        alert
      }
      }
    />
  );
};
export default ContextProvider;

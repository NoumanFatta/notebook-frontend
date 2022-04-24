import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://backend-notebook.herokuapp.com/";
  const initialNotes = [];
  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);

  // API call to Fetch All Notes From Database
  const getNotes = async () => {
    setLoading(true);
    const response = await fetch(`${host}notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDZiMTNlZjlkNmVkMDdiMjQ2YTU4NSIsImlhdCI6MTY0ODgwMDA4Mn0.CRAVxg4DBJHZ1Y1XaRE3DqXy2a0sMfa2zbpVkWUz6NA",
      },
    });
    const result = await response.json();
    setLoading(false);
    setNotes(result);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}notes/addnote`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDZiMTNlZjlkNmVkMDdiMjQ2YTU4NSIsImlhdCI6MTY0ODgwMDA4Mn0.CRAVxg4DBJHZ1Y1XaRE3DqXy2a0sMfa2zbpVkWUz6NA",
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
    const response = await fetch(`${host}notes/updatenote/${id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDZiMTNlZjlkNmVkMDdiMjQ2YTU4NSIsImlhdCI6MTY0ODgwMDA4Mn0.CRAVxg4DBJHZ1Y1XaRE3DqXy2a0sMfa2zbpVkWUz6NA",
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
    const response = await fetch(`${host}notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDZiMTNlZjlkNmVkMDdiMjQ2YTU4NSIsImlhdCI6MTY0ODgwMDA4Mn0.CRAVxg4DBJHZ1Y1XaRE3DqXy2a0sMfa2zbpVkWUz6NA",
      },
    });
    const result = await response.json();
    if (result?.title) {
      setNotes(notes.filter((note) => note._id !== id));
    }
  };

  return (
    <NoteContext.Provider
      // {...props}
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        getNotes,
        editNote,
        loading,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;

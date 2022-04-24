import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const AddNote = (props) => {
  const { addNote } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const onNoteChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const submitNote = (e) => {
    e.preventDefault();
    if (note.title && note.description && note.tag) {
      addNote(note.title, note.description, note.tag);
      setNote({ title: "", description: "", tag: "" });
    } else alert("fill all the fields");
  };
  return (
    <div className="container my-3">
      <h2>Add a Note</h2>
      <form className="my-3" autoComplete="off" onSubmit={submitNote}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            value={note.title}
            type="text"
            name="title"
            className="form-control"
            id="title"
            onChange={onNoteChange}
            minLength = {3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            value={note.description}
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onNoteChange}
            minLength = {3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            value={note.tag}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onNoteChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
      {props.children}
    </div>
  );
};

export default AddNote;

import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/noteContext";
import NoteItems from "./NoteItems";

const Notes = () => {
  const { notes, getNotes, editNote, loading } = useContext(noteContext);
  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);
  const refClose = useRef(null);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const onNoteChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const submitNote = (e) => {
    e.preventDefault();

    if (note.title && note.description && note.tag) {
      const updatedNote = {
        title: note.title,
        tag: note.tag,
        description: note.description,
      };
      editNote(note._id, updatedNote);
      refClose.current.click();
    } else {
      alert("fill all fields");
    }
  };

  const updateNote = (currentNote) => {
    setNote(currentNote);
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={refClose}
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3" autoComplete="off" onSubmit={submitNote}>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={note.title}
                    className="form-control"
                    id="etitle"
                    onChange={onNoteChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value={note.description}
                    className="form-control"
                    id="edescription"
                    name="description"
                    onChange={onNoteChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.tag}
                    className="form-control"
                    id="etag"
                    name="tag"
                    onChange={onNoteChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {loading ? (
          <h1>Loading..</h1>
        ) : (
          <>
            <h3 style = {{color:'red'}} >{notes.length === 0 && "No Notes To Display!"}</h3>
            {notes.map((note) => {
              return (
                <NoteItems key={note._id} updateNote={updateNote} note={note} />
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Notes;

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const UpdateNote = (props) => {
  const { editNote } = useContext(noteContext);
  const { oldNote } = props;
  const [note, setNote] = useState({
    title: oldNote.title,
    description: oldNote.description,
    tag: oldNote.tag,
  });
  const onNoteChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const submitNote = (e) => {
    e.preventDefault();
    const updatedNote = {};
    if (note.title) updatedNote.title = note.title;
    if (note.tag) updatedNote.tag = note.tag;
    if (note.description) updatedNote.description = note.description;
    if (note.title && note.description && note.tag) {
      editNote(oldNote._id, updatedNote);
    } else {
      alert("fill all fields");
    }
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
    </>
  );
};

export default UpdateNote;

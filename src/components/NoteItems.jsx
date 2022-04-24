import React, { useContext } from "react";
import noteContext from "../context/noteContext";

const NoteItems = (props) => {
  const { deleteNote } = useContext(noteContext);

  const { note, updateNote } = props;
  return (
    <div className="col-md-3 mb-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h5 className="card-title text-capitalize">{note.title}</h5>
            </div>
            <div>
              <i
                className="fa-solid fa-trash-can"
                onClick={() => deleteNote(note._id)}
              ></i>
              <i
                className="fa-solid fa-pen-to-square ms-3"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => updateNote(note)}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItems;

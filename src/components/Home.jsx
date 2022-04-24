import React, { useEffect } from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
  useEffect(() => {
    document.title = "Notebook - Home";
  }, []);

  return (
    <>
      <AddNote>
        <Notes />
      </AddNote>
    </>
  );
};

export default Home;

import React, { useEffect } from 'react';
const About = () => {
  useEffect(() => {
    document.title = 'Notebook - About'
  }, []);

  return (
    <div>About</div>
  )
}

export default About
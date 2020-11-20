import React from 'react';
import './App.css';
import Post from './Post'

function App() {
  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="header" />
      </div>

      <Post userName="srosiex" caption="cute pupper" imageUrl="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" />
      <Post/>
      <Post/>

    </div>
  );
}

export default App;

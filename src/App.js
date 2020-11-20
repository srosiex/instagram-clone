import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post'
import { db } from './firebase';

function App() {
  const [posts, setPosts] = useState([
    // {
    //   userName: "srosiex",
    //   caption: "cute pupper",
    //   imageUrl: "https://m.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/05/16/Pictures/_1571873a-58de-11e8-b431-73159b4b09e2.jpg"
    // },
    // {
    //   userName: "lucasbub",
    //   caption: "so presh",
    //   imageUrl: "https://www.peta.org/wp-content/uploads/2015/09/iStock_000003786514_Small.jpg"
    // },
    // {
    //   userName: "lunita",
    // caption: "my favorite!",
    // imageUrl: "https://cdn.shopify.com/s/files/1/2805/6406/products/HTB1TrO4hmfD8KJjSszhq6zIJFXat_1200x1200.jpg?v=1546478235"
    // }
  ])

  //useEffect runs a piece of code based ona specific condition
  //runs everytime the variable changes
  useEffect(() => {
    //this is where the code runs
    db.collection('posts').onSnapshot(snapshot)
  }, [])

  return (
    <div className="app">
      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="header" />
      </div>

      {
        posts.map(post => (
          <Post userName={post.userName} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    
    </div>
  );
}

export default App;

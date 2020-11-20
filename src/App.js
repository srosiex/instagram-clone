import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post'
import { db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import { Button } from '@material-ui/core'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles()
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = useState(false)
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
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])

  return (

    
    <div className="app">

    <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>I am a modal.</h2>

      <Modal />
    </div>
      </Modal>


      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="header" />
      </div>

      <Button>Sign Up</Button>

      {
        posts.map(({id, post}) => (
          <Post key={id} userName={post.userName} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    
    </div>
  );
}

export default App;

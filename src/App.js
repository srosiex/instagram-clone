import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post'
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core'

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

    //   userName: "lucasbub",
    //   caption: "so presh",
    //   imageUrl: "https://www.peta.org/wp-content/uploads/2015/09/iStock_000003786514_Small.jpg"

  ])
  const [email, setEmail] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in ..
        console.log(authUser)
        setUser(authUser)
      } else {
        // user has logged out.. 
        setUser(null)
      }
    })
  }, []);

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

    const signUp = (event) => {
      event.preventDefault()
      auth.createUserWithEmailAndPassword(email, password).catch((error)=> alert(error.message))
    }


  return (

    
    <div className="app">

    <Modal
        open={open}
        onClose={()=> setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signup">
          <center>        
              <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="header" />
          </center>
                <Input
                  placeholder="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                />
              
                <Input
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" onClick={signUp}>Sign Up</Button> 
          </form>
       </div>
       </Modal>


      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="header" />
      </div>

      <Button onClick={() => setOpen(true)}>Sign Up</Button>

      {
        posts.map(({id, post}) => (
          <Post key={id} userName={post.userName} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }

    
    </div>
  );
}

export default App;

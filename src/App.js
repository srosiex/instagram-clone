import React, {useState, useEffect} from 'react';
import './css/App.css';
import Post from './components/Post'
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core'
import ImageUpload from './components/ImageUpload';


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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in ..
        console.log(authUser)
        setUser(authUser)
      } else {
        // user has logged out.. 
        setUser(null)
      }
    })

    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  //useEffect runs a piece of code based ona specific condition
  //runs everytime the variable changes
  useEffect(() => {
    //this is where the code runs
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, [])


    const signUp = (event) => {
      event.preventDefault()
      auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
        authUser.user.updateProfile({
          displayName: username,
        })
      }).catch((error)=> alert(error.message))

      setOpen(false)

    }

    const signIn = (event) => {
      event.preventDefault()
      auth.signInWithEmailAndPassword(email, password).catch((error) => alert(error.message))
    
      setOpenSignIn(false)
    }


  return (
    
    <div className="app">
    <div className="signup-div">
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
                  required
                  onChange={(e) => setUsername(e.target.value)}
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
       </div>

       <Modal
        open={openSignIn}
        onClose={()=> setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app-signup">
          <center>        
              <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="header" />
          </center>
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
                <Button type="submit" onClick={signIn}>Log In</Button> 
          </form>
       </div>
       </Modal>


      <div className="app__header">
        <img className="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png" alt="header" />

        { user ? (
       <Button onClick={() => auth.signOut()}>Logout</Button>
 
    ): (
      <div className="login-container">
      <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
      <Button onClick={() => setOpen(true)}>Sign Up</Button> 
    </div>
    )}
      </div>


     <div className="app-posts">
     {
        posts.map(({id, post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
       </div> 



      { user?.displayName ? (
         <ImageUpload username={user.displayName} />

      ): (
        <h3>Please login to upload</h3>
      )}
    </div>
  );
}

export default App;

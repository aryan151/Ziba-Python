import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Navigation from './components/Navigation'; 

function App() { 
  const sessionUser = useSelector(state => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]); 

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {!sessionUser && (
        <Route exact path='/'>
          <Splash/>
        </Route> 
      )}

    {sessionUser && (  
      <>
        <Switch>
        <Navigation isLoaded={loaded} /> 
          <ProtectedRoute path='/posts/:postId' exact={true} >
            <h1>One Post</h1>  
          </ProtectedRoute> 
          <ProtectedRoute path='/users/:userId' exact={true} >
            <h1>One User Page</h1>  
          </ProtectedRoute>
          <ProtectedRoute path='/' exact={true} >
              <h1>Home Feed</h1>  
          </ProtectedRoute>
          <ProtectedRoute path='/Discover' exact={true} >
              <h1>Discover Feed</h1>
          </ProtectedRoute>
          <ProtectedRoute path='/Analytics' exact={true} >
              <h1>Analytics Feed</h1>    
          </ProtectedRoute>
        </Switch> 
      </>)}
      
    </BrowserRouter>
  );
}

export default App;

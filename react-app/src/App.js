import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Splash from './components/Splash'; 
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Navigation from './components/Navigation'; 
import Home from './components/Home';

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
        <Switch>
        <Route exact path='/'>
          <Splash/>
        </Route> 
          <ProtectedRoute path='/posts/:postId' exact={true} >
          <Navigation isLoaded={loaded} /> 
            <h1>One Post</h1>  
          </ProtectedRoute> 
          <ProtectedRoute path='/users/:userId' exact={true} >
          <Navigation isLoaded={loaded} /> 
            <h1>One User Page</h1>  
          </ProtectedRoute>
          <ProtectedRoute path='/Home' exact={true} >
          <Navigation isLoaded={loaded} /> 
              <Home/> 
          </ProtectedRoute>
          <ProtectedRoute path='/Discover' exact={true} >
          <Navigation isLoaded={loaded} /> 
              <h1>Discover Feed</h1>
          </ProtectedRoute>
          <ProtectedRoute path='/Messages' exact={true} >
          <Navigation isLoaded={loaded} /> 
              <h1>Direct Messages</h1>
          </ProtectedRoute>
          <ProtectedRoute path='/Analytics' exact={true} >
            <Navigation isLoaded={loaded} /> 
              <h1>Analytics Feed</h1>    
          </ProtectedRoute>
        </Switch> 

      
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import Splash from './components/Splash';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

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
      <Switch>
        <ProtectedRoute path='/posts/:postId' exact={true} >
            <NavBar/>
        </ProtectedRoute> 
        <ProtectedRoute path='/users/:userId' exact={true} >
            <NavBar/>
        </ProtectedRoute>
        <ProtectedRoute path='/Home' exact={true} >
            <NavBar/>
            <h1>Home Feed</h1>  
        </ProtectedRoute>
        <ProtectedRoute path='/Discover' exact={true} >
            <NavBar/>
            <h1>Discover Feed</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/Analytics' exact={true} >
            <NavBar/>
            <h1>Analytics Feed</h1>    
        </ProtectedRoute>
      </Switch>)}
    </BrowserRouter>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Splash from './components/Splash'; 
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Navigation from './components/Navigation'; 
import Home from './components/Home';
import PostPage from './components/PostPage';
import Discover from './components/Discover';
import Profile from './components/ProfilePage';
import SearchTags from './components/SearchTags';
import MainDM from './components/MessagesPage/MainDM';
import BackUp from './components/backtotop/BackUp' 
import EditProfileForm from './components/EditProfile/Edit'; 
import { InfinitySpin } from  'react-loader-spinner'




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
    return (
      <InfinitySpin color="grey" />
    );
  } 
  return (
  
    <BrowserRouter>
        <Switch>
        <Route exact path='/login'>
          <Splash/>
        </Route> 
          <ProtectedRoute path='/posts/:postId' exact={true} >
          <Navigation isLoaded={loaded} /> 
            <PostPage/> 
            <BackUp/> 
          </ProtectedRoute> 
          <ProtectedRoute path='/users/:userId' exact={true} >
          <Navigation isLoaded={loaded} /> 
            <Profile/> 
            <BackUp/> 
          </ProtectedRoute>
          <ProtectedRoute path='/Home' exact={true} >
          <Navigation isLoaded={loaded} /> 
              <Home/> 
              <BackUp/> 
          </ProtectedRoute>
          <ProtectedRoute path='/SearchTags/:tag' exact={true} > 
          <Navigation isLoaded={loaded} /> 
              <SearchTags/>  
              <BackUp/> 
          </ProtectedRoute>
          <ProtectedRoute path='/Discover' exact={true} >
          <Navigation isLoaded={loaded} /> 
              <Discover/> 
              <BackUp/> 
          </ProtectedRoute>
          <ProtectedRoute path='/Messages' exact={true} >
          <Navigation isLoaded={loaded} /> 
             <MainDM/> 
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId/edit_profile' exact={true} >
          <Navigation isLoaded={loaded} />  
          <EditProfileForm />
        </ProtectedRoute>
        </Switch> 

      
    </BrowserRouter>
  );
}

export default App;

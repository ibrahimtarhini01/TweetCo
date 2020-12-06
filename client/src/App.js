import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Redux
import { Provider } from 'react-redux';
import store from './store';

//Components Imports
import Header from './components/layout/Header';
import Timeline from './components/post/Timeline';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/profile/Profile';
import UserSearchList from './components/users/UserSearchList';
import UserProfile from './components/users/UserProfile';
import Followers from './components/profile/Followers';
import Following from './components/profile/Following';
import Comments from './components/post/comments/Comments';
import PrivateRoute from './components/routing/PrivateRoute';

import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <div className=' max-w-screen-md container overflow-hidden shadow-lg mx-auto'>
            <Switch>
              <PrivateRoute exact path='/' component={Timeline} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/home' component={Timeline} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/search' component={UserSearchList} />
              <PrivateRoute exact path='/user' component={UserProfile} />
              <PrivateRoute exact path='/followers' component={Followers} />
              <PrivateRoute exact path='/following' component={Following} />
              <PrivateRoute exact path='/comments' component={Comments} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

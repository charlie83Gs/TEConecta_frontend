import React from 'react';
import logo from './logo.svg';
import Login from './page/Login';
import NewsFeed from './page/NewsFeed';
import Menu from './page/Menu';
import AddEvent from './page/AddEvent';
import AddUser from './page/AddUser';
import AdminEvents from './page/AdminEvents';
import AdminUsers from './page/AdminUsers';
import EventHistory from './page/EventHistory';
import UserList from './page/UserList';
import ViewUser from './page/ViewUser';
import Participants from './page/Participants';
import ViewEvent from './page/ViewEvent';
import './App.css';
import ROUTES from './config/routes'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//router code recovered from 
//https://reacttraining.com/react-router/web/guides/quick-start

const App: React.FC = () => {
  
  
  return (
    <Router>
        <Switch>
          <Route path={ROUTES.LOGIN}>
            <Login />
          </Route>
          <Route path={ROUTES.MENU}>
            <Menu />
          </Route>
          <Route path={ROUTES.ADD_EVENT}>
            <AddEvent />
          </Route>
          <Route path={ROUTES.ADD_USER}>
            <AddUser />
          </Route>
          <Route path={ROUTES.ADMIN_EVENT}>
            <AdminEvents />
          </Route>
          <Route path={ROUTES.ADMIN_USER}>
            <AdminUsers />
          </Route>
          <Route path={ROUTES.EVENT_HISTORY}>
            <EventHistory />
          </Route>
          <Route path={ROUTES.LIST_USER}>
            <UserList />
          </Route>
          <Route path={ROUTES.VIEW_PARTICIPANTS}>
            <Participants />
          </Route>
          <Route path={ROUTES.VIEW_USER}>
            <ViewUser />
          </Route>
          <Route path={ROUTES.VIEW_EVENT} component={ViewEvent} />

          
          <Route path={ROUTES.NEWS_FEED}>
            <NewsFeed />
          </Route>
          
        </Switch>
    </Router>
  );

}

export default App;

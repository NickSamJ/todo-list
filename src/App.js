import React, { lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Alert from './components/Alert';
import Navigation from './components/Navbar';
import TOPMENU from './config/TOPMENU';
import AlertState from './context/alert/AlertState';
import FirebaseState from './context/firebase/FirebaseState';
import UserState from './context/User/UserState';
import ErrorPage from './pages/404';
import LogIn from './components/Authorisation/LogIn';
import SignUp from './components/Authorisation/SignUp';
import ResetPassword from './components/Authorisation/ResetPassword';
import {
  PostList,
  PostShow,
  PostCreate,
  PostEdit,
} from './service/PostService';
import {
  CategoryList,
  CategoryShow,
  CategoryCreate,
  CategoryEdit,
} from './service/CategoryService';
import {
  PollList,
  PollShow,
  PollCreate,
  PollEdit,
} from './service/PollService';

// import { CommentList, CommentShow, CommentCreate, CommentEdit } from "./service/CommentsService";
import { Admin, Resource, EditGuesser } from 'react-admin';
import {
  FirebaseDataProvider,
  FirebaseAuthProvider,
} from 'react-admin-firebase';
import { MdModeComment } from 'react-icons/md';
import { FaLanguage } from 'react-icons/fa';
import { MdContentPaste } from 'react-icons/md';
import { MdPoll } from 'react-icons/md';

import { firebaseConfig as config } from './firebase';
import {
  LanguageList,
  LanguageCreate,
  LanguageEdit,
  WordCreate,
  WordList,
  WordEdit,
} from './service/DIctionaryService';
import WeatherApp from './components/Portfolio/WeatherApp/WeatherApp';

const App = () => {
  const topMenuLinks = TOPMENU.map((menuItem) => {
    return (
      <Route
        key={menuItem.path}
        path={menuItem.path}
        exact={menuItem.exact}
        component={menuItem.component}
      />
    );
  });

  const options = {
    // rootRef: ''
  };
  const dataProvider = FirebaseDataProvider(config, options);
  const authProvider = FirebaseAuthProvider(config, options);

  const admminPage = (
    <>
      <Admin dataProvider={dataProvider} authProvider={authProvider}>
        <Resource
          name='posts'
          list={PostList}
          show={PostShow}
          icon={MdModeComment}
          create={PostCreate}
          edit={PostEdit}
        />

        <Resource
          name='categories'
          list={CategoryList}
          show={CategoryShow}
          icon={MdContentPaste}
          create={CategoryCreate}
          edit={CategoryEdit}
        />

        {/*  Dictionary Languages */}
        <Resource
          name='languages'
          list={LanguageList}
          show={PostShow}
          icon={FaLanguage}
          create={LanguageCreate}
          edit={LanguageEdit}
        />

        {/* Dictionary words */}
        <Resource
          name='words'
          list={WordList}
          // show={PostShow}
          // icon={FaLanguage}
          create={WordCreate}
          edit={WordEdit}
          // edit={EditGuesser}
        />

        {/* polls */}
        <Resource
          name='polls'
          list={PollList}
          show={PollShow}
          icon={MdPoll}
          create={PollCreate}
          edit={PollEdit}
          //   edit={EditGuesser}
        />
      </Admin>
    </>
  );

  return (
    <FirebaseState>
      <UserState>
        <AlertState>
          <BrowserRouter>
            <Navigation />
            <div
              className='container-fluid'
              style={{ padding: 0, position: 'relative' }}
            >
              <Alert />
              <Switch>
                <Route path='/react-admin' exact render={() => admminPage} />
                {/* <Route path='/weather' exact component={WeatherApp} /> */}

                {topMenuLinks}
                <Route path='/login' exact component={LogIn} />
                <Route path='/signup' exact component={SignUp} />
                <Route path='/reset-password' exact component={ResetPassword} />
                <Route component={ErrorPage} />
              </Switch>
            </div>
          </BrowserRouter>
        </AlertState>
      </UserState>
    </FirebaseState>
  );
};

export default App;

import React from 'react';
import Home from './Home';
import Signin from './SignIn';
import SignUp from './SignUp';
import ForgotPwd from './ForgotPassword';
import PersonalForm from './PersonalForm';
import SelectTemplate from './SelectTemplate';
import EduForm from './EduForm';
import JobExpForm from './JobExpForm';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/forgotPwd">
            <ForgotPwd />
          </Route>
          <Route path="/selectTemplate">
            <SelectTemplate />
          </Route>
          <Route path="/personalForm">
            <PersonalForm />
          </Route>
          <Route path="/edu">
            <EduForm />
          </Route>
          <Route path="/job">
            <JobExpForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

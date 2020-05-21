import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import { TextField, Link } from '@material-ui/core';
import {
  withRouter
} from 'react-router-dom';

const jwt = require('jsonwebtoken');

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [infoState, setInfoState] = React.useState({});

  const validate = (values) => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleTextChange = e => {
    setInfoState({
      ...infoState,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    setSent(true);
    e.preventDefault();
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    if (!Array.isArray(accounts)) {
      accounts = [];
    }
    const checks = accounts.filter( acc => acc.email === infoState.email);
    if (checks.length > 0) {
      alert('You have already have an account!');
      setSent(false);
    } else {
      accounts.push(infoState);
      localStorage.setItem("accounts", JSON.stringify(accounts));
      const token = jwt.sign(infoState, 'cveator');
      localStorage.setItem("authToken", token);
      props.history.goBack();
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link href="/signin" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} subscription={{ submitting: true }} validate={validate}>
          {({ submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <TextField
                autoComplete="email"
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                onChange={handleTextChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                required
                disabled={submitting || sent}
                label={'Password'}
                name='password'
                margin="normal"
                onChange={handleTextChange}
                type="password"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRouter(withRoot(SignUp));

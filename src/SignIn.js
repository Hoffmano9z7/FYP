import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import { TextField } from '@material-ui/core';
import {
  withRouter
} from 'react-router-dom';

var jwt = require('jsonwebtoken');

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

function SignIn(props) {
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
    e.preventDefault();
    setSent(true);
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    if (!Array.isArray(accounts)) {
      accounts = [];
    }
    const checks = accounts.filter( acc => acc.email == infoState.email);
    
    if (checks.length > 0) {
      const token = jwt.sign(infoState, 'cveator');
      localStorage.setItem("authToken", token);
      console.log(infoState);
      e.preventDefault();
      props.history.push('/manageCV');
    } else {
      alert('Invalid email or password!');
      setSent(false);
    }
    return false;
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign In
          </Typography>
          <Typography variant="body2" align="center">
            {'Not a member yet? '}
            <Link href="/signup/" align="center" underline="always">
              Sign Up here
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign In'}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link underline="always" href="/forgotPwd/">
            Forgot password?
          </Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRouter(withRoot(SignIn));

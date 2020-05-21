import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, FormControlLabel, Checkbox, FormControl, FormGroup, TextField, Grid } from '@material-ui/core';
import { Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
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
  formControl: {
    margin: theme.spacing(3),
    display: 'flex',
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [sent, setSent] = React.useState(false);
  const [infoState, setInfoState] = React.useState({
    isAgreeTerm: true,
    isViewPrivacy: true,
  });

  const validate = (values) => {
    const errors = required(['firstName', 'lastName', 'email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const handleCheckBoxChange = e => {
    setInfoState({
      ...infoState,
      [e.target.name]: e.target.checked,
    });
  }

  const handleTextChange = e => {
    setInfoState({
      ...infoState,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = e => {
    setSent(true);
    e.preventDefault();
    console.log(infoState)
    localStorage.setItem("confirmInfo", JSON.stringify(infoState));
    if (!infoState.isReceiveEmail) {
      const personalInfo = JSON.stringify(localStorage.getItem("personalInfo"));
      const { email } = personalInfo;
      let accounts = JSON.parse(localStorage.getItem('accounts'));
      if (!Array.isArray(accounts)) {
        accounts = [];
      }
      const checks = accounts.filter( acc => acc.email === email);
      if (checks.length > 0) {
        alert('You have already have an account!');
        setSent(false);
        return false;
      } else {
        accounts.push(infoState);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        const token = jwt.sign(infoState, 'cveator');
        localStorage.setItem("authToken", token);
      }
    }
    //TODO: hoffman - generate pdf
    props.history.push('/manageCV');
    return false;
  };

  const saveNewCsData = () => {
    const personalInfo = JSON.stringify(localStorage.getItem("personalInfo"));
    const jobInfo = JSON.stringify(localStorage.getItem("jobInfo"));
    const eduInfo = JSON.stringify(localStorage.getItem("eduInfo"));
    const extraInfo = JSON.stringify(localStorage.getItem("extraInfo"));
    const cv = {
      personalInfo,
      jobInfo,
      eduInfo,
      extraInfo,
    }
    const list = JSON.parse(localStorage.getItem("cvs")) || [];
    list.push(cv);
    localStorage.setItem('cvs', JSON.stringify(list));
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Confirmation
          </Typography>
          <Typography variant="body1" align="center">
            For further process, you are required to agree with the use of terms or sign up.
          </Typography>
          <br />
          <Typography variant="body2" align="center">
            <Link href="/signin" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form onSubmit={handleSubmit} validate={validate}>
          {({ submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={infoState.isReceiveEmail}
                        onChange={handleCheckBoxChange}
                        name="isReceiveEmail"
                        color="primary"
                      />
                    }
                    label="I agree to receive job advertising email."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={infoState.isAgreeTerm}
                        onChange={handleCheckBoxChange}
                        name="isAgreeTerm"
                        color="primary"
                      />
                    }
                    label="I agree the personal information use."
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={infoState.isViewPrivacy}
                        onChange={handleCheckBoxChange}
                        name="isViewPrivacy"
                        color="primary"
                      />
                    }
                    label="I have viewed the terms of privacy."
                  />
                </FormGroup>
              </FormControl>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="body2" align="center">
                    <Link href="/terms/" target="_blank">Terms</Link>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" align="center">
                    <Link href="/privacy/" target="_blank">Privacy</Link>
                  </Typography>
                </Grid>
              </Grid>
              <br />
              {
                !infoState.isReceiveEmail && (
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
                )
              }
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
                disabled={submitting || sent || !infoState.isAgreeTerm || !infoState.isViewPrivacy}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : (!infoState.isReceiveEmail  ? 'Sign Up' : 'Next')}
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

import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, { useState } from 'react';
import { Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import TextField from '@material-ui/core/TextField'
import {
  withRouter
} from 'react-router-dom';

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

function PersonalForm(props) {
  const classes = useStyles();
  const [infoState, setInfoState] = useState({});

  const [sent, setSent] = React.useState(false);

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

  const handleChange = e => {
    setInfoState({
      ...infoState,
      [e.target.name]: e.target.value
    });
  }
  
  const handleSubmit = () => {
    setSent(true);
    console.log(infoState)
    localStorage.setItem("personalInfo", JSON.stringify(infoState));
    props.history.push('/edu');
    return false;
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <Typography variant="h4" gutterBottom marked="center" align="center">
          Personal Information
        </Typography>
        <Form onSubmit={handleSubmit} validate={validate}>
          {({ submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                fullWidth
                disabled={submitting || sent}
                label="Email"
                name="email"
                margin="normal"
                required
                value={infoState['email']}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                disabled={submitting || sent}
                required
                name="firstName"
                label="First name"
                margin="normal"
                value={infoState['firstName']}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                disabled={submitting || sent}
                required
                name="lastName"
                label="Last name"
                margin="normal"
                value={infoState['lastName']}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                disabled={submitting || sent}
                required
                name="country"
                label="Country"
                margin="normal"
                value={infoState['country']}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                disabled={submitting || sent}
                required
                name="mobilePhone"
                label="Mobile Phone"
                margin="normal"
                value={infoState['mobilePhone']}
                onChange={handleChange}
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
                {submitting || sent ? 'In progress…' : 'Next'}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRouter(withRoot(PersonalForm));

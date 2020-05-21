import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, { useState, useEffect } from 'react';
import { Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
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

function JobExpForm(props) {
  const classes = useStyles();
  const [infoState, setInfoState] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [jobsSeq, setJobsSeq] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobInfo")) || [];
    setJobsSeq(jobs.length + 1);
  });

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

  const handleCheckBoxChange = e => {
    setInfoState({
      ...infoState,
      [e.target.name]: e.target.checked,
    });
  }

  const handleDateChange = (name, date) => {
    setInfoState({
      ...infoState,
      [name]: date,
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
    let jobs = JSON.parse(localStorage.getItem("jobInfo")) || [];
    jobs.push(infoState);
    console.log(jobs);
    localStorage.setItem("jobInfo", JSON.stringify(jobs));
    if (infoState.isLastJob) {
      props.history.push('/eduForm');
    } else {
      window.location.reload(false); 
    }
    e.preventDefault();
    return false;
  };

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <AppAppBar />
      <AppForm>
        <Typography variant="h4" gutterBottom marked="center" align="center">
          Job Experience
        </Typography>
        <Typography variant="body2" align="center">
          {`Your ${jobsSeq} ${jobsSeq === 1 ? 'st' : (jobsSeq === 2 ? 'nd' : (jobsSeq === 3 ? 'rd' : 'th'))} job`}
        </Typography>
        <Form onSubmit={handleSubmit} validate={validate}>
          {({ submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                fullWidth
                disabled={submitting || sent}
                label="Employer"
                name="employer"
                margin="normal"
                required
                onChange={handleTextChange}
              />
              <TextField
                fullWidth
                disabled={submitting || sent}
                required
                name="title"
                label="Job Title"
                margin="normal"
                onChange={handleTextChange}
              />
              <KeyboardDatePicker
                fullWidth
                required
                format="MM/dd/yyyy"
                margin="normal"
                name="jobStartDate"
                label="Start Date"
                disabled={submitting || sent}
                value={infoState['jobStartDate']}
                onChange={(date) => handleDateChange('jobStartDate' , date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <KeyboardDatePicker
                fullWidth
                disabled={submitting || sent}
                required
                format="MM/dd/yyyy"
                name="jobEndDate"
                label="End Date"
                margin="normal"
                value={infoState['jobEndDate']}
                onChange={(date) => handleDateChange('jobEndDate' , date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <TextField
                fullWidth
                disabled={submitting || sent}
                name="jobDesc"
                label="Job Description"
                margin="normal"
                multiline
                rowsMax={6}
                onChange={handleTextChange}
              />
              <br />
              <br />
              <FormControlLabel
                control={
                  <Checkbox
                    value={infoState['isLastJob']}
                    onChange={handleCheckBoxChange}
                    name="isLastJob"
                    color="primary"
                  />
                }
                label="This is your last/ current job"
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
      </MuiPickersUtilsProvider>
    </React.Fragment>
  );
}

export default withRouter(withRoot(JobExpForm));

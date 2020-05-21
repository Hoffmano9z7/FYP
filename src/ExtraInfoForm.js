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
import { TextField, Grid, IconButton  } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
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
  icon: {
    marginTop: theme.spacing(3),
  },
  input: {
    marginRight: theme.spacing(3),
  }
}));

function EduForm(props) {
  const classes = useStyles();
  const [infoState, setInfoState] = useState([
    {
      key: '',
      value: '',
    }
  ]);
  const [sent, setSent] = useState(false);

  // useEffect(() => {

  // });

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
    const i = e.target.name.replace('info', '').replace('input', '');
    let newInfoState = infoState.map( (info, index) => {
      if (index === parseInt(i)) {
        let newInfo = {};
        if (e.target.name.indexOf('info') >= 0) {
          newInfo = {
            ...info,
            key: e.target.value,
          } 
        } else if (e.target.name.indexOf('input') >= 0) {
          newInfo = {
            ...info,
            value: e.target.value,
          }
        }
        return newInfo;
      }
      return info;
    });
    setInfoState(newInfoState);
  }

  const addRow = () => {
    setInfoState([
      ...infoState,
      {
        key: '',
        value: '',
      }
    ]);
  }

  const delRow = (i) => {   
    const newState = infoState.filter((item, index) => index !== i)
    console.log(newState)
    setInfoState(newState);
  }
  
  const handleSubmit = e => {
    setSent(true);
    console.log(infoState);
    localStorage.setItem("extraInfo", JSON.stringify(infoState));
    props.history.push('/confirm');
    e.preventDefault();
    return false;
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm size="md">
        <Typography variant="h4" gutterBottom marked="center" align="center">
          Additional Information
        </Typography>
        <Typography variant="body2" align="center">
          {'e.g. skills, language...'}
        </Typography>
        <Form onSubmit={handleSubmit} validate={validate}>
          {({ submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Grid container alignItems="center" >
                { infoState.map( (info, index) => (
                  <Grid container item xs={12} alignItems="center" spacing={1} key={`extraInfoRow${index}`}>
                    <Grid item xs={2} md={1}>
                      <IconButton aria-label="delete" className={classes.icon} onClick={ () => delRow(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={10} md={5}>
                      <TextField
                        fullWidth
                        disabled={submitting || sent}
                        label={'Extra Info: ' + (index + 1)}
                        name={'info' + index}
                        margin="normal"
                        value={info.key}
                        onChange={handleTextChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        disabled={submitting || sent}
                        name={'input' + index}
                        label={'Input: ' + (index + 1)}
                        margin="normal"
                        value={info.value}
                        onChange={handleTextChange}
                      />
                    </Grid>
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <IconButton aria-label="add" className={classes.icon} onClick={addRow}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </Grid>
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

export default withRouter(withRoot(EduForm));

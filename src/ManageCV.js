import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  withRouter
} from 'react-router-dom';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import CvContainer from './modules/views/CvContainer';

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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    //0.707182320441989
    minHeight: 600,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  templatesrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const [cvs, setCvs] = useState([]);
  
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("cvs")) || [];
    setCvs(list);
  }, []);

  return (
    <React.Fragment>
      <AppAppBar />
      <Container maxWidth="lg">
        <br />
        <br />
        <br />
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Existing Resume
            </Typography>
            <Typography variant="body2" align="center">
              {'You might change your template afterwards.'}
            </Typography>
          </Grid>
          <Grid container item xs={12} justify="center"spacing={3} >
            <Grid item xs={12} md={4}>
              <CvContainer template='Classic' date='27/04/2020' url='https://us-central1-firebase-215913.cloudfunctions.net/downloadCV?docType=pdf' />
            </Grid>
            {cvs.map((cv, index) => (
              <Grid item xs={12} md={4} key={`cvs${index}`}>
                <CvContainer template={cv.selectedTemplate} date='21/05/2020' data={cv}/>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
      <br />
      <br />
      <br />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRouter(withRoot(SignIn));

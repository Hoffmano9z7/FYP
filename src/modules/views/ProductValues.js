import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../components/Typography';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import BuildRoundedIcon from '@material-ui/icons/BuildRounded';
import TranslateIcon from '@material-ui/icons/Translate';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.secondary.light,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
});

function ProductValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <img
          src="/static/themes/cveator/productCurvyLines.png"
          className={classes.curvyLines}
          alt="curvy lines"
        />
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <TranslateIcon fontSize="large" />
              <Typography variant="h6" className={classes.title}>
                No word processor needed
              </Typography>
              <Typography variant="h5">
                {'Using CVeator requires no word processor software, '}
                {'it\'s free and easy to be used.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <BuildRoundedIcon fontSize="large" />
              <Typography variant="h6" className={classes.title}>
                Hundreds of template ready
              </Typography>
              <Typography variant="h5">
                {'CVeator provides different style of template for you, '}
                {'you can make your favourite without designing skills.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <WorkOutlineIcon fontSize="large" />
              <Typography variant="h6" className={classes.title}>
                Exclusive job suggestion
              </Typography>
              <Typography variant="h5">
                {'By using CVeator, system provides personal job matching, '}
                {'jobs in all industry could be found without difficulty.'}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);

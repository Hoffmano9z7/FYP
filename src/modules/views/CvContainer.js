import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.blank,
    margin: theme.spacing(3),
  },
}));

function SimpleCard(props) {
  const classes = useStyles();
  const { template, date, url, data} = props;
//   const { 
//             personalInfo, 
//             jobInfo, 
//             eduInfo, 
//             extraInfo, 
//         } = data;

  return (
    <Card className={classes.root}>
        <br />
        <br />
      <CardContent>
        <Typography variant="h5" component="h2">
            {`Template: ${template}`}
        </Typography>
        <br />
        <Typography className={classes.pos} color="textSecondary">
            {`Generated Date: ${date}`}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            {`Format: pdf`}
        </Typography>
      </CardContent>
      <CardActions>
        {!!url ? (
            <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
                href={url}
                target='_blank'
            >
                {'Download'}
            </Link>
        ) :(
            <Link
                color="inherit"
                variant="h6"
                underline="none"
                className={classes.rightLink}
                href={url}
                >
                {'Download'}
            </Link>
        )} 
        
      </CardActions>
    </Card>
  );
}

export default (SimpleCard)
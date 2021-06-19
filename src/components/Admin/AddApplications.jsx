import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import { TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { doGetApplications } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function AddApplications(props) {
  const { applicationsData } = useSelector(
    (state) => state.admin
);

  
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
    useEffect(() => {
        // if(gridData?.payload?.response.status !== 200){
        //   console.log("sds");
        //   Logout(history)
        //       }
        if (applicationsData.length === 0) {
            dispatch(doGetApplications());

        }
    }, [dispatch, applicationsData])

   

  return (
    <div
    role="tabpanel"
    hidden={value !== index}
    id={`vertical-tabpanel-${index}`}
    aria-labelledby={`vertical-tab-${index}`}
    {...other}
    style ={{marginLeft: "10%", marginTop: "4%", width: "50%"}}
  >
      
        <Grid style = {{width:"100%"}}>
        <TextField id="outlined-basic" label="New Application" variant="outlined" />
        <Button variant="contained" color="primary" style ={{marginLeft: "4%"}}>
  Add Application
</Button>
          <Typography variant="h6" className={classes.title}>
            Applications
          </Typography>
          <div className={classes.demo}>
            <List >
              { applicationsData.map((value) => 
                <ListItem>
                  <ListItemText
                    primary= {value.applicationName}
                   
                  />
                </ListItem>,
              )}
            </List>
          </div>
        </Grid>
        
    </div>
      );
}
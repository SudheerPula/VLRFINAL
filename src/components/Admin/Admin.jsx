import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserManagement from './UserManagement';
import AddApplications from './AddApplications';
import AddRoles from './AddRoles';
import AddCustomers from './AddCustomers';

function Admin(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

Admin.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 500,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="User Management" {...a11yProps(0)} />
        <Tab label="Applications" {...a11yProps(1)} />
        <Tab label="Roles" {...a11yProps(2)} />
        <Tab label="Customers" {...a11yProps(3)} />
        <Tab label="Application-Role" {...a11yProps(4)} />
        
      </Tabs>
      <UserManagement value={value} index={0}>
       User Management under way......
      </UserManagement>
      <AddApplications  value={value} index={1}/>
      <AddRoles value={value} index={2}/>
      <AddCustomers value={value} index={3}/>
      <Admin value={value} index={4}>
        Applications-Role under construction.....
      </Admin>
      
    </div>
  );
}
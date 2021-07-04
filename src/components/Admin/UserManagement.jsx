import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { useDispatch, useSelector } from "react-redux";
import { doGetAllUsers, doUpdateUser } from "../../redux/actions/admin";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';



function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'userName', numeric: false, disablePadding: true, label: 'User Name' },
  { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'roles', numeric: true, disablePadding: false, label: 'Roles' },
  //{id: 'customers', numeric: true, disablePadding: false, label: 'Customers'},
  { id: 'action', numeric: true, disablePadding: false, label: 'Action' }

];

function EnhancedTableHead(props) {
  // const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            style={{color : '#fff'}}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Users List
        </Typography>
      )}

      
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
     
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function UserManagement(props) {
  const initialUserState = {
    "userName": null,
    "email": null,
    "userId": null,
    "admin": false,
    "status": false,
    "roles": [],
    "customers": []
  };
  const [rows, setRows] = React.useState([]);
  const [user, setUser] = React.useState(initialUserState);
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { userData, reloadUserData } = useSelector(
    (state) => state.admin
  );

  const dispatch = useDispatch();
  useEffect(() => {
    // if(gridData?.payload?.response.status !== 200){
    //   console.log("sds");
    //   Logout(history)
    //       }
    if (userData.users.length === 0 || reloadUserData) {
      dispatch(doGetAllUsers({reloadUserData : reloadUserData})).then(() => setRows([]));
    }
  }, [dispatch, userData, rows, reloadUserData])

  if (rows.length === 0 && userData.users.length > 0) {
    setRows(userData.users);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.userName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editUser = (editUserData) => {
    setUser(editUserData);
  }

  const handleClose = () => {
    setUser(initialUserState);
  };

  const handleSubmit = () => {
    
      dispatch(doUpdateUser({user}));
    
  }

  const handleChangeRoles = (event) => {
    let data = { ...user };
    const {options} = event.target;
    const roles = []
    for(let i=0; i < options.length; i++) {
      if(options[i].selected) {
        roles.push(userData.roles.find(role => role.roleName === options[i].value));
      }
    }
    data["roles"] = roles;
    setUser(data);
  }

  const handleChangeCustomers = (event) => {
    const data = { ...user };
    const {options} = event.target;
    const customers = []
    for(let i=0; i < options.length; i++) {
      if(options[i].selected) {
        customers.push(userData.customers.find(customer => customer.customerName === options[i].value));
      }
    }
    data["customers"] = customers;
    setUser(data);
  }

  const handleChangeStatus = (event) => {
    const data = { ...user };
    data["status"] = event.target.value;
    setUser(data);
  }


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ marginLeft: "5%" }}
    >
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer style={{ maxHeight: "350px" }}>
          <Table stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'small'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover role="checkbox" tabIndex={-1}
                    >

                      <TableCell id={labelId} scope="row" padding="none">
                        {row.userName}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.status ? "Y" : "N"}</TableCell>
                      <TableCell align="left">{row.roles !== undefined && row.roles.length > 0 ? row.roles.filter(role => role.status === true).map(role => role.roleName).join() : ""}</TableCell>
                      {/* <TableCell align="left">{row.customers !== undefined && row.customers.length > 0 ? row.customers.map(customer => customer.customerName).join() : ""}</TableCell> */}
                      <TableCell align="left"><Button onClick={() => editUser(row)}> Edit </Button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (33) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        
        open={user.userId !== null}
        onClose={handleClose}
        
      >
        <DialogTitle id="scroll-dialog-title" style={{backgroundColor: "#283db1", color: "#fff"}}>Edit User</DialogTitle>
        <DialogContent>
        <Table 
            aria-labelledby="tableTitle"
            
            aria-label="enhanced table"
          >
            <TableRow style={{background : "white"}}><TableCell> User Name</TableCell>
            <TableCell>{user !== null ? user.userName : ""}</TableCell>
            </TableRow>
            <TableRow style={{background : "white"}}><TableCell> Email</TableCell>
            <TableCell>{user !== null ? user.email : ""}</TableCell>
            </TableRow>
            <TableRow style={{background : "white"}}><TableCell> Status</TableCell>
            <TableCell>
            <NativeSelect
             onChange={handleChangeStatus}
          defaultValue={user !== null && user.status? user.status : false }
          inputProps={{
            name: 'name',
            id: 'uncontrolled-native',
          }}
        >
          <option value={true}>Active</option>
          <option value={false}>InActive</option>
          
        </NativeSelect>

            </TableCell>
            </TableRow >
            <TableRow  style={{background : "white"}}>
              <TableCell>Roles</TableCell>
              <TableCell>
              <Select
          multiple
          native
          value={user!== null ? user.roles.map((role) => role.roleName) : ""}
          onChange={handleChangeRoles}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {userData != null ? userData.roles.map((role) => (
            <option key={role.roleName} value={role.roleName}>
              {role.roleName}
            </option>
          )): ""}
        </Select>

              </TableCell>

            </TableRow>

            <TableRow  style={{background : "white"}}>
              <TableCell>Customers</TableCell>
              <TableCell>
              <Select
          multiple
          native
          value={user!== null && user.customers !== undefined ? user.customers.map((customer) => customer.customerName) : ""}
          onChange={handleChangeCustomers}
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {userData != null ? userData.customers.map((customer) => (
            <option key={customer.customerName} value={customer.customerName}>
              {customer.customerName}
            </option>
          )): ""}
        </Select>

              </TableCell>

            </TableRow>

            </Table>




        </DialogContent>
        <DialogActions>
        <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>

        </Dialog>


    </div>
  );
}

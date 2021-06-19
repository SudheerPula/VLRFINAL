import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField, Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TablePagination } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { doAddCustomer, doGetCustomers } from '../../redux/actions';

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
  container: {
    maxHeight: 250,
    
   
  },
}));


export default function AddCustomers(props) {
  const { customersData } = useSelector(
    (state) => state.admin
  );

  const columns = [
    { id: 'customerId', label: 'Customer Id', minWidth: 80 },
    { id: 'customerName', label: 'Customer Name', minWidth: 80 },
    { id: 'description', label: 'Description', minWidth: 80 },
    { id: 'status', label: 'Status', minWidth: 50 },
  ];


  const { children, value, index, ...other } = props;
  const [page, setPage] = React.useState(0);
  const [customerName, setCustomerName] = React.useState(null);
  const [customerId, setCustomerId] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCustomerChange = (event) => {
    setCustomerName(event.target.value);
  }

  const handleCustomerIdChange = (event) => {
    setCustomerId(event.target.value);
  }

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }


  const addCustomer = () => {
    dispatch(doAddCustomer({customerId, customerName, description}));
  }
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {

    if (customersData.length === 0) {
      dispatch(doGetCustomers());

    }
  }, [dispatch, customersData])


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ marginLeft: "10%", marginTop: "4%", width: "50%" }}
    >


      <TextField id="outlined-cutomer-name" label="Customer Name" variant="outlined" onChange={handleCustomerChange} />
      <TextField id="outlined-customer-id" label="Customer Id" variant="outlined" onChange={handleCustomerIdChange} />
      <TextField id="outlined-description" label="Description" variant="outlined" onChange={handleDescriptionChange} />
      <Button variant="contained" color="primary" style={{ marginLeft: "4%" }} onClick={addCustomer}>
        Add Customer
      </Button>
      <Typography variant="h6" className={classes.title}>
        Customers
      </Typography>
      <div className={classes.demo}>
        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {customersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {typeof value === 'boolean' ? value ? 'Y' : 'N' : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={customersData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          style={{ paddingRight: "26%" }}
        />

      </div>
    </div>
  );
}
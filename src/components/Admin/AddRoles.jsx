import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TextField, Button, TableContainer, Table, TableBody, TableHead, TableRow, TableCell, TablePagination } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { doAddRole, doGetRoles } from '../../redux/actions';

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
    maxWidth: 550,
    paddingLeft: "20%"
  },
}));


export default function AddRoles(props) {
  const { rolesData } = useSelector(
    (state) => state.admin
  );

  const columns = [
    { id: 'roleName', label: 'Role Name', minWidth: 80 },
    { id: 'status', label: 'Status', minWidth: 50 },
  ];


  const { children, value, index, ...other } = props;
  const [page, setPage] = React.useState(0);
  const [role, setRole] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  }
  const addRole = () => {
    dispatch(doAddRole({ role }));
  }
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {

    if (rolesData.length === 0) {
      dispatch(doGetRoles());

    }
  }, [dispatch, rolesData])


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ marginLeft: "10%", marginTop: "4%", width: "50%" }}
    >


      <TextField id="outlined-basic" label="New Roles" variant="outlined" onChange={handleRoleChange} />
      <Button variant="contained" color="primary" style={{ marginLeft: "4%" }} onClick={addRole}>
        Add Roles
      </Button>
      <Typography variant="h6" className={classes.title}>
        Roles
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
              {rolesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
          count={rolesData.length}
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
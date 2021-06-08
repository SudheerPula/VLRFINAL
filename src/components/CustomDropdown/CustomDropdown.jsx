import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(() => ({
  formControl: {
    width: 200,
    maxWidth: 300,
    bottom: 10,
    marginLeft: 10
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CustomDropdown = ({ customers, customerId, onCustomerChange }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [customer, setCustomer] = React.useState(customerId);

  const handleChange = (event) => {
    setCustomer(event.target.value);
    onCustomerChange(event.target.value);
  };


  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Select Customer</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={customer}
        onChange={handleChange}
        label="Select Customer"
      >
        {customers.map((customerItem) => (
          <MenuItem
            key={customerItem.customerId}
            value={customerItem.customerId}
            style={getStyles(customerItem.customerName, customer, theme)}
          >
            {customerItem.customerName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropdown;

import { RotateLeft } from "@material-ui/icons";
import { axios } from "../../config/config";
import { path } from "../path";

export function getAdminUserData() {
    //Add Token Functionality Here doubt
    return axios.get(path.AUSER).then((response) => {
      return response.data;
    });
  }

  export function addRole(role) {
    //Add Token Functionality Here doubt
    return axios.post(path.ADDROLE, {"roleName": role}).then((response) => {
      return response.data;
    });
  }

  export function addApplication(applicationName, roles) {
    //Add Token Functionality Here doubt
    return axios.post(path.ADDAPPLICATION, {"applicationName": applicationName, "roles": roles})
    .then((response) => {
      return response.data;
    });
  }

  export function getApplications() {
    //Add Token Functionality Here doubt
    return axios.get(path.GETAPPLICATIONS).then((response) => {
      return response.data;
    });
  }

  export function getRoles() {
    //Add Token Functionality Here doubt
    return axios.get(path.GETROLES).then((response) => {
      return response.data;
    });
  }

  export function getCustomers() {
    //Add Token Functionality Here doubt
    return axios.get(path.GETCUSTOMERS).then((response) => {
      return response.data;
    });
  }

  export function addCustomer(customerId, customerName, description) {
    //Add Token Functionality Here doubt
    return axios.post(path.ADDCUSTOMER, {"customerId": customerId, "customerName": customerName, "description":description}).then((response) => {
      return response.data;
    });
  }

  
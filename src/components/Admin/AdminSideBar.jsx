import React from "react";
import "./Adminpanel.css";
//import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ListBox from 'react-listbox';
import 'react-listbox/dist/react-listbox.css';

function AdminSideBar() { 
  
  return (
    <>
         <div className="container" style={{ height: 'Auto' }}>
                  <table width="100%" style={{ border: '1px #000 solid' }}>
                    <tbody>
                      <tr>
                        <td colspan="2" style={{ textAlign: 'center', fontFamily: 'Gill Sans' }}><h3> Administrator </h3></td>
                      </tr>
                      <tr>
                        <td width="25%" style={{ verticalAlign: 'top' }}><table width="100%" style={{ backgroundColor:'#f1f1f1'}} className="tback">
                        <tbody>
                            <tr>
                              <td><Link to="/UserManagement" className="btn btn-info" >User Management</Link></td>
                            </tr>
                            <tr>
                              <td><Link to="/AddApplications" className="btn btn-info" >Add Applications</Link></td>
                            </tr>
                            <tr>
                              <td><Link to="/AddRoles" className="btn btn-info" >Add Roles</Link></td>
                            </tr>
                            
                            <tr>
                              <td><Link to="/AddCustomers" className="btn btn-info" >Add Customers</Link></td>
                            </tr>
                            <tr>
                              <td><Link to="/RolesApplications" className="btn btn-info" >Roles-Applicaitons</Link></td>
                            </tr>
                            <tr>
                            </tr>
                          </tbody>
                        </table></td>
                        <td width="75%" style={{ verticalAlign: 'top' }}> 
                 </td>
                      </tr>
                    </tbody>
                  </table>


                </div>


    </>
  );
}

export default AdminSideBar;
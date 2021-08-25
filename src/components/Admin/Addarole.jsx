import React from "react";
import "./Adminpanel.css";
import { useEffect, useState } from "react";
import ListBox from 'react-listbox';
import { Link, withRouter } from "react-router-dom";
import 'react-listbox/dist/react-listbox.css';

function Addarole() {
  
  const [selectedList, setSelectedList] = useState([]);
  const [selectList, setSelectList] = useState([]);
 
  const handleChange = e => {
    let { options } = e.target;
    options = Array.apply(null, options)
    const selectedValues = options.filter(x => x.selected).map(x => x.value);
    setSelectedList(selectedValues);
  }
  
  const handleChangeCust = e => {
    let { options } = e.target;
    options = Array.apply(null, options)
    const selectValues = options.filter(y => y.selected).map(y => y.value);
    setSelectList(selectValues);
  }


  return (
    <>
      <div className="jumbotron">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="row" >

                <br />
                <div className="container" style={{ height: 'auto' }}>
                  <table width="100%" style={{ border: '1px #000 solid' }}>
                    <tbody>
                      <tr>
                        <td colspan="2" style={{ textAlign: 'center', fontFamily: 'Gill Sans' }}><h3>Edit Users</h3></td>
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
                  <table width="100%" class="tback">
                    <tbody>
                      <tr>

                        <td className="leftalign">User name</td>
                        <td className="leftalign">Prakash</td>
                        <td></td></tr>
                      <tr>
                        <td className="leftalign">Email</td>
                        <td className="leftalign">yvprakash@gmail.com</td></tr>
                      <tr className="headerRowColor"> 
                      <td className="leftalign">Active</td>
                        <td className="leftalign">          <select name="status" id="dropdownstatus" className="form-control">
                            <option value="25">Yes</option>
                            <option value="26">No </option>
                            
                           
                          </select></td>
                        <td></td></tr>
                      <tr><td className="leftalign">Add Roles</td>
                        <td className="leftalign">

                          <select
                            multiple
                            name="list-box"
                            onChange={handleChange}  >
                            <option value="Supervisor" selected>Supervisor</option>
                            <option value="Operations Manager" selected>Operations Manager</option>
                            <option value="Plant Operator">Plant Operator</option>
                            <option value="Department Manager">Department Manager</option>

                          </select>
                          <br /><br />
                          <b>Selected Roles:</b>
                          <pre>{JSON.stringify(selectedList)}</pre>

                        </td>
                        <td> </td>
                      </tr>
                      <tr>
                        <td className="leftalign">Customers</td>
                        <td className="leftalign"> <select
                            multiple
                            name="list-box"
                            onChange={handleChangeCust}>
                            <option value="Williams Sonoma" selected>Williams Sonoma</option>
                            <option value="Customer 1" selected>Customer 1</option>
                            <option value="Customer 2">Customer 2</option>
                            <option value="Customer 3">Customer 3</option>

                          </select>
                          <br /><br />
                          <b>Selected Customers:</b>
                          <pre>{JSON.stringify(selectList)}</pre>
</td></tr>
                        <tr>
                        <td colspan="3" className="text-center">
                        <a href="add" style={{ padding:'15px', width: '140px' }} className="btn btn-danger">Update </a>
                        </td>
                        </tr>

                        
                    </tbody>
                  </table>
                  </td>
                      </tr>
                    </tbody>
                  </table>


                </div>

              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Addarole;
import React from "react";
import "./Adminpanel.css";
import { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ListBox from 'react-listbox';
import 'react-listbox/dist/react-listbox.css';

function RolesApplications() {
  
  const [selectedList, setSelectedList] = useState([]);

  const handleChange = e => {
    let { options } = e.target;
    options = Array.apply(null, options)
    const selectedValues = options.filter(x => x.selected).map(x => x.value);
    setSelectedList(selectedValues);
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
                        <td colspan="2" style={{ textAlign: 'center', fontFamily: 'Gill Sans' }}><h3>Application Management</h3></td>
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
                              <td><Link to="/Adminpanel" className="btn btn-info" >Roles-Applicaitons</Link></td>
                            </tr>
                            <tr>
                            </tr>
                          </tbody>
                         </table></td>
                        <td width="75%" style={{ verticalAlign: 'top' }}>
     
                
                  <table width="100%" class="tback">
                    <tbody>
                      <tr className="headerRowColor">
                        <td colspan="5">Display/Add Existing Applications</td></tr>
                      <tr>
                        <td className="leftalign" style={{verticalAlign:'top'}}>
                          <input type="text" className="form-control" placeholder="Enter New Role" />
                        </td>
                        <td className="leftAlign">
                        <select className="form-control"
                            multiple
                            name="list-box"
                            onChange={handleChange}>
                            <option value="App1">App1</option>
                            <option value="Fabric Report">Fabric inventory report</option>
                            <option value="App2">App2</option>
                            <option value="App5">App5</option>

                          </select>
                          <br /><br />
                          <b>Selected Apps:</b>
                          <pre>{JSON.stringify(selectedList)}</pre>

                        </td>
                        <td colspan="5" className="leftalign" style={{verticalAlign:'top'}} ><a href="add" className="btn btn-danger">Add </a>
                        </td>
                        
                      </tr>
                      
                      <tr className="headerRowColor">
                        <td className="leftalign">Roles</td>
                        <td className="leftalign">Applications</td>
                        <td className="leftalign" colspan="2">Active</td> 
                        <td></td>
                        </tr>
                      <tr>
                      <td className="leftalign">Admin</td>
                      <td className="leftalign">App1, App5, Fabric Report</td>
                        <td className="leftalign" colspan="2">Y</td>
                        <td className ="text-center"><Link to="/RolesAppsMap" className="btn btn-info" >Add Applications</Link></td>
                        
                        </tr>
                        <tr>
                      <td className="leftalign">Supervisor</td>
                      <td className="leftalign">App5</td>
                        <td className="leftalign" colspan="2">Y</td>
                        <td className ="text-center"><Link to="/RolesAppsMap" className="btn btn-info" >Add Applications</Link></td>
                        </tr> 
                       
                        
                        <tr>
                      <td className="leftalign">Plant Manager</td>
                      <td className="leftalign">App1, App5</td>
                        <td className="leftalign" colspan="2">Y</td>
                        <td className ="text-center"><Link to="/RolesAppsMap" className="btn btn-info" >Add Applications</Link></td>
                        </tr>
                       
                        <tr>
                      <td className="leftalign">Administrative Incharge</td>
                      <td className="leftalign">App5, Fabric Report</td>
                        <td className="leftalign" colspan="2">Y</td>
                        <td className ="text-center"><Link to="/RolesAppsMap" className="btn btn-info" >Add Applications</Link></td>
                        </tr>
                        <tr>
                      <td className="leftalign">Staff</td>
                      <td className="leftalign">Fabric Report</td>
                        <td className="leftalign" colspan="2">Y</td>
                        <td className ="text-center"><Link to="/RolesAppsMap" className="btn btn-info" >Add Applications</Link></td>
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

export default RolesApplications;
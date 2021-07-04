import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector} from "react-redux";
import { doGetAllUsers, doAddRole } from "../../redux/actions/admin";



const Admin = () => {
    //const {roleDetails, setRoleDetails}
    const [role, setRole] = useState(null);
    
    const { userData } = useSelector(
        (state) => {
           
         return    state.admin;
        }
    );

    const dispatch = useDispatch();
    
    const handleRoleChange = (event) => {
        
        setRole(event.target.value);
    }
    const addRole = () => {
        dispatch(doAddRole({role}));
    }
    const onCSVExport = () => {
        console.log("I am here");
        dispatch(doGetAllUsers());
    }
    return <div> 
        <input type="text"  onChange = {handleRoleChange}/>
        <Button onClick = {addRole}>Add Role</Button>
        <Button onClick={onCSVExport}>
                Fetch
                </Button>
            </div>
}

export default Admin;
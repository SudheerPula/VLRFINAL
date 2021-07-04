import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { doResetPassword } from "../redux/actions";
import { Redirect } from "react-router-dom";
import { routes } from "../routes";

function ResetLink() {
  
   const [passwordDetails, setPasswordDetails] = React.useState({password : "", confirmPassword : "" });
   const dispatch = useDispatch();
   const { login } = useSelector((state) => state);
   if (login.resetPasswordSuccess) {
     alert("Password Reset is successful. Please login.")
    return <Redirect to={routes.LOGIN} />;
  }
   const handleNewPasswordChange = (event) => {
      const passwordData = { ...passwordDetails };
      const { value } = event.target;
      passwordData.password = value;
      setPasswordDetails(passwordData);
    }

    const handleConfirmPasswordChange = (event) => {
      const passwordData = { ...passwordDetails };
      const { value } = event.target;
      passwordData.confirmPassword = value;
      setPasswordDetails(passwordData);
    }
    
   const handlePasswordChange = () => {
    var pattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+=_-|])[A-Za-z\d@$!%*?&+=_-|]{8,}$/);
    if (!pattern.test(passwordDetails.password)) { 
      return alert('Password must contain 1 Numeric, one Uppercase, One Lowercase and one special character and atleast 8 characters'); 
      }else if (passwordDetails.password !== passwordDetails.confirmPassword)
      {
        return alert("Passwords do not match");
      } 
      const newPassword = passwordDetails.password
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const authToken = params.get('token');
      dispatch(doResetPassword({password:newPassword, authToken:authToken}));
   }


    return (
      <>
  <header>
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-12">
              			<center>	
             <div className="wrapper fiftypercent" >
         <div className="title-text">
            <div className="title login">
            Reset Password </div> 
			 
         </div>
		 
		  <br/>
         <div className="form-container">
           
            <div className="form-inner">
               <form action="#" className="login">
                  <div className="field">
                     <input type="password" onChange = {handleNewPasswordChange} 
                          placeholder="New Password" required/>
                  </div>
				    <div className="field">
                     <input type="password" onChange = {handleConfirmPasswordChange} 
                     placeholder="Confirm New Password" required/>
                  </div>
                  <br/>
                
                  <div className="field btn">
                     <div className="btn-layer"></div>
                     <input type="submit" value="Reset" onClick={handlePasswordChange}/>
                  </div>
                 
               </form>
            
            </div>
         </div>
      </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </header>
    

      </>
    );
  }
  
  export default ResetLink;
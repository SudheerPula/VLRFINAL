import React from "react";
//import { useDispatch, useSelector } from "react-redux";

function ForgotPassword() {

   const invalidEmailArray = ["@gmail.com","@yahoo.com", "@hotmail.com","@outlook.com"];
  
   function validateCorporateEmail(email){
     return invalidEmailArray.some(invalidEmail => email.endsWith(invalidEmail)); 
     
   }
   const handleForgotPassword = (email) => {
      if (email !== "undefined") {         
         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
         if (!pattern.test(email)) {    
            alert("Invalid Email Entered");
           return;
         }
         if(validateCorporateEmail(email)) {
           alert("Please use only corporate email ID");
           return;
         }
       }
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
            Forgot Password </div> 
			 
         </div>
		  
			 <h5 className="linkStyle" >Please type your Email id to send a reset link </h5>
			 
		  <br />
         <div className="form-container">
           
            <div className="form-inner">
               <form action="ResetLink" className="login">
                  <div className="field">
                     <input type="text" placeholder="Email Address" required autoComplete="Email" /> 
                  </div>
                  <br />
                
                  <div className="field btn">
                     <div className="btn-layer"></div>
					   
                     <input type="submit" value="Send Link" />
					 
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
  
  export default ForgotPassword;
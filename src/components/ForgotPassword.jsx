import React from "react";

function ForgotPassword() {
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
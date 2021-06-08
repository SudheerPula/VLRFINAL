import React from "react";

function ResetLink() {
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
                     <input type="password" placeholder="New Password" required autoComplete="Email" />
                  </div>
				    <div className="field">
                     <input type="password" placeholder="Confirm New Password" required autoComplete="Email" />
                  </div>
                  <br/>
                
                  <div className="field btn">
                     <div className="btn-layer"></div>
                     <input type="submit" value="Reset" />
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
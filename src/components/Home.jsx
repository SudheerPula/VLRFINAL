import React from "react";
import {Helmet} from "react";

function Home() {
  <Helmet>
      <style type="text/css">{`
    .navbar {
        display: inline
    }

`}</style>
    </Helmet>
    return (
      <>
       <header>
      <div className="jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="text-center">Welcome to Stone & Leigh</h1>

              

				<p></p>
              <p className="text-center"></p>
              <p>&nbsp;</p>
              <p className="text-center"><a className="btn btn-primary btn-lg" href="/inventory" role="button">Customer Fabric Report</a> </p>
            </div>
          </div>
        </div>
      </div>
    </header>

      </>
    );
  }
  
  export default Home;
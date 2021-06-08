import React from "react";



function Customerreport() {
    return (
      <>
         <header>
      <div className="jumbotron">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
				<div className="row">
				<div className="col-md-6 text-left;" style={{ marginTop: '-3%' }} >
                    
				  <h5 className="leftmargin" >Customer: <span className="orangered">Wiliams Sonoma</span></h5>
				  </div>
					
					<div className="col-md-6 text-right" style={{marginleft: '-6%' , margintop: '-4%' }}>

				    <img src="images/otherlogo.png" className="otherLogo"  alt=""/> </div>

				</div>
				 <h3 className="mainHeading" >Customer Fabric Availability</h3>

			<div className = "buttonstop">

					<input type="image" name="exportpdf" style={{ width:'47px'}} src="images/pdfButton.png"  alt="text"/>
				 
				  
					  <input type="image" name="exportexcel" style={{width:'47px'}} src="images/excelbutton.png"  alt="text"/>
				</div>

              <div id="fabDiv" className="tableDiv">
              <table id="fabData">
  <thead> 
    <tr>      
      <th rowspan="2" style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }} scope="col">Cust Sku#</th>
		<th rowspan="2" style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }} scope="col">Fabric ID</th>
	        <th rowspan="2" style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }} scope="col">Description</th>
		      <th rowspan="2" style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }} scope="col">On Hand</th>
		      <th rowspan="2" style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }} scope="col">Committed</th>
		      <th rowspan="2" style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }} scope="col">Availabile</th>
		      <th rowspan="2" style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }} scope="col">Open PO Qty</th>
		      
	  		  <th scope="col" style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }} colspan="2">4 Weeks</th>
		      <th scope="col" style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }} colspan="2">8 Weeks</th>
			  <th scope="col" style= {{borderbottom: '#fff 1px solid'}} colspan="2">12 Weeks </th>

    </tr>
	  <tr>
		   <th style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid', borderleft:'#fff 1px sikud' }}>Usage</th>

		  <th style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }}>Ratio</th>
		  <th style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }}>Usage</th>
		  <th style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }}>Ratio</th>
	      <th style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }}>Usage</th>
		  <th style={{ borderbottom: '#fff 1px solid', borderright: '#fff 1px solid' }}>Ratio</th>

		  
	  </tr>
  </thead>
  <tbody>
    <tr>
      <td></td>
      <td>WS-0113</td>
      <td>ED SUEDE, OAT</td>
      <td style={{textalign:'right'}}>1,000</td>
		<td style={{textalign:'right'}}>8000</td>
		<td style={{textalign:'right'}}>200</td>
		<td style={{textalign:'right'}}>20000</td>
	
	    <td className="applycolor" style={{textalign:'right'}}>200</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>700</td>
		<td className="applycolor" style={{textalign:'right'}}>400</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>300</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>
    </tr>
	      <tr>
      <td></td>
      <td>WS-0113</td>
      <td>ED SUEDE, OAT</td>
      <td style={{textalign:'right'}}>1,000</td>
		<td style={{textalign:'right'}}>8000</td>
		<td style={{textalign:'right'}}>200</td>
		<td style={{textalign:'right'}}>20000</td>
	
	     <td className="applycolor" style={{textalign:'right'}}>100</td>
		<td className="applycolor" style={{textalign:'right'}}>600</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>100</td>
		<td className="applycolor" style={{textalign:'right'}}>500</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>100</td>
		<td className="applycolor" style={{textalign:'right'}}>900</td>

    </tr>
    <tr>
      <td></td>
      <td>WS-0113</td>
      <td>ED SUEDE, OAT</td>
      <td style={{textalign:'right'}}>1,000</td>
		<td style={{textalign:'right'}}>8000</td>
		<td style={{textalign:'right'}}>200</td>
		<td style={{textalign:'right'}}>20000</td>
	
	  <td className="applycolor" style={{textalign:'right'}}>1100</td>
		<td className="applycolor" style={{textalign:'right'}}>200</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>400</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>700</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>

    </tr>

	      <tr>
      <td></td>
      <td>WS-0113</td>
      <td>ED SUEDE, OAT</td>
      <td style={{textalign:'right'}}>1,000</td>
		<td style={{textalign:'right'}}>8000</td>
		<td style={{textalign:'right'}}>200</td>
		<td style={{textalign:'right'}}>20000</td>
	
	    <td className="applycolor" style={{textalign:'right'}}>100</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>100</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>100</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>
    </tr>  
	    
  <tr>
      <td></td>
      <td>WS-0113</td>
      <td>ED SUEDE, OAT</td>
      <td style={{textalign:'right'}}>1,000</td>
		<td style={{textalign:'right'}}>8000</td>
		<td style={{textalign:'right'}}>200</td>
		<td style={{textalign:'right'}}>20000</td>
	
	    <td className="applycolor" style={{textalign:'right'}}>100</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>100</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>
		
	    <td className="applycolor" style={{textalign:'right'}}>100</td>
		<td className="applycolor" style={{textalign:'right'}}>100</td>
    </tr>  
	    
  </tbody>
				  <tfoot>
					  
					  <table style={{margintop: '6%',  backgroundcolor: '#c4e0e5'}}>
						
				   <tr>
      <td style={{ fontweight:'bold'}}>Totals:</td>
      <td></td>
      <td></td>
      <td></td>
		<td></td>
		<td></td>
		<td></td>
	
	    <td className="applycolor"></td>
		<td className="applycolor"></td>
		
	    <td className="applycolor"></td>
		<td className="applycolor"></td>
		
	    <td className="applycolor"></td>
		<td className="applycolor"></td>
    </tr>  
					  </table>
				  
				  </tfoot>
</table>
              <p>&nbsp;</p>
             

			  </div>
            </div>
          </div>
        </div>
      </div>
    </header>
   

      </>
    );
  }
  
  export default Customerreport;
import React, { useState, useEffect } from "react";
//import { AgGridReact,  AgGridColumn } from "ag-grid-react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
//import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {useLocation} from "react-router-dom";
import { fetchInventoryData } from "../redux/actions";
//import CustomDropdown from "./CustomDropdown/CustomDropdown";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import "./Inventory.css";
import moment from "moment";
//import jwt, { JsonWebTokenError } from "jsonwebtoken"
import printDoc from "./pdfExport/printDoc";
//import {Logout} from "../components/Logout/Logout";
//import { WrapText } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginTop: 8,
    backgroundColor: "#283db1",
    height: "36%",
   //backgroundColor:  rgb(33,150,243 / 40%),
  },
}));

const getCellStyle = () => {
  return {
    borderRight: "1px solid #dde2eb", fontSize:'12px', textAlign: 'left' 
  }
}

const getCellNumberStyle = () => {
  return {
    borderRight: "1px solid #dde2eb", fontSize:'12px', textAlign: 'right'
  }
}


function currencyFormatter(currency, sign) {
  if(currency !== undefined) {
  var sansDec = currency.toFixed(2);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + `${formatted}`;
  }
}

const columnDefs = [
  {
    headerName: "Customer Sku",
    field: "sku",
    suppressMenu: true,
    filter: "agTextColumnFilter",
    cellClass: "inventoryCell",
    cellStyle: getCellStyle(),
  },
  {
    headerName: "Fabric ID",
    field: "fabricId",
    suppressMenu: true,
    filter: "agTextColumnFilter",
    cellClass: "inventoryCell",
    cellStyle: getCellStyle()
  },
  {
    headerName: "Description", 
    field: "description",
    suppressMenu: true,
    filter: "agTextColumnFilter",
    resizable: true,
    width: 300,
    cellClass: "inventoryCell",
    cellStyle: getCellStyle()
  },
  {
    headerName: "On Hand",
    field: "onHandQty",
    filter: false,
    cellClass: "inventoryCell",
    textAlign: "right",
    cellStyle: getCellNumberStyle(),
    valueFormatter: param => currencyFormatter(param.data.onHandQty, '')
  },
  {
    headerName: "Committed",
    field: "committedQty",
    filter: false,
    cellStyle: getCellNumberStyle(),
    valueFormatter: param => currencyFormatter(param.data.committedQty, '')
  },
  {
    headerName: "Available",
    field: "availableQty",
    filter: false,
    cellClass: "inventoryCell",
    cellStyle: getCellNumberStyle(),
    valueFormatter: param => currencyFormatter(param.data.availableQty, '')
    //valueFormatter: param => currencyFormatter(param.data.availableQty, '')
  },
  {
    headerName: "Open PO Qty",
    field: "openPOQty",
    filter: false,
    cellClass: "inventoryCell",
    cellStyle: getCellNumberStyle(),
    valueFormatter: param => currencyFormatter(param.data.openPOQty, '')
  },
  {
    headerName: "Defect Qty",
    field: "defectiveQty",
    filter: false,
    cellClass: "inventoryCell",
    cellStyle: getCellNumberStyle(),
    valueFormatter: param => currencyFormatter(param.data.defectiveQty, '')
  },
];


const Inventory = (props) => {
  console.log()
  //pdf attributes
  const PDF_PAGE_ORITENTATION = "landscape";
  const PDF_WITH_HEADER_IMAGE = false;
  const PDF_WITH_FOOTER_PAGE_COUNT = true
  const PDF_HEADER_HEIGHT = 25;
  const PDF_ROW_HEIGHT = 15;

  const PDF_ODD_BKG_COLOR = "#fcfcfc";
  const PDF_EVEN_BKG_COLOR = "#fff";
  const PDF_WITH_CELL_FORMATTING = true;
  const PDF_WITH_COLUMNS_AS_LINKS = false;

  const PDF_SELECTED_ROWS_ONLY = false;

  const PDF_HEADER_COLOR = "#f8f8f8";
  const PDF_INNER_BORDER_COLOR = "#dde2eb";
  const PDF_OUTER_BORDER_COLOR = "#babfc7";
  const PDF_LOGO =
  "./pdfExport/PDF_Header.PNG";



  const classes = useStyles();
  //var altColor = false;
  const { userData } = useSelector((state) => state.login);
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [customerName, setCustomerName] = useState(null);
  const location = useLocation();
  console.log(location);
  //const { gridData, customerId, loading, totalCutomerFabrics } = useSelector(
    const { gridData, loading, totalCustomerFabrics, dataNotFound } = useSelector(
    (state) => state.inventory
  );

  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  };


  const onFirstDataRendered = (params) => {   
    params.api.sizeColumnsToFit();
  };
  if (loading && gridApi) {
    gridApi.showLoadingOverlay();
  } else {
    if (gridApi) gridApi.hideOverlay();
  }

  const dispatch = useDispatch();

  if(location.customer) {
    
    localStorage.setItem( 'SelectedOption', userData.customers.filter((customer) => customer.customerId === location.customer)
    .map((customer) => customer.customerName) );
    dispatch(fetchInventoryData({ id: location.customer }));
    location.customer = undefined;
   
  } 

  useEffect(()=>{
   // if(gridData?.payload?.response.status !== 200){
   //   console.log("sds");
   //   Logout(history)
   //       }

   if(gridData?.length===0 && !dataNotFound){
       
        var customerSelected = userData.customers.filter((customer) => customer.customerName === 'Williams-Sonoma, Inc' );
        if(customerSelected[0]?.customerId) {
          dispatch(fetchInventoryData({ id: customerSelected[0]?.customerId }));
          setCustomerName(customerSelected[0]?.customerName);
          localStorage.setItem( 'SelectedOption', customerSelected[0]?.customerName );
          
        } else {
          dispatch(fetchInventoryData({ id: userData.customers[0]?.customerId }));
          setCustomerName(userData.customers[0]?.customerName);
          localStorage.setItem( 'SelectedOption', userData.customers[0]?.customerName );
        }
      }
    
    
  },[dispatch, gridData, userData.customers, dataNotFound])

 
  //const getRowStyle = (params) => {
    //if (!altColor) {
     // altColor = true;
      //return { background: "#fff8" };
    //} else {
      //altColor = false;
      //return { background: "#e3e9eb" };
    //}
  //};

  const onCSVExport = () => {
    gridApi.exportDataAsCsv();
  };

  const onPDFExport = () => { 
    const printParams = {
      PDF_HEADER_COLOR,
      PDF_INNER_BORDER_COLOR,
      PDF_OUTER_BORDER_COLOR,
      PDF_LOGO,
      PDF_PAGE_ORITENTATION,
      PDF_WITH_HEADER_IMAGE,
      PDF_WITH_FOOTER_PAGE_COUNT,
      PDF_HEADER_HEIGHT,
      PDF_ROW_HEIGHT,
      PDF_ODD_BKG_COLOR,
      PDF_EVEN_BKG_COLOR,
      PDF_WITH_CELL_FORMATTING,
      PDF_WITH_COLUMNS_AS_LINKS,
      PDF_SELECTED_ROWS_ONLY
    };

    printDoc(printParams, gridApi, columnApi, userData.customers[0]?.customerName);
  };

  function createData(count, prefix) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        availableQty: totalCustomerFabrics.totalAvailableQty,
        committedQty: totalCustomerFabrics.totaCommittedQty,
        description: "Total",
        fabricId: undefined,
        id: undefined,
        inventoryStats: undefined,
        onHandQty: totalCustomerFabrics.totalOnHandQty,
        openPOQty: totalCustomerFabrics.totalOpenPOQty,
        defectiveQty: totalCustomerFabrics.totalDefectiveQty,
        sku: undefined,
      });
    }
    return result;
  }

  return (
    <>
      <div
        className="row"
        style={{ marginTop: "1px", height: '50px', marginLeft: 0, marginRight: 0 }}
      >
        <div className="col-sm-12 btn btn-info">
          <p
            style={{
              display: "inline",
              paddingLeft: "30%",
              paddingTop: "0.2%",
              fontWeight: 'bold',
              fontSize: '24px'
            }}
          >
            Customer Fabric Availability
          </p>
          <p
            style={{
              display: "inline",
              paddingLeft: "8%",
              paddingTop: "0.2%",
              fontWeight: 'italic',
              fontSize: '14px'
            }}
          >
                  {moment().format("MMMM Do YYYY, h:mm:ss a")}
          </p>
                   
          <p
            style={{
              display: "inline",
              float: "right",
              paddingRight: "20%",
              paddingTop: "0.2%",
            }}
          >
           </p>
           <p style={{
              display: "inline",
              float: "right",
              marginLeft: "7%",
              marginRight: "-1%",
              marginTop: "-3%",
            }}>
          </p>
        </div>
      </div>

      <div className="row text-center inventoryContainer">
        <div
          className="col-md-12"
        >
          <div className="card">
            <div className="row" style={{ marginTop: "2%", marginLeft: "0%" }}>
              <div className="col-md-4 text-left classtopcustomer" style={{fontSize: '22px'}}>
              {localStorage.getItem( 'SelectedOption' )}
              </div>
              <div className="col-md-3 text-right" style={{marginTop: '-72px', marginLeft: '40%' }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={onCSVExport}
                  endIcon={<CloudUploadIcon />}
                >
                  CSV
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={onPDFExport}
                  endIcon={<CloudUploadIcon />}
                >
                  PDF
                </Button>
              </div>
            </div>

            <div className="card-body position-relative" style={{ height: "100%", width: "100%", marginTop: '-2%' }}>
              <div
                className="ag-theme-alpine"
                style={{ height: '600px', width: "100%", textAlign: "center" }}
              >
                <AgGridReact
                  defaultColDef={{
                    sortable: true,
                    filter: true,
                    floatingFilter: true,
                    
                  }}
                  columnDefs={columnDefs}
                  onFirstDataRendered={onFirstDataRendered}
                  //getRowStyle={getRowStyle}
                  rowData={gridData}
                  onGridReady={onGridReady}
                  gridOptions={
                    {
                      headerHeight : 22,
                      floatingFiltersHeight : 28,
                      rowHeight : 30,
                      wrapText : true,
                    }
                  }

                  pinnedBottomRowData={createData(1, "Bottom")}
                  statusBar={{ 
                    statusPanels: [
                      {
                        statusPanel: "agTotalAndFilteredRowCountComponent",
                        align: "left",
                        
                      },
                      {
                        statusPanel: "agTotalRowCountComponent",
                        align: "center",
                      },
                    ],
                  }}
                ></AgGridReact>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Inventory;

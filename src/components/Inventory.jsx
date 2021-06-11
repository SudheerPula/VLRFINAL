import React, { useState, useEffect } from "react";
import { AgGridReact,  AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchInventoryData } from "../redux/actions";
import CustomDropdown from "./CustomDropdown/CustomDropdown";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import "./Inventory.css";
import moment from "moment";
import printDoc from "./pdfExport/printDoc";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    marginTop: 0,
    backgroundColor: "#28729e",
  },
}));

const getCellStyle = () => {
  return {
    borderRight: "1px solid #dde2eb", fontSize:'12px'
  }
}

const getCellNumberStyle = () => {
  return {
    borderRight: "1px solid #dde2eb", fontSize:'12px', textAlign: 'right'
  }
}

function currencyFormatter(currency, sign) {
  var sansDec = currency.toFixed(2);
  var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + `${formatted}`;
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
    valueFormatter: param => currencyFormatter(Math.floor(param.data.onHandQty), '')
  },
  {
    headerName: "Committed",
    field: "committedQty",
    filter: false,
    cellStyle: getCellNumberStyle(),
    valueFormatter: param => currencyFormatter(Math.floor(param.data.committedQty), '')
  },
  {
    headerName: "Available",
    field: "availableQty",
    filter: false,
    cellClass: "inventoryCell",
    cellStyle: getCellNumberStyle(),
    valueFormatter: param => currencyFormatter(Math.floor(param.data.availableQty), '')
  },
  {
    headerName: "Open PO Qty",
    field: "openPOQty",
    filter: false,
    cellClass: "inventoryCell",
    cellStyle: getCellNumberStyle(),
    valueFormatter: param => currencyFormatter(Math.floor(param.data.openPOQty), '')
  },
];


const Inventory = () => {
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
  const { userData } = useSelector((state) => state.login);
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const { gridData, customerId, loading, totalCutomerFabrics } = useSelector(
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

  useEffect(()=>{
    if(gridData.length===0){
    dispatch(fetchInventoryData({ id: userData.customers[0]?.customerId }));
  }},[])
 //const onCustomerChange = (customer) => {
 //  dispatch(fetchInventoryData({ id: customer }));
 //};

  // useEffect(() => {
  //   if(userData.customers.length > 0 ){
  //     console.log(userData.customers[0].customerId)
  //   }
  // }, [dispatch, userData.customers]);

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { background: "#fff8" };
    } else {
      return { background: "#e3e9eb" };
    }
  };

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

    printDoc(printParams, gridApi, columnApi);
  };

  function createData(count, prefix) {
    var result = [];
    for (var i = 0; i < count; i++) {
      result.push({
        availableQty: totalCutomerFabrics.totaCommittedQty,
        committedQty: totalCutomerFabrics.totalAvailableQty,
        description: "Total",
        fabricId: undefined,
        id: undefined,
        inventoryStats: undefined,
        onHandQty: totalCutomerFabrics.totalOnHandQty,
        openPOQty: totalCutomerFabrics.totalOpenPOQty,
        sku: undefined,
      });
    }
    return result;
  }

  return (
    <>
      <div
        className="row"
        style={{ marginTop: "4px", height: '50px', marginLeft: 0, marginRight: 0 }}
      >
        <div className="col-sm-12 btn btn-info">
          <p
            style={{
              display: "inline",
              paddingLeft: "23%",
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
              float: "right",
              paddingRight: "6%",
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
              {moment().format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>
      </div>

      <div className="row text-center inventoryContainer">
        <div
          className="col-md-12"
        >
          <div className="card">
            <div className="row" style={{ marginTop: "2%", marginLeft: "1%" }}>
              <div className="col-md-4 text-left classtopcustomer" style={{fontSize: '22px'}}>
              {userData.customers[0]?.customerName}
              </div>
              {/* <div className="col-md-5 text-left">
                <img
                  src="images/williams_sonoma.png"
                  className="otherLogo"
                  alt=""
                />
              </div> */}
              <div className="col-md-3 text-right" style={{marginTop: '-70px', marginLeft: '38%' }}>
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
                  getRowStyle={getRowStyle}
                  rowData={gridData}
                  onGridReady={onGridReady}

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

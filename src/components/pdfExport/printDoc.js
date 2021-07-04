import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import getDocDefinition from "./docDefinition";
pdfMake.vfs = pdfFonts.pdfMake.vfs;



function printDoc(printParams, gridApi, columnApi, customerName) {
  console.log("Exporting to PDF...");
  const docDefinition = getDocDefinition(printParams, gridApi, columnApi, customerName);
  pdfMake.createPdf(docDefinition).download("Fabric_Report_"+new Date().toISOString().replace(/T/, '_').replace(/\..+/, '')+".pdf");
}

export default printDoc;

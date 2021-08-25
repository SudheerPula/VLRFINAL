import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";


class BtnCellRenderer extends Component {
    constructor(props) {
      super(props);
      this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
     this.props.clicked(this.props.value);    
    //  this.context.router.push('/Addarole');
    
    }
    
    render() {
      return (
        <Link to="/addarole" > <button className="btn btn-danger" onClick = {this.btnClickedHandler}>Edit</button></Link>
      )
    }
  }
  export default BtnCellRenderer;
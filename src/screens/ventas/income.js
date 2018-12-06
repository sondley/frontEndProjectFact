import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import CustomMenu from "../../components/custom-menu/custom-menu";
import SalesForm from "../../components/sales-form/salesform";

//Logic
import { getProducts } from "../../redux/actions/product";
import { getClients } from "../../redux/actions/client";

class IncomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props.dispatch(getClients());
    this.props.dispatch(getProducts());
  }

  render() {
    return (
      <CustomMenu>
        <SalesForm />
      </CustomMenu>
    );
  }
}

export default connect()(IncomeScreen);

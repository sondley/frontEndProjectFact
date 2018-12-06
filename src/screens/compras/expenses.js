import React, { Component } from "react";
import { connect } from "react-redux";

//Components
import CustomMenu from "../../components/custom-menu/custom-menu";
import BuysForm from "../../components/buys-form/buysform";

//Logic
import { getProducts } from "../../redux/actions/product";
import { getProviders } from "../../redux/actions/provider";

class ExpensesScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props.dispatch(getProviders());
    this.props.dispatch(getProducts());
  }

  render() {
    return (
      <CustomMenu>
        <BuysForm />
      </CustomMenu>
    );
  }
}

export default connect()(ExpensesScreen);

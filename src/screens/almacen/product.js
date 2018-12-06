import React, { Component } from "react";
import { Button, Icon, Grid, Dimmer } from "semantic-ui-react";

//Components
import CustomMenu from "../../components/custom-menu/custom-menu";
import ProductsTable from "../../components/product-table/producttable";
import ProductForm from "../../components/product-form/productform";

class ProductScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { modalIsOpen: false };
  }

  handleAdd = e => {
    e.preventDefault();
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <Dimmer.Dimmable blurring dimmed={this.state.modalIsOpen}>
        <Dimmer page active={this.state.modalIsOpen} onClickOutside={this.handleCloseModal}>
          <ProductForm onClose={this.handleCloseModal} />
        </Dimmer>
        <CustomMenu>
          <div>
            <Grid className="no-margin-bottom">
              <Grid.Row>
                <Grid.Column floated="right" className="rightAligned">
                  <Button icon labelPosition="left" positive size="large" onClick={this.handleAdd}>
                    <Icon name="add" /> Agregar Producto
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <ProductsTable />
          </div>
        </CustomMenu>
      </Dimmer.Dimmable>
    );
  }
}

export default ProductScreen;

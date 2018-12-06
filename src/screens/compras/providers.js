import React, { Component } from "react";
import { Button, Icon, Grid, Dimmer } from "semantic-ui-react";

//Components
import CustomMenu from "../../components/custom-menu/custom-menu";
import ProviderTable from "../../components/provider-table/providertable";
import ProviderForm from "../../components/provider-form/providerform";

class ProvidersScreen extends Component {
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
          <ProviderForm onClose={this.handleCloseModal} />
        </Dimmer>
        <CustomMenu>
          <div>
            <Grid className="no-margin-bottom">
              <Grid.Row>
                <Grid.Column floated="right" className="rightAligned">
                  <Button icon labelPosition="left" positive size="large" onClick={this.handleAdd}>
                    <Icon name="add" /> Agregar Proveedor
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <ProviderTable />
          </div>
        </CustomMenu>
      </Dimmer.Dimmable>
    );
  }
}

export default ProvidersScreen;

import React, { Component } from "react";
import { Button, Icon, Grid, Dimmer } from "semantic-ui-react";

//Components
import CustomMenu from "../../components/custom-menu/custom-menu";
import CategoriesTable from "../../components/categories-table/categoriestable";
import CategoryForm from "../../components/category-form/categoryform";

class CategoryScreen extends Component {
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
          <CategoryForm onClose={this.handleCloseModal} />
        </Dimmer>
        <CustomMenu>
          <div>
            <Grid className="no-margin-bottom">
              <Grid.Row>
                <Grid.Column floated="right" className="rightAligned">
                  <Button icon labelPosition="left" positive size="large" onClick={this.handleAdd}>
                    <Icon name="add" /> Agregar Categoria
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <CategoriesTable />
          </div>
        </CustomMenu>
      </Dimmer.Dimmable>
    );
  }
}

export default CategoryScreen;

import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Table, Pagination, Dimmer, Loader, Modal } from "semantic-ui-react";
import { find } from "lodash";

//Internal Components
import ProductForm from "../product-form/productform";

//Logic
import { getProducts, deleteProduct } from "../../redux/actions/product";

class ProductsTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editModal: false,
      deleteModal: false,
      data: {}
    };
    this.props.dispatch(getProducts());
  }

  handleEdit = (e, item) => {
    e.preventDefault();
    this.setState({ data: item, editModal: true });
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.dispatch(deleteProduct(this.state.data, this.handleCloseModal));
  };

  handleOpenModal = (e, id) => {
    e.preventDefault();
    const data = { id };
    this.setState({ data, deleteModal: true });
  };

  handleCloseModal = () => {
    this.setState({ editModal: false, deleteModal: false });
  };

  renderTableRows = data => {
    const rows = data.map(item => {
      const estado = parseInt(item.estado) === 1 ? "Activo" : "Inactivo";
      const cat = find(this.props.category.categories, { id: item.categoria_id });
      let categoria = cat.categoria;
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.producto}</Table.Cell>
          <Table.Cell>{item.stock}</Table.Cell>
          <Table.Cell>{item.unidad}</Table.Cell>
          <Table.Cell>{item.precio_compra}</Table.Cell>
          <Table.Cell>{item.precio_venta}</Table.Cell>
          <Table.Cell>{item.moneda}</Table.Cell>
          <Table.Cell>{categoria || ""}</Table.Cell>
          <Table.Cell>{estado}</Table.Cell>
          <Table.Cell collapsing>
            <div className="cellSpacing">
              <Button
                icon="edit"
                color="blue"
                onClick={e => {
                  this.handleEdit(e, item);
                }}
              />
              <Button
                icon="trash"
                color="red"
                onClick={e => {
                  this.handleOpenModal(e, item.id);
                }}
              />
            </div>
          </Table.Cell>
        </Table.Row>
      );
    });
    return rows;
  };

  render() {
    return (
      <Dimmer.Dimmable blurring dimmed={this.props.product.isFetching || this.props.category.isFetching}>
        <Dimmer page active={this.props.product.isFetching || this.props.category.isFetching}>
          <Loader size="huge">Loading...</Loader>
        </Dimmer>
        <Modal open={this.state.editModal} onClose={this.handleCloseModal}>
          <ProductForm edit={true} data={this.state.data} onClose={this.handleCloseModal} />
        </Modal>
        <Modal size="small" open={this.state.deleteModal} onClose={this.handleCloseModal}>
          <Modal.Header>Eliminar Producto</Modal.Header>
          <Modal.Content>
            <p>Esta seguro que desea eliminar este producto?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              icon="cancel"
              labelPosition="right"
              content="No"
              onClick={this.handleCloseModal}
            />
            <Button
              positive
              icon="checkmark"
              labelPosition="right"
              content="Yes"
              onClick={this.handleDelete}
            />
          </Modal.Actions>
        </Modal>
        <div>
          <Table compact celled striped size="large">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Producto</Table.HeaderCell>
                <Table.HeaderCell>Inventario</Table.HeaderCell>
                <Table.HeaderCell>Unidad</Table.HeaderCell>
                <Table.HeaderCell>Precio de Compra</Table.HeaderCell>
                <Table.HeaderCell>Precio de Venta</Table.HeaderCell>
                <Table.HeaderCell>Moneda</Table.HeaderCell>
                <Table.HeaderCell>Categoria</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderTableRows(this.props.product.products)}</Table.Body>
          </Table>
          <Pagination
            defaultActivePage={1}
            ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
            firstItem={{ content: <Icon name="angle double left" />, icon: true }}
            lastItem={{ content: <Icon name="angle double right" />, icon: true }}
            prevItem={{ content: <Icon name="angle left" />, icon: true }}
            nextItem={{ content: <Icon name="angle right" />, icon: true }}
            totalPages={1}
          />
        </div>
      </Dimmer.Dimmable>
    );
  }
}

function mapStateToProps({ product, category }) {
  return { product, category };
}

export default connect(mapStateToProps)(ProductsTable);

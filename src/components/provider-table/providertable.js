import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Table, Pagination, Dimmer, Loader, Modal } from "semantic-ui-react";

//Internal Components
import ProviderForm from "../provider-form/providerform";

//Logic
import { getProviders, deleteProvider } from "../../redux/actions/provider";

class ProvidersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editModal: false,
      deleteModal: false,
      data: {}
    };
  }

  componentDidMount = () => {
    this.props.dispatch(getProviders());
  };

  handleEdit = (e, item) => {
    e.preventDefault();
    this.setState({ data: item, editModal: true });
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.dispatch(deleteProvider(this.state.data, this.handleCloseModal));
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
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.razon_social}</Table.Cell>
          <Table.Cell>{item.cedula}</Table.Cell>
          <Table.Cell>{item.telefono}</Table.Cell>
          <Table.Cell>{item.direccion}</Table.Cell>
          <Table.Cell>{item.correo}</Table.Cell>
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
      <Dimmer.Dimmable blurring dimmed={this.props.provider.isFetching}>
        <Dimmer page active={this.props.provider.isFetching}>
          <Loader size="huge">Loading...</Loader>
        </Dimmer>
        <Modal open={this.state.editModal} onClose={this.handleCloseModal}>
          <ProviderForm edit={true} data={this.state.data} onClose={this.handleCloseModal} />
        </Modal>
        <Modal size="small" open={this.state.deleteModal} onClose={this.handleCloseModal}>
          <Modal.Header>Eliminar Proveedor</Modal.Header>
          <Modal.Content>
            <p>Esta seguro que desea eliminar este proveedor?</p>
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
                <Table.HeaderCell>Razon Social</Table.HeaderCell>
                <Table.HeaderCell>Cedula</Table.HeaderCell>
                <Table.HeaderCell>Telefono</Table.HeaderCell>
                <Table.HeaderCell>Direccion</Table.HeaderCell>
                <Table.HeaderCell>Correo</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderTableRows(this.props.provider.providers)}</Table.Body>
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

function mapStateToProps({ provider }) {
  return { provider };
}

export default connect(mapStateToProps)(ProvidersTable);

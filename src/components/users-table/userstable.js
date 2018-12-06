import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Table, Pagination, Dimmer, Loader, Modal } from "semantic-ui-react";

//Internal Components
import UserForm from "../user-form/userform";

//Logic
import { getUsers, deleteUser } from "../../redux/actions/user";

class UsersTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editModal: false,
      deleteModal: false,
      data: {}
    };
  }

  componentDidMount = () => {
    this.props.dispatch(getUsers());
  };

  handleEdit = (e, item) => {
    e.preventDefault();
    this.setState({ data: item, editModal: true });
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.dispatch(deleteUser(this.state.data, this.handleCloseModal));
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
          <Table.Cell>{item.usuario}</Table.Cell>
          <Table.Cell>{item.nombres}</Table.Cell>
          <Table.Cell>{item.appelidos}</Table.Cell>
          <Table.Cell>{item.cedula}</Table.Cell>
          <Table.Cell>{item.correo}</Table.Cell>
          <Table.Cell>{item.telefono}</Table.Cell>
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
    return <Dimmer.Dimmable blurring dimmed={this.props.user.isFetching}>
        <Dimmer page active={this.props.user.isFetching}>
          <Loader size="huge">Loading...</Loader>
        </Dimmer>
        <Modal open={this.state.editModal} onClose={this.handleCloseModal}>
          <UserForm edit={true} data={this.state.data} onClose={this.handleCloseModal} />
        </Modal>
        <Modal size="small" open={this.state.deleteModal} onClose={this.handleCloseModal}>
          <Modal.Header>Eliminar Usuario</Modal.Header>
          <Modal.Content>
            <p>Esta seguro que desea eliminar el usuario?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative icon="cancel" labelPosition="right" content="No" onClick={this.handleCloseModal} />
            <Button positive icon="checkmark" labelPosition="right" content="Yes" onClick={this.handleDelete} />
          </Modal.Actions>
        </Modal>
        <div>
          <Table compact celled striped size="large">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Usuario</Table.HeaderCell>
                <Table.HeaderCell>Nombres</Table.HeaderCell>
                <Table.HeaderCell>Apellidos</Table.HeaderCell>
                <Table.HeaderCell>Cédula</Table.HeaderCell>
                <Table.HeaderCell>Correo</Table.HeaderCell>
                <Table.HeaderCell>Teléfono</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>{this.renderTableRows(this.props.user.users)}</Table.Body>
          </Table>
          <Pagination defaultActivePage={1} ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }} firstItem={{ content: <Icon name="angle double left" />, icon: true }} lastItem={{ content: <Icon name="angle double right" />, icon: true }} prevItem={{ content: <Icon name="angle left" />, icon: true }} nextItem={{ content: <Icon name="angle right" />, icon: true }} totalPages={1} />
        </div>
      </Dimmer.Dimmable>;
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(UsersTable);

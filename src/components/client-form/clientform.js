import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Form, Button, Card, Input, Dimmer, Loader, Dropdown, TextArea } from "semantic-ui-react";

//Logic
import { createClient, modifyClient } from "../../redux/actions/client";

class ClientForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false || this.props.edit,
      nombres: "",
      appelidos: "",
      cedula: "",
      telefono: "",
      direccion: "",
      correo: "",
      estado: 1
    };
  }

  componentDidMount = () => {
    if (this.state.edit) {
      const { nombres, appelidos, cedula, telefono, direccion, correo, estado } = this.props.data;
      this.setState({
        nombres,
        appelidos,
        cedula,
        telefono,
        direccion,
        correo,
        estado: parseInt(estado)
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.edit) {
      const client = {
        ...this.props.data,
        nombres: this.state.nombres,
        appelidos: this.state.appelidos,
        cedula: this.state.cedula,
        telefono: this.state.telefono,
        direccion: this.state.direccion,
        correo: this.state.correo,
        estado: String(this.state.estado)
      };
      return this.props.dispatch(modifyClient(client, this.props.onClose));
    }
    const client = {
      nombres: this.state.nombres,
      appelidos: this.state.appelidos,
      cedula: this.state.cedula,
      telefono: this.state.telefono,
      direccion: this.state.direccion,
      correo: this.state.correo
    };
    this.props.dispatch(createClient(client, this.props.onClose));
  };

  handleInputOnChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDropdownChange = (e, { value }) => {
    e.preventDefault();
    this.setState({ estado: value });
  };

  render() {
    const title = this.state.edit ? "Modificando Cliente" : "Creando Cliente";
    const label = this.state.edit ? "Modificar" : "Agregar";
    const options = [
      {
        text: "Activo",
        value: 1
      },
      {
        text: "Inactivo",
        value: 0
      }
    ];
    if (!this.state.edit) {
      return (
        <Dimmer.Dimmable blurring dimmed={this.props.client.isFetching}>
          <Dimmer page active={this.props.client.isFetching}>
            <Loader size="huge">Loading...</Loader>
          </Dimmer>
          <Card fluid centered className="boxContainer">
            <Card.Content>
              <Card.Header className="font font-22" textAlign="center">
                {title}
              </Card.Header>
              <Card.Meta className="font font-16" textAlign="center">
                Complete los campos del formulario
              </Card.Meta>
              <Form className="spacerTop space-30" size="huge">
                <Form.Field>
                  <Input
                    icon="user"
                    iconPosition="left"
                    placeholder="Nombres"
                    name="nombres"
                    value={this.state.nombres}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    icon="user"
                    iconPosition="left"
                    placeholder="Apellidos"
                    name="appelidos"
                    value={this.state.appelidos}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    icon="id badge"
                    iconPosition="left"
                    placeholder="Cedula"
                    name="cedula"
                    value={this.state.cedula}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    icon="phone"
                    iconPosition="left"
                    placeholder="Telefono"
                    name="telefono"
                    value={this.state.telefono}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    icon="mail"
                    iconPosition="left"
                    placeholder="Correo"
                    name="correo"
                    value={this.state.correo}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <TextArea
                    rows={2}
                    placeholder="Direccion"
                    name="direccion"
                    value={this.state.direccion}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Button
                  fluid
                  size="huge"
                  type="submit"
                  className="primaryBtn spacerTop space-30"
                  onClick={this.handleSubmit}
                >
                  {label}
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </Dimmer.Dimmable>
      );
    } else {
      return (
        <Dimmer.Dimmable blurring dimmed={this.props.client.isFetching}>
          <Dimmer page active={this.props.client.isFetching}>
            <Loader size="huge">Loading...</Loader>
          </Dimmer>
          <Card fluid centered className="boxContainer">
            <Card.Content>
              <Card.Header className="font font-22" textAlign="center">
                {title}
              </Card.Header>
              <Card.Meta className="font font-16" textAlign="center">
                Complete los campos del formulario
              </Card.Meta>
              <Form className="spacerTop space-30" size="huge">
                <Form.Field>
                  <Input
                    icon="user"
                    iconPosition="left"
                    placeholder="Nombres"
                    name="nombres"
                    value={this.state.nombres}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    icon="user"
                    iconPosition="left"
                    placeholder="Apellidos"
                    name="appelidos"
                    value={this.state.appelidos}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    icon="id badge"
                    iconPosition="left"
                    placeholder="Cedula"
                    name="cedula"
                    value={this.state.cedula}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    icon="phone"
                    iconPosition="left"
                    placeholder="Telefono"
                    name="telefono"
                    value={this.state.telefono}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    icon="mail"
                    iconPosition="left"
                    placeholder="Correo"
                    name="correo"
                    value={this.state.correo}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <TextArea
                    rows={2}
                    placeholder="Direccion"
                    name="direccion"
                    value={this.state.direccion}
                    onChange={this.handleInputOnChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Dropdown
                    name="estado"
                    selection
                    options={options}
                    value={this.state.estado}
                    onChange={this.handleDropdownChange}
                  />
                </Form.Field>
                <Button
                  fluid
                  size="huge"
                  type="submit"
                  className="primaryBtn spacerTop space-30"
                  onClick={this.handleSubmit}
                >
                  {label}
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </Dimmer.Dimmable>
      );
    }
  }
}

function mapStateToProps({ client }) {
  return { client };
}

export default connect(mapStateToProps)(ClientForm);

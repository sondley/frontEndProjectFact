import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Form, Button, Card, Input, Dimmer, Loader, TextArea } from "semantic-ui-react";

//Internal Components
import PasswordInput from "../password-input/passwordinput";

//Logic
import { createUser, modifyUser } from "../../redux/actions/user";

class UserForm extends PureComponent {
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
      password: "",
      usuario: ""
    };
  }

  componentDidMount = () => {
    if (this.state.edit) {
      this.setState({
        nombres: this.props.data.nombres,
        appelidos: this.props.data.appelidos,
        cedula: this.props.data.cedula,
        telefono: this.props.data.telefono,
        direccion: this.props.data.direccion,
        correo: this.props.data.correo,
        usuario: this.props.data.usuario,
        password: this.props.data.password
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.edit) {
      const user = {
        ...this.props.data,
        nombres: this.state.nombres,
        appelidos: this.state.appelidos,
        cedula: this.state.cedula,
        telefono: this.state.telefono,
        direccion: this.state.direccion,
        correo: this.state.correo,
        password: this.state.password,
        usuario: this.state.usuario
      };
      return this.props.dispatch(modifyUser(user, this.props.onClose));
    }
    const user = {
      nombres: this.state.nombres,
      appelidos: this.state.appelidos,
      cedula: this.state.cedula,
      telefono: this.state.telefono,
      direccion: this.state.direccion,
      correo: this.state.correo,
      password: this.state.password,
      usuario: this.state.usuario
    };
    this.props.dispatch(createUser(user, this.props.onClose));
  };

  handleInputOnChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const title = this.state.edit ? "Modificando" : "Registrarse";
    const label = this.state.edit ? "Modificar" : "Agregar";
    return (
      <Dimmer.Dimmable blurring dimmed={this.props.user.isFetching}>
        <Dimmer page active={this.props.user.isFetching}>
          <Loader size="huge">Loading...</Loader>
        </Dimmer>
        <Card fluid centered className="boxContainerWide">
          <Card.Content>
            <Card.Header className="font font-22" textAlign="center">
              {title}
            </Card.Header>
            <Card.Meta className="font font-16" textAlign="center">
              Complete los campos del formulario
            </Card.Meta>
            <Form className="spacerTop space-30" size="huge">
              <div className="row">
                <div className="spacerRight">
                  <Form.Field>
                    <Input
                      icon="user"
                      iconPosition="left"
                      placeholder="Nombres"
                      name="nombres"
                      type="text"
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
                      type="text"
                      value={this.state.appelidos}
                      onChange={this.handleInputOnChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      icon="id card"
                      iconPosition="left"
                      placeholder="Cédula"
                      name="cedula"
                      type="number"
                      value={this.state.cedula}
                      onChange={this.handleInputOnChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      icon="phone"
                      iconPosition="left"
                      placeholder="Teléfono"
                      name="telefono"
                      type="tel"
                      value={this.state.telefono}
                      onChange={this.handleInputOnChange}
                    />
                  </Form.Field>
                </div>
                <div className="spacerLeft">
                  <Form.Field>
                    <Input
                      icon="mail"
                      iconPosition="left"
                      placeholder="Email"
                      name="correo"
                      type="email"
                      value={this.state.correo}
                      onChange={this.handleInputOnChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Input
                      icon="user"
                      iconPosition="left"
                      placeholder="Usuario"
                      name="usuario"
                      type="text"
                      value={this.state.usuario}
                      onChange={this.handleInputOnChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <PasswordInput
                      placeholder="Contraseña"
                      name="password"
                      value={this.state.password}
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
                </div>
              </div>
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

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(UserForm);

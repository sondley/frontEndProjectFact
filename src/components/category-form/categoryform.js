import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Form, Button, Card, Input, Dimmer, Loader, Dropdown } from "semantic-ui-react";

//Logic
import { createCategory, modifyCategory } from "../../redux/actions/category";

class CategoryForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      edit: false || this.props.edit,
      categoria: "",
      estado: 1
    };
  }

  componentDidMount = () => {
    if (this.state.edit) {
      this.setState({
        categoria: this.props.data.categoria,
        estado: parseInt(this.props.data.estado)
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.edit) {
      const category = {
        ...this.props.data,
        categoria: this.state.categoria,
        estado: String(this.state.estado)
      };
      return this.props.dispatch(modifyCategory(category, this.props.onClose));
    }
    const category = { categoria: this.state.categoria };
    this.props.dispatch(createCategory(category, this.props.onClose));
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
    const title = this.state.edit ? "Modificando Categorias" : "Creando Categorias";
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
        <Dimmer.Dimmable blurring dimmed={this.props.category.isFetching}>
          <Dimmer page active={this.props.category.isFetching}>
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
                    icon="tag"
                    iconPosition="left"
                    placeholder="Categoria"
                    name="categoria"
                    type="text"
                    value={this.state.categoria}
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
        <Dimmer.Dimmable blurring dimmed={this.props.category.isFetching}>
          <Dimmer page active={this.props.category.isFetching}>
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
                    icon="tag"
                    iconPosition="left"
                    placeholder="Categoria"
                    name="categoria"
                    type="text"
                    value={this.state.categoria}
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

function mapStateToProps({ category }) {
  return { category };
}

export default connect(mapStateToProps)(CategoryForm);

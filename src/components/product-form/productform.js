import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Form, Button, Card, Input, Dimmer, Loader, Dropdown } from "semantic-ui-react";

//Logic
import { createProduct, modifyProduct } from "../../redux/actions/product";

class ProductForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      edit: false || this.props.edit,
      producto: "",
      presentacion: "",
      unidad: "",
      moneda: "",
      stock: "",
      precio_compra: "",
      precio_venta: "",
      imagen: "",
      codigo_b: "",
      categoria_id: "",
      estado: 1
    };
  }

  componentDidMount = () => {
    if (this.state.edit) {
      const {
        producto,
        presentacion,
        unidad,
        moneda,
        stock,
        precio_compra,
        precio_venta,
        imagen,
        codigo_b,
        categoria_id,
        estado
      } = this.props.data;
      this.setState({
        producto,
        presentacion,
        unidad,
        moneda,
        stock,
        precio_compra,
        precio_venta,
        imagen,
        codigo_b,
        categoria_id,
        estado: parseInt(estado)
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.edit) {
      const product = {
        ...this.props.data,
        producto: this.state.producto,
        presentacion: this.state.presentacion,
        unidad: this.state.unidad,
        moneda: this.state.moneda,
        stock: this.state.stock,
        precio_compra: this.state.precio_compra,
        precio_venta: this.state.precio_venta,
        imagen: this.state.imagen,
        codigo_b: this.state.codigo_b,
        categoria_id: this.state.categoria_id,
        estado: String(this.state.estado)
      };
      return this.props.dispatch(modifyProduct(product, this.props.onClose));
    }
    const product = {
      producto: this.state.producto,
      presentacion: this.state.presentacion,
      unidad: this.state.unidad,
      moneda: this.state.moneda,
      stock: parseInt(this.state.stock),
      precio_compra: parseInt(this.state.precio_compra),
      precio_venta: parseInt(this.state.precio_venta),
      imagen: this.state.imagen,
      codigo_b: this.state.codigo_b,
      categoria_id: this.state.categoria_id
    };
    this.props.dispatch(createProduct(product, this.props.onClose));
  };

  handleInputOnChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDropdownChange = (e, data) => {
    e.preventDefault();
    const { name, value } = data;
    this.setState({ [name]: value });
  };

  render() {
    const title = this.state.edit ? "Modificando Producto" : "Creando Producto";
    const label = this.state.edit ? "Modificar" : "Agregar";
    const Categories = this.props.category.categories.map(item => {
      return { text: item.categoria, value: item.id };
    });
    const estadoOptions = [{ text: "Activo", value: 1 }, { text: "Inactivo", value: 0 }];
    const monedaOptions = [{ text: "RD$", value: "RD$" }, { text: "US$", value: "US$" }];
    if (!this.state.edit) {
      return (
        <Dimmer.Dimmable blurring dimmed={this.props.product.isFetching}>
          <Dimmer page active={this.props.product.isFetching}>
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
                        placeholder="Nombre del Producto"
                        name="producto"
                        value={this.state.producto}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="id badge"
                        iconPosition="left"
                        placeholder="Presentacion"
                        name="presentacion"
                        value={this.state.presentacion}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="tag"
                        iconPosition="left"
                        placeholder="Unidad"
                        name="unidad"
                        value={this.state.unidad}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="box"
                        iconPosition="left"
                        placeholder="Inventario"
                        name="stock"
                        value={this.state.stock}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Dropdown
                        name="moneda"
                        selection
                        options={monedaOptions}
                        value={this.state.moneda}
                        onChange={this.handleDropdownChange}
                      />
                    </Form.Field>
                  </div>
                  <div className="spacerLeft">
                    <Form.Field>
                      <Input
                        icon="dollar sign"
                        iconPosition="left"
                        placeholder="Precio de Compra"
                        name="precio_compra"
                        value={this.state.precio_compra}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="dollar sign"
                        iconPosition="left"
                        placeholder="Precio de Venta"
                        name="precio_venta"
                        value={this.state.precio_venta}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="image"
                        iconPosition="left"
                        placeholder="Imagen"
                        name="imagen"
                        value={this.state.imagen}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="barcode"
                        iconPosition="left"
                        placeholder="Codigo de Barra"
                        name="codigo_b"
                        value={this.state.codigo_b}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Dropdown
                        name="categoria_id"
                        selection
                        options={Categories}
                        value={this.state.categoria_id}
                        onChange={this.handleDropdownChange}
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
    } else {
      return (
        <Dimmer.Dimmable blurring dimmed={this.props.product.isFetching}>
          <Dimmer page active={this.props.product.isFetching}>
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
                        placeholder="Nombre del Producto"
                        name="producto"
                        value={this.state.producto}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="id badge"
                        iconPosition="left"
                        placeholder="Presentacion"
                        name="presentacion"
                        value={this.state.presentacion}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="tag"
                        iconPosition="left"
                        placeholder="Unidad"
                        name="unidad"
                        value={this.state.unidad}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="box"
                        iconPosition="left"
                        placeholder="Inventario"
                        name="stock"
                        value={this.state.stock}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Dropdown
                        name="moneda"
                        selection
                        options={monedaOptions}
                        value={this.state.moneda}
                        onChange={this.handleDropdownChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="dollar sign"
                        iconPosition="left"
                        placeholder="Precio de Compra"
                        name="precio_compra"
                        value={this.state.precio_compra}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                  </div>
                  <div className="spacerLeft">
                    <Form.Field>
                      <Input
                        icon="dollar sign"
                        iconPosition="left"
                        placeholder="Precio de Venta"
                        name="precio_venta"
                        value={this.state.precio_venta}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="image"
                        iconPosition="left"
                        placeholder="Imagen"
                        name="imagen"
                        value={this.state.imagen}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Input
                        icon="barcode"
                        iconPosition="left"
                        placeholder="Codigo de Barra"
                        name="codigo_b"
                        value={this.state.codigo_b}
                        onChange={this.handleInputOnChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Dropdown
                        name="categoria_id"
                        selection
                        options={Categories}
                        value={this.state.categoria_id}
                        onChange={this.handleDropdownChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <Dropdown
                        name="estado"
                        selection
                        options={estadoOptions}
                        value={this.state.estado}
                        onChange={this.handleDropdownChange}
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
}

function mapStateToProps({ product, category }) {
  return { product, category };
}

export default connect(mapStateToProps)(ProductForm);

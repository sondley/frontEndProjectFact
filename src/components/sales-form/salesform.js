import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Form, Button, Input, Dimmer, Loader, Divider, Table, Dropdown } from "semantic-ui-react";
import { find } from "lodash";

//Logic
import { createSale } from "../../redux/actions/sales";

class SalesForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      numero_venta: "",
      vendedor: "",
      moneda: "RD$",
      subtotal: 0,
      total_iva: 0,
      total: 0,
      tipo_pago: "Efectivo",
      descuento: 0,
      importe: "importe",
      cliente_id: "",
      productos: []
    };
  }

  resetFields = () => {
    this.setState({
      numero_venta: "",
      vendedor: "",
      moneda: "RD$",
      subtotal: 0,
      total_iva: 0,
      total: 0,
      tipo_pago: "Efectivo",
      descuento: 0,
      importe: "importe",
      cliente_id: "",
      productos: []
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let sales = {
      numero_venta: this.state.numero_venta,
      vendedor: this.state.vendedor,
      moneda: this.state.moneda,
      subtotal: this.state.subtotal,
      total_iva: this.state.total_iva,
      total: this.state.total,
      tipo_pago: this.state.tipo_pago,
      descuento: this.state.descuento,
      importe: this.state.importe,
      cliente_id: this.state.cliente_id,
      productos: this.state.productos.map(item => {
        return { producto_id: item.id, cantidad: item.cantidad };
      })
    };
    this.props.dispatch(createSale(sales, this.resetFields));
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

  handleAdd = (e, item) => {
    e.preventDefault();
    const productInList = find(this.state.productos, { id: item.id });
    if (productInList === undefined) {
      let product = { ...item, cantidad: 1 };
      let productList = this.state.productos.concat(product);
      const subtotal = this.state.subtotal + item.precio_venta;
      const total_iva = subtotal * 0.18;
      const total = subtotal + total_iva;
      return this.setState({ productos: productList, subtotal, total_iva, total });
    } else {
      let iQty = productInList.cantidad;
      if (iQty < productInList.stock) {
        let product = { ...productInList, cantidad: iQty + 1 };
        const productList = this.state.productos.map(child => {
          if (child.id !== item.id) {
            return child;
          }
          return { ...child, ...product };
        });
        const subtotal = this.state.subtotal + productInList.precio_venta;
        const total_iva = subtotal * 0.18;
        const total = subtotal + total_iva;
        return this.setState({ productos: productList, subtotal, total_iva, total });
      }
    }
  };

  handleSubstract = (e, item) => {
    e.preventDefault();
    const productInList = find(this.state.productos, { id: item.id });
    let iQty = productInList.cantidad;
    if (iQty > 1) {
      let product = { ...productInList, cantidad: iQty - 1 };
      const productList = this.state.productos.map(child => {
        if (child.id !== item.id) {
          return child;
        }
        return { ...child, ...product };
      });
      const subtotal = this.state.subtotal - productInList.precio_venta;
      const total_iva = subtotal * 0.18;
      const total = subtotal + total_iva;
      return this.setState({ productos: productList, subtotal, total_iva, total });
    } else {
      const productList = this.state.productos.filter(({ id }) => id !== item.id);
      const subtotal = this.state.subtotal - item.precio_venta;
      const total_iva = subtotal * 0.18;
      const total = subtotal + total_iva;
      return this.setState({ productos: productList, subtotal, total_iva, total });
    }
  };

  renderProductTableRows = data => {
    const rows = data.map(item => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.producto}</Table.Cell>
          <Table.Cell>{item.stock}</Table.Cell>
          <Table.Cell>{item.precio_venta}</Table.Cell>
          <Table.Cell collapsing>
            <Button
              icon="add"
              color="green"
              onClick={e => {
                this.handleAdd(e, item);
              }}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
    return rows;
  };

  renderTableRows = data => {
    const rows = data.map(item => {
      const price = item.precio_venta * item.cantidad;
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.producto}</Table.Cell>
          <Table.Cell>{item.cantidad}</Table.Cell>
          <Table.Cell>{price}</Table.Cell>
          <Table.Cell collapsing>
            <Button
              icon="minus"
              color="red"
              onClick={e => {
                this.handleSubstract(e, item);
              }}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
    return rows;
  };

  render() {
    const { nombres, appelidos } = this.props.user.authedUser;
    const username = nombres + " " + appelidos;

    const Clients = this.props.client.clients.map(item => {
      return { text: item.nombres, value: item.id };
    });

    return (
      <Dimmer.Dimmable blurring dimmed={this.props.sales.isFetching}>
        <Dimmer page active={this.props.sales.isFetching}>
          <Loader size="huge">Loading...</Loader>
        </Dimmer>
        <div className="titleCenter">Ventas</div>
        <div className="centerContainer">
          <div className="columnContainer">
            <Divider horizontal>Productos</Divider>
            <Table compact celled striped size="large">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Producto</Table.HeaderCell>
                  <Table.HeaderCell>Inventario</Table.HeaderCell>
                  <Table.HeaderCell>Precio de Venta</Table.HeaderCell>
                  <Table.HeaderCell>Acciones</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>{this.renderProductTableRows(this.props.product.products)}</Table.Body>
            </Table>
          </div>
          <Divider vertical />
          <div className="columnContainer">
            <Divider horizontal>Factura</Divider>
            <Form>
              <Form.Group grouped>
                <Form.Field required>
                  <label className="labelSpacing">Numero de Factura</label>
                  <Input
                    name="numero_venta"
                    onChange={this.handleInputOnChange}
                    value={this.state.numero_venta}
                  />
                </Form.Field>
                <Form.Field required>
                  <label className="labelSpacing">Vendedor</label>
                  <Input name="vendedor" value={username} disabled />
                </Form.Field>
                <Form.Field required>
                  <label className="labelSpacing">Cliente</label>
                  <Dropdown
                    name="cliente_id"
                    selection
                    options={Clients}
                    value={this.state.cliente_id}
                    onChange={this.handleDropdownChange}
                  />
                </Form.Field>
                <Table compact celled striped size="large">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Producto</Table.HeaderCell>
                      <Table.HeaderCell>Cantidad</Table.HeaderCell>
                      <Table.HeaderCell>Precio</Table.HeaderCell>
                      <Table.HeaderCell>Acciones</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{this.renderTableRows(this.state.productos)}</Table.Body>
                </Table>
                <Form.Field required>
                  <label className="labelSpacing">Subtotal</label>
                  <Input name="subtotal" value={this.state.subtotal} disabled />
                </Form.Field>
                <Form.Field required>
                  <label className="labelSpacing">Itbis</label>
                  <Input name="total_iva" value={this.state.total_iva} disabled />
                </Form.Field>
                <Form.Field required>
                  <label className="labelSpacing">Total</label>
                  <Input name="total" value={this.state.total} disabled />
                </Form.Field>
              </Form.Group>
            </Form>
          </div>
        </div>
        <div>
          <Button
            fluid
            size="huge"
            type="submit"
            className="primaryBtn spacerTop space-30"
            onClick={this.handleSubmit}
          >
            Procesar
          </Button>
        </div>
      </Dimmer.Dimmable>
    );
  }
}

function mapStateToProps({ product, category, client, sales, user }) {
  return { product, category, client, sales, user };
}

export default connect(mapStateToProps)(SalesForm);

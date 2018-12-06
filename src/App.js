import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/protected-route/protectedroute";

//Screens
import Dashboard from "./screens/dashboard/dashboard";
import LoginScreen from "./screens/loginscreen/loginscreen";
import UserScreen from "./screens/acceso/user";
import ExpensesScreen from "./screens/compras/expenses";
import ProvidersScreen from "./screens/compras/providers";
import IncomeScreen from "./screens/ventas/income";
import ClientsScreen from "./screens/ventas/clients";
import CategoryScreen from "./screens/almacen/category";
import ProductScreen from "./screens/almacen/product";
import SalesInquiryScreen from "./screens/consultas/consultaventas";
import ShoppingInquiryScreen from "./screens/consultas/consultacompras";

class App extends Component {
  render() {
    const { isLoggedIn } = this.props.user;
    return (
      <div id="App" className="App">
        <Switch>
          <Route exact path={"/"} component={LoginScreen} />
          <Route path={"/login"} component={LoginScreen} />
          <ProtectedRoute isLoggedIn={isLoggedIn} path={"/dashboard"} component={Dashboard} />
          <ProtectedRoute isLoggedIn={isLoggedIn} path={"/almacen/articulos"} component={ProductScreen} />
          <ProtectedRoute isLoggedIn={isLoggedIn} path={"/almacen/categorias"} component={CategoryScreen} />
          <ProtectedRoute isLoggedIn={isLoggedIn} path={"/compras/compras"} component={ExpensesScreen} />
          <ProtectedRoute isLoggedIn={isLoggedIn} path={"/compras/proveedores"} component={ProvidersScreen} />
          <ProtectedRoute isLoggedIn={isLoggedIn} path={"/ventas/ventas"} component={IncomeScreen} />
          <ProtectedRoute isLoggedIn={isLoggedIn} path={"/ventas/clientes"} component={ClientsScreen} />
          <ProtectedRoute isLoggedIn={isLoggedIn} path={"/acceso/usuarios"} component={UserScreen} />
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path={"/consultas/consulta_ventas"}
            component={SalesInquiryScreen}
          />
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path={"/consultas/consulta_compras"}
            component={ShoppingInquiryScreen}
          />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(connect(mapStateToProps)(App));

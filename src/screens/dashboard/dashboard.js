import React, { Component } from 'react';

//Components
import CustomMenu from "../../components/custom-menu/custom-menu";


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toRegister: false
    }
  }

  handleNavigate = (e) => {
    e.preventDefault();
    this.setState({ toRegister: true });
  }

  render() {
    return (
      <CustomMenu>
        <div className="prueba-de-contenido">
          <h1>Bienvenido a FacturaX</h1>
        </div>
      </CustomMenu>
    );
  }
}

export default Dashboard;

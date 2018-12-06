import React, { Component } from "react";
import Logo from "../../assets/logo.PNG";

class sidebarLogo extends Component {
  render() {
    return (
      <div>
        <img className="responsive-img" src={Logo} alt="hey" width={"180px"} />
      </div>
    );
  }
}

export default sidebarLogo;

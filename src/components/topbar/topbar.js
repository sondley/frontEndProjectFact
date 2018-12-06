import React, { Component } from "react";
import { Label, Icon, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import "./topbar.css";
import { logout } from "../../redux/actions/user";

class TopBar extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.dispatch(logout());
  };

  render() {
    const { nombres, appelidos } = this.props.user.authedUser;
    const username = nombres +" "+appelidos;

    const perfil = [
      {
        key: 1,
        icon: "sign-out",
        text: "Log Out",
        value: 2,
        onClick: this.handleClick,
        style: { fontSize: "20px" }
      }
    ];

    return (
      <div className="topbar-container">
        <div className="topbar-menu-button-label">
          <Label tag color="black" size="large">
            {"FacturaX"}
          </Label>
        </div>
        <div className="topbar-profile-notification-container">
          <div style={{ fontSize: "20px" }}>
            <Icon name="user" />
            <Dropdown text={username} options={perfil} pointing="top right" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(TopBar);

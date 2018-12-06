import React, { Component } from "react";
import { isArray } from "lodash";

//Internal Components
import SidebarMenu from "../../components/sidebar-menu/sidebar-menu";
import TopBar from "../../components/topbar/topbar";

//Styles
import "./custom-menu.css";

const data = [
  {
    titleName: "dashboard",
    titleIcon: "tv",
    titleLabel: "Dashboard",
    titleIndex: 0,
    content: []
  },
  {
    titleName: "almacen",
    titleIcon: "archive",
    titleLabel: "Almacén",
    titleIndex: 1,
    content: [
      {
        subindex: 0,
        icon: "user",
        name: "articulos",
        label: "Artículos"
      },
      {
        subindex: 1,
        name: "categorias",
        label: "Categorías"
      }
    ]
  },
  {
    titleName: "compras",
    titleIcon: "money bill alternate outline",
    titleLabel: "Compras",
    titleIndex: 2,
    content: [
      {
        subindex: 0,
        name: "compras",
        label: "Compras"
      },
      {
        subindex: 1,
        name: "proveedores",
        label: "Proveedores"
      }
    ]
  },
  {
    titleName: "ventas",
    titleIcon: "shopping cart",
    titleLabel: "Ventas",
    titleIndex: 3,
    content: [
      {
        subindex: 0,
        name: "ventas",
        label: "Ventas"
      },
      {
        subindex: 1,
        name: "clientes",
        label: "Clientes"
      }
    ]
  },
  {
    titleName: "acceso",
    titleIcon: "users",
    titleLabel: "Acceso",
    titleIndex: 4,
    content: [
      {
        subindex: 0,
        name: "usuarios",
        label: "Usuarios"
      }
    ]
  },
  {
    titleName: "consultas",
    titleIcon: "chart bar outline",
    titleLabel: "Consultas",
    titleIndex: 5,
    content: [
      {
        subindex: 0,
        name: "consulta_compras",
        label: "Consulta Compras"
      },
      {
        subindex: 1,
        name: "consulta_ventas",
        label: "Consulta Ventas"
      }
    ]
  }
];

class CustomMenu extends Component {
  renderChildren = children => {
    if (isArray(children)) {
      const items = children.map((child, index) => {
        return (
          <div className="contentContainer" key={index}>
            {child}
          </div>
        );
      });
      return items;
    } else {
      return <div className="contentContainer">{children}</div>;
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div className="custom-menu-container">
        <div className="sidebar-box">
          <SidebarMenu data={data} />
        </div>
        <div className="right-box">
          <TopBar />
          <div className="custom-menu-sidebar">
            {this.renderChildren(children)}
          </div>
        </div>
      </div>
    );
  }
}

export default CustomMenu;

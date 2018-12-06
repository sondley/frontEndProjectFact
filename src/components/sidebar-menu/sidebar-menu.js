import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Accordion, Menu, Divider } from "semantic-ui-react";
import { isEmpty } from "lodash";

//Internal Components
import SidebarLogo from "../../components/sidebar-logo/sidebar-logo";
import SidebarItem from "../../components/sidebar-item/sidebar-item";

//Styles
import "./sidebar-menu.css";

//Logic
import { menuNavigation } from "../../redux/actions/navigate";

class SidebarMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      navigate: false,
      parentRoute: "" || this.props.navigation.route,
      navRoute: "",
      activeIndex: this.props.navigation.index,
      activeSubIndex: this.props.navigation.subIndex
    };
  }

  handleNoContentClick = (e, titleProps) => {
    const { index, name } = titleProps;
    const { activeIndex } = this.state;
    const newRoute = "/" + name;

    if (activeIndex !== index) {
      this.props.dispatch(menuNavigation(index, -1, newRoute));
      return this.setState({
        activeIndex: index,
        activeSubIndex: -1,
        navigate: true,
        navRoute: newRoute
      });
    }
  };

  handleTitleClick = (e, titleProps) => {
    const { index, name } = titleProps;
    const { activeIndex } = this.state;
    const newRoute = "/" + name;

    if (index === this.props.navigation.index) {
      return this.setState({
        activeIndex: index,
        activeSubIndex: this.props.navigation.subIndex,
        parentRoute: newRoute
      });
    }

    if (activeIndex !== index) {
      return this.setState({
        activeIndex: index,
        activeSubIndex: -1,
        parentRoute: newRoute
      });
    }
  };

  handleContentClick = e => {
    const subindex = parseInt(e.target.getAttribute("subindex"));
    const { activeSubIndex } = this.state;
    const newRoute = this.state.parentRoute + "/" + e.target.name;
    
    if (activeSubIndex !== subindex) {
      this.props.dispatch(
        menuNavigation(this.state.activeIndex, subindex, this.state.parentRoute)
      );
      return this.setState({
        navigate: true,
        navRoute: newRoute,
        activeSubIndex: subindex
      });
    }
  };

  renderMenuItems = data => {
    const items = data.map((item, index) => {
      const active = this.state.activeIndex === item.titleIndex ? true : false;

      if (!isEmpty(item.content)) {
        return (
          <SidebarItem
            key={index}
            titleName={item.titleName}
            titleIcon={item.titleIcon}
            titleLabel={item.titleLabel}
            titleIndex={item.titleIndex}
            titleActiveClass={"sidebar-menu-item"}
            content={item.content}
            activeSubIndex={this.state.activeSubIndex}
            onTitleClick={this.handleTitleClick}
            onContentClick={this.handleContentClick}
            active={active}
          />
        );
      } else {
        const activeClass = active
          ? "sidebar-menu-item-active"
          : "sidebar-menu-item";
        return (
          <SidebarItem
            key={index}
            titleName={item.titleName}
            titleIcon={item.titleIcon}
            titleLabel={item.titleLabel}
            titleIndex={item.titleIndex}
            titleActiveClass={activeClass}
            onTitleClick={this.handleNoContentClick}
            active={active}
          />
        );
      }
    });

    return items;
  };

  render() {
    const { data } = this.props;

    if (
      this.state.navigate === true &&
      window.location.pathname !== this.state.navRoute
    ) {
      return <Redirect push to={this.state.navRoute} />;
    }

    return (
      <div className="home-main-container">
        <div className="homepage-logo-container">
          <div className="homepage-blackcover">
            <div className="home-text-center">
              <SidebarLogo
                imgUrl={process.env.PUBLIC_URL + "/logo.svg"}
                width={"180px"}
              />
            </div>
            <Divider className="home-divider-color" />
            <div className="home-sidebarmenu-container">
              <Accordion
                className="sidebar-menu-item-container"
                as={Menu}
                vertical
                inverted
              >
                {this.renderMenuItems(data)}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ navigation }) {
  return {
    navigation
  };
}

export default connect(mapStateToProps)(SidebarMenu);

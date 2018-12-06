import React, { PureComponent } from "react";
import { Accordion, Menu, Icon, Item } from "semantic-ui-react";
import { isEmpty } from 'lodash';

//Styles
import "./sidebar-item.css";

class SidebarItem extends PureComponent {
  renderContent = (content, active, activeSubIndex, onContentClick) => {
    const items = content.map((item, index) => {
      const contentActive = (activeSubIndex === item.subindex && active) ? true : false;
      const activeSubClass = contentActive
        ? "sidebar-menu-item-active"
        : "item";
      return (
        <Item
          key={index}
          as="a"
          name={item.name}
          onClick={onContentClick}
          subindex={item.subindex}
          className={activeSubClass}
        >
          <Icon
            name={item.icon || "circle outline"}
            className="sidebar-menu-item-content-icon"
          />
          {item.label}
        </Item>
      );
    });

    return items;
  };

  render() {
    const {
      titleName,
      titleIcon,
      titleLabel,
      titleIndex,
      titleActiveClass,
      content,
      onTitleClick,
      onContentClick,
      active,
      activeSubIndex
    } = this.props;

    if (!isEmpty(content)) {
      return (
        <Menu.Item className={titleActiveClass}>
          <Accordion.Title
            active={active}
            content={
              <div>
                <Icon
                  name={titleIcon}
                  className="sidebar-menu-item-title-icon"
                />
                {titleLabel}
              </div>
            }
            className="sidebar-menu-item-title"
            index={titleIndex}
            name={titleName}
            onClick={onTitleClick}
          />
          <Accordion.Content
            active={active}
            content={this.renderContent(
              content,
              active,
              activeSubIndex,
              onContentClick
            )}
          />
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item className={titleActiveClass}>
          <Accordion.Title
            active={active}
            className="sidebar-menu-item-title"
            index={titleIndex}
            name={titleName}
            onClick={onTitleClick}
          >
            <div>
              <Icon name={titleIcon} className="sidebar-menu-item-title-icon" />
              {titleLabel}
            </div>
          </Accordion.Title>
        </Menu.Item>
      );
    }
  }
}

export default SidebarItem;

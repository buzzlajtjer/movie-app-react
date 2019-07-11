import React, { Component } from "react";

class ListGroup extends Component {
  render() {
    const {
      textProperty,
      valueProperty,
      items,
      selectedItem,
      onItemSelect
    } = this.props;

    return (
      <ul className="list-group">
        {items.map(item => (
          <li
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "hover list-group-item active"
                : "hover list-group-item"
            }
            onClick={() => onItemSelect(item)}
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;

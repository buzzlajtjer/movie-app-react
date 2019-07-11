import React, { Component } from "react";

class Like extends Component {
  render() {
    let classes = "hover fa fa-heart";
    if (!this.props.liked === true) classes += "-o";
    return (
      <i onClick={this.props.onClick} className={classes} aria-hidden="true" />
    );
  }
}

export default Like;

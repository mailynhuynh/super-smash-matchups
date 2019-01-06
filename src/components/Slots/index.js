import React, { Component } from "react";
import "./style.scss";

class Slot extends Component {
    render() {
        const { id, name } = this.props;
        return <div id={id}>{name}</div>;
    }
}

export default Slot;

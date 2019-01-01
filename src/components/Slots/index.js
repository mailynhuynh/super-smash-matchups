import React from "react";
import "./style.scss";

class Slot extends React.Component {
    render() {
        const { id, name } = this.props;
        return <div id={id}>{name}</div>;
    }
}

export default Slot;

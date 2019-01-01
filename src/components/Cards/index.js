import React from "react";

import "./style.scss";

const Cards = ({ id, color, handler, name, filled }) => {
    return (
        <div
            className={filled ? `card filled` : "card"}
            onClick={filled ? null : () => handler(id)}
        >
            <div className={`card-content`}>
                <div className="card-image" style={{ background: color }} />
                <div className="card-body">
                    <span className="name">{name}</span>
                </div>
            </div>
            <div className={filled ? `overlay` : null} />
        </div>
    );
};

export default Cards;

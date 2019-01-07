import React from "react";

import "./style.scss";

const Cards = ({ id, image, handler, name, filled }) => {
    return (
        <div
            className={filled ? `card filled` : "card"}
            onClick={filled ? null : () => handler(id)}
        >
            <div className={`card-content`}>
                <img src={image} alt={name} />
                <div className="card-body">
                    <span className="name">{name}</span>
                </div>
            </div>
            <div className={filled ? `overlay` : null} />
        </div>
    );
};

export default Cards;

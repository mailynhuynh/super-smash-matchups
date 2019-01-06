import React from "react";

// Styles
import "./style.scss"

const Spinner = ({ text }) => {
    return (
        <div className="loading-container">
            <div className="spinner">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
            </div>
            <p>{text}</p>
        </div>
    );
};

export default Spinner;

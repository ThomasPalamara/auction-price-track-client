import React from "react";

const PriceCoinDisplay = (props) => (
    <div>
        <span>{props.price.toString().slice(0, -4)} <i className="money-icon gold" /> </span>
        <span>{props.price.toString().slice(-4, -2)} <i className="money-icon silver" /> </span>
        <span>{props.price.toString().slice(-2)} <i className="money-icon copper" /> </span>
    </div>
);

export default PriceCoinDisplay;
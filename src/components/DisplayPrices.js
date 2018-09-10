import React from "react";
import { connect } from 'react-redux';


const DisplayPrices = (props) => (
    <div>
    d
    </div>
);

const mapStatetoProps = state => {

    return {
        product: state.product,
        ingredient: state.ingredient

    }
};

export default connect(mapStatetoProps)(DisplayPrices);
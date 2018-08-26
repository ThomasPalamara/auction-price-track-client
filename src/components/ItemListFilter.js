import React from "react";
import { connect } from "react-redux";
import { setTextFilter } from "../actions/filters";

const ItemListFilter = (props) => (
    <div className="InputTextFilter">
        <input
            type="text"
            value={props.filters.text}
            placeholder="Filtrer les objets"
            onChange={e => {
                props.dispatch(setTextFilter(e.target.value));
            }} />
    </div>
);


const mapStateToProps = state => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ItemListFilter);
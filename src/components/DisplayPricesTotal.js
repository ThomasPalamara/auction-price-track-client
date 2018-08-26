import React from "react";
import { connect } from 'react-redux';
import DisplayPricesTable from './DisplayPricesTable';
import PriceCoinDisplay from "./PriceCoinDisplay";
import { Row, Col } from 'antd';
import { editQuantityIngredient } from '../actions/ingredient';
import { editQuantityProduct } from '../actions/product';

class DisplayPricesTotal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getPriceForQuantity = (auctions, need) => {
        let qteactu = 0;
        let result = 0
        auctions.prices.map((element) => {
            if (need > qteactu) {
                let qte = Math.min(need - qteactu, element.quantity);
                result += qte * element.price
                qteactu += qte
                console.log(result);
            }
        });
        return result;
    }

    getTotal = () => {
        let totalProduct = 0;
        let totalIngredient = 0;

        this.props.product.map((element) => {
            const itemElem = this.props.auctionHouse.find(elem => elem.item_id === element.id.toString()); 
            totalProduct += this.getPriceForQuantity(itemElem.auctions[0], element.quantity);
        });

        this.props.ingredient.map((element) => {
            const itemElem = this.props.auctionHouse.find(elem => elem.item_id === element.id.toString()); 
            totalIngredient += this.getPriceForQuantity(itemElem.auctions[0], element.quantity);
        });

        const profit = totalProduct - totalIngredient;

        return {totalProduct, totalIngredient, profit};
    }

    render() {
        return (
            <Row>
                <Col span={8}><PriceCoinDisplay price={this.getTotal().totalProduct}/></Col>
                <Col span={8}><PriceCoinDisplay price={this.getTotal().profit}/></Col>
                <Col span={8}><PriceCoinDisplay price={this.getTotal().totalIngredient}/></Col>
            </Row>
        );
    }
}

const mapStatetoProps = state => {

    return {
        product: state.product,
        ingredient: state.ingredient

    }
};

export default connect(mapStatetoProps)(DisplayPricesTotal);
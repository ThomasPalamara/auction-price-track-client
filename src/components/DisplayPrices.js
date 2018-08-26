import React from "react";
import { connect } from 'react-redux';
import DisplayPricesTable from './DisplayPricesTable';
import DisplayPricesTotal from './DisplayPricesTotal';
import { Row, Col } from 'antd';
import { editQuantityIngredient } from '../actions/ingredient';
import { editQuantityProduct } from '../actions/product';


const DisplayPrices = (props) => (
    <div>
        <Row>
            <Col span={24}>
                <DisplayPricesTotal auctionHouse={props.auctionHouse} />
            </Col>
        </Row>
        <Row>
            <Col span={12}>
                <DisplayPricesTable auctionHouse={props.auctionHouse} editQuantity={editQuantityProduct} items={props.product} />
            </Col>
            <Col span={12}>
                <DisplayPricesTable auctionHouse={props.auctionHouse} editQuantity={editQuantityIngredient} items={props.ingredient} />
            </Col>
        </Row>
    </div>
);

const mapStatetoProps = state => {

    return {
        product: state.product,
        ingredient: state.ingredient

    }
};

export default connect(mapStatetoProps)(DisplayPrices);


//Tableau de toutes les auctions pour chaque item
// {this.props.product &&
//     this.props.product.map((item) => {
//         const itemElem = this.props.auctionHouse.find(elem => elem.item_id === item.id.toString())
//         const totalPrice = item.quantity
//         return (
//             <div>
//                 <p>{item.name}</p>
//                 <InputNumber min={0} defaultValue={1}
//                     onChange={(value) => {
//                         this.props.dispatch(editQuantityProduct({ id: item.id, quantity: value }))
//                     }} />
//             </div>
//         )
//     })}
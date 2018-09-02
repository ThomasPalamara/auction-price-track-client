import React from "react";
import { connect } from 'react-redux';
import DisplayPricesTable from './DisplayPricesTable';
import { InputNumber, Table } from 'antd';
import PriceCoinDisplay from "./PriceCoinDisplay";


class DisplayPrices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    getPriceForQuantity = (auctions, need) => {
        let qteactu = 0;
        let result = 0;
        auctions.prices.map((element) => {
            if (need > qteactu) {
                let qte = Math.min(need - qteactu, element.quantity);
                result += qte * element.price;
                qteactu += qte;
            }
        });
        return result;
    }

    render() {
        return (
            <div>
                <p>Prix de vos ventes</p>
                <Table
                    columns={[{
                        title: 'Nom',
                        dataIndex: 'name',
                        key: 'name',
                        render: (text,record) => (
                            <a
                                data-wowhead={`item=${record.key}`}
                                href="#"
                            >{text}</a>
                        ),
                    }, {
                        title: 'Prix total',
                        dataIndex: 'totalPrice',
                        key: 'totalPrice',
                        render: (text, record) => {
                            if (record.itemExists) {
                                return (<PriceCoinDisplay price={text}/>)
                            } else {
                                return <p>{record.text}</p>
                            }
                        },
                    }, {
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => (
                            <span>
                                <InputNumber min={0} max={record.quantityMax} defaultValue={1} disabled={!record.itemExists}
                                    onChange={(value) => {
                                        this.props.dispatch(this.props.editQuantity({ id: record.key, quantity: value }))
                                    }} />
                            </span>
                        ),
                    }, {
                        title: 'Details des encheres',
                        key: 'auctionsDetails',
                        render: (text, record) => {
                            if (record.itemExists) {
                                // return <DisplayPricesTable auctions={record.auctions} /> 
                            } else {
                                return <p>!</p>
                            }
                        }
                    }]}
                    /*---- DATASOURCE ----*/
                    dataSource={
                        this.props.items.map((element, i) => {
                            const itemElem = this.props.auctionHouse.find(elem => elem.item_id === element.id.toString()); //object of itemModel from auctionHouse
                            if (!itemElem) {
                                return (
                                    {
                                        key: element.id,
                                        name: element.name[this.props.itemLanguage],
                                        auctions: null,
                                        totalPrice: "Aucune enchere pour cet objet",
                                        quantityMax: 0,
                                        itemExists: false
                                    }
                                )
                            } else {
                                return (
                                    {
                                        key: element.id,
                                        name: element.name[this.props.itemLanguage],
                                        auctions: itemElem.auctions[0],
                                        totalPrice: this.getPriceForQuantity(itemElem.auctions[0], element.quantity),
                                        quantityMax: itemElem.auctions[0].total_quantity,
                                        itemExists: true
                                    }
                                )
                            }

                        })
                    }
                />
            </div>
        )
    }
};

const mapStatetoProps = state => {

    return {
        product: state.product,
        ingredient: state.ingredient,
        itemLanguage: state.itemLanguage
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
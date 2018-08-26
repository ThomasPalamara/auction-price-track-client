import React from "react";
import { Table } from 'antd';

const columns = [{
    title: 'Prix à l\'unité',
    dataIndex: 'price',
    key: 'price',
    render: (text) => (
        <div>
            <span>{text.toString().slice(0, -4)} <i className="money-icon gold"/> </span>
            <span>{text.toString().slice(-4, -2)} <i className="money-icon silver"/> </span>
            <span>{text.toString().slice(-2)} <i className="money-icon copper"/> </span>
        </div>
    ),
}, {
    title: 'Quantité',
    dataIndex: 'quantity',
    key: 'quantity',
}];


class DisplayPricesTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // const auctions = this.props.auctions[0].prices.sort(function(a,b) {return (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0);} );
        console.log(this.props.auctions[0].prices);
        return (
            <Table
                columns={columns}
                dataSource={
                    this.props.auctions[0].prices.map((element, i) => {
                        return (
                            {
                                key: i,
                                price: element.price,
                                quantity: element.quantity,
                            }
                        );
                    })
                }
            />
        );
    }
}

export default DisplayPricesTable;


// <table>
// {props.auctions[0].prices.map((x) => {
//     return (
//         <tr>
//             <td>
//                 <span>{x.price.toString().slice(0, -4)} PO </span>
//                 <span>{x.price.toString().slice(-4, -2)} PA </span>
//                 <span>{x.price.toString().slice(-2)} PC </span>
//             </td>
//             <td>{x.quantity}</td>
//         </tr>
//     )
// }
// )}
// </table>
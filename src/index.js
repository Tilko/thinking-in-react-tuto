import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { groupBy } from './libs/Functional';

function FilterableProductTable(props) {
    return (
        <div>
            <SearchBar />
            <ProductTable products={props.products} />
        </div>

    );
}
class SearchBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <input type='text' placeholder='Search...' />
                <input
                    type="checkbox"
                    checked={true}//this.state.isGoing}
                //onChange={this.handleInputChange} 
                />
            </div>
        );
    }
}

function ProductTable(props) {
    const rows = [];
    for (let entry of groupBy(props.products, p => p.category).entries()) {
        const [category, products] = entry;
        console.log("category:" + category)
        console.log("products:" + products)
        rows.push(<ProductCategoryRow
            category={category}
            key={category}
        />);
        products.forEach(product => rows.push(<ProductRow
            product={product}
            key={product.name}
        />))
    }
    console.log("rows.len:" + rows.length);
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}
function ProductCategoryRow(props) {
    return (
        <tr>
            <th colSpan="2">{props.category}</th>
        </tr>
    );
}
function ProductRow(props) {
    return (
        <tr>
            <th>{props.product.name}</th>
            <th>{props.product.price}</th>
        </tr>
    );
}

ReactDOM.render(
    <FilterableProductTable products={[
        { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
        { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
        { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
        { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
        { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
        { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
    ]} />,
    document.getElementById('root')
);
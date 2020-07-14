import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { groupBy } from './libs/Functional';

class FilterableProductTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inStockOnly: true,
            searchedText: 'ball'
        }
    }
    render() {
        return (
            <div>
                <SearchBar searchedText={this.state.searchedText}
                    inStockOnly={this.state.inStockOnly} />
                <ProductTable products={this.props.products}
                    inStockOnly={this.state.inStockOnly}
                    searchedText={this.state.searchedText} />
            </div >
        );
    }
}
class SearchBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <input type='text' value={this.props.searchedText} placeholder='Search...' />
                <p>
                    <input
                        type="checkbox"
                        checked={this.props.inStockOnly}//this.state.isGoing}
                    //onChange={this.handleInputChange} 
                    />
                Only show products in stock
                </p>

            </div>
        );
    }
}

function ProductTable(props) {
    const rows = [];
    const filteredProds = props.products.filter(product => {
        if (props.inStockOnly && !product.stocked)
            return false;
        return product.name.includes(props.searchedText);
    });

    for (let [category, products] of groupBy(filteredProds, p => p.category).entries()) {
        rows.push(<ProductCategoryRow
            category={category}
            key={category}
        />);
        products.forEach(product => rows.push(<ProductRow
            product={product}
            key={product.name}
        />))
    }
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
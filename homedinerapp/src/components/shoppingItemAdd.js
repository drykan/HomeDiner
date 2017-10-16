import React, { Component } from 'react';

class ShoppingItemAdd extends Component {
    render() {
        return (
            <div id="recipe-search-wrapper">
                <div id="recipe-search-form">
                    <form>
                        <input
                            name="ItemAdd"
                            placeholder="Add an Item to Grocery List"
                        />
                        <button className="btn btn-secondary">Add</button>

                    </form>
                </div>
            </div>
        );
    }
}


export default ShoppingItemAdd;
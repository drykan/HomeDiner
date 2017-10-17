import React, { Component } from 'react';
import ShoppingItemAdd from './../components/shoppingItemAdd';

class ShoppingList extends Component {

    render() {
        return (
            <div>
                <ShoppingItemAdd />
                <div id="recipe-wrapper">
                    <table className="table shopping-list">
                        <thead>
                            <tr>
                                <th style={{width: 91 + "%"}}>Item</th>
                                <th style={{width: 9 + "%"}}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.shoppingList.map((item, index) => {
                                    return (
                                        <tr key={`item-${index}`}>
                                            <td id={`list${index}`}>{item}</td>
                                            <td>
                                                <div id={`edit${index}`} className="edit-btn"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></div>
                                                <div id={`del${index}`} className="delete-btn">X</div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default ShoppingList;
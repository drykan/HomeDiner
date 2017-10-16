import React, { Component } from 'react';
import API from "./../utils/API";

class RecipeSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipes: [],
            recipeSearch: ""
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        let self = this;
        API.getRecipes(this.state.recipeSearch)
            .then(res => {
                self.setState({ recipes: res.data });
                self.props.recipeReceived(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div id="recipe-search-wrapper">
                <div id="recipe-search-form">
                    <form>
                        <input
                            value={this.state.recipeSearch}
                            onChange={this.handleInputChange}
                            name="recipeSearch"
                            placeholder="Search For a Recipe"
                        />
                        <button onClick={this.handleFormSubmit} type="success" className="btn btn-secondary">Search</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default RecipeSearch;
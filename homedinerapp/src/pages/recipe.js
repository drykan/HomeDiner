import React, { Component } from 'react';
import RecipeSearch from './../components/recipeSearch';

class Recipe extends Component {
    constructor(props) {
        super(props)
        this.onRecipeReceived = this.onRecipeReceived.bind(this);
        this.addAll = this.addAll.bind(this);

        this.state = {
            recipe: []
        };
    }

    onRecipeReceived(recipeData) {
        this.setState({ recipe: recipeData.hits });
    }

    addAll(event) {
        let index = event.target.getAttribute('data-index');
        this.props.onAddIngredient(this.state.recipe[index].recipe.ingredientLines);
        console.log("this.props = " +this.props);
    }

    flipCard() {
        let flip = document.getElementsByClassName('flip-container');
        flip.classList.toggle("flip");
    }

    render() {
        return (
            <div>
                <RecipeSearch
                    recipeReceived={this.onRecipeReceived}
                />
                <div id="recipe-wrapper" className="row">
                    {this.state.recipe.map((item, index) => {
                        return (
                            <div className="card-wrapper" key={`card ${index}`}>
                                <div className="flip-container">
                                    <div className="flipper">
                                        <div className="card" style={{ width: 20 + "rem" }}>

                                            <div className="front">
                                                <img className="card-img-top" src={item.recipe.image || "https://placehold.it/300x300"} alt="Card cap" />
                                                <div className="card-block">
                                                    <h4 className="card-title">{item.recipe.label}</h4>
                                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                    <a href="" className="btn btn-primary" onClick={this.flipCard}>Ingredients</a>
                                                    <a href={item.recipe.url} className="btn btn-primary" target="_blank" >Directions</a>
                                                </div>
                                            </div>

                                            <div className="back">
                                                <ul>
                                                    {item.recipe.ingredientLines.map((item, index) => {
                                                        return (
                                                            <li className="ingred-list" key={index}>
                                                                <div>
                                                                    <input id={`ingred ${index}`} type="checkbox" name="addIngred" />
                                                                    <label htmlFor={`ingred ${index}`}>{` ${item}`}</label>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                                <a href="" className="btn btn-primary" data-index={index} onClick={this.addAll}>Add All Ingredients to Shopping List</a>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}


export default Recipe;
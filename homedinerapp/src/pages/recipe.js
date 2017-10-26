import React, { Component } from 'react';
import RecipeSearch from './../components/recipeSearch';
import API from "./../utils/API";

class Recipe extends Component {
    constructor(props) {
        super(props)
        this.onRecipeReceived = this.onRecipeReceived.bind(this);
        this.addAll = this.addAll.bind(this);
        this.flipCard = this.flipCard.bind(this);
        this.titleTooltip = this.titleTooltip.bind(this);
        this.titleTooltipOut = this.titleTooltipOut.bind(this);

        this.state = {
            recipe: [],
        };
    }

    componentDidMount() {
        let self = this;
        API.getRecipes("trend")
            .then(res => {
                self.setState({ recipe: res.data.hits });
            })
            .catch(err => console.log(err));
    }

    onRecipeReceived(recipeData) {
        this.setState({ recipe: recipeData.hits });
    }

    addAll(event) {
        event.preventDefault();
        let index = event.target.getAttribute('data-index');
        this.props.onAddIngredient(this.state.recipe[index].recipe.ingredientLines);
    }

    flipCard(event) {
        event.preventDefault();
        let flip = document.getElementById(event.target.getAttribute("data-card")).classList;
        console.log(flip);
        console.log(event.target.getAttribute("data-card"));
        flip.toggle("flip");
    }

    titleTooltip(event) {
        let title = document.getElementById(event.target.getAttribute("data-title")).classList;
        console.log(title);
        title.add("display-initial");
    }

    titleTooltipOut(event) {
        let title = document.getElementById(event.target.getAttribute("data-title")).classList;
        console.log(title);
        title.remove("display-initial");
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
                            <div className="card-wrapper" key={`card${index}`}>
                                <div id={`recipe-${index}`} className="flip-container">
                                    <div className="flipper">
                                        <div className="card" >

                                            {/* FRONT OF CARD */}
                                            <div className="front">
                                                <img className="card-img-top" src={item.recipe.image || "https://placehold.it/300x300"} alt="Card cap" />
                                                <div className="card-block">
                                                    <h4 data-title={`title-${index}`} className="card-title" onMouseEnter={this.titleTooltip} onMouseLeave={this.titleTooltipOut}>{item.recipe.label}</h4>
                                                    <div id={`title-${index}`} className="card-title-tooltip">{item.recipe.label}</div>
                                                    <div className="recipe-description">
                                                        <div className="recipe-calories">{Math.round(item.recipe.calories)} Calories</div>


                                                        <a href="" onClick={this.flipCard}>
                                                            <div data-card={`recipe-${index}`} className="btn btn-success recipe-ingredients">{item.recipe.ingredientLines.length} Ingredients</div>
                                                        </a>


                                                    </div>
                                                    <a href={item.recipe.url} className="btn btn-primary directions-btn" target="_blank" >Directions</a>
                                                </div>
                                            </div>

                                            {/* BACK OF CARD */}
                                            <div className="back">
                                                <div className="flip-back" data-card={`recipe-${index}`} onClick={this.flipCard}>Back</div>
                                                <div className="ingred-display">
                                                    <ul>
                                                        {item.recipe.ingredientLines.map((item, index) => {
                                                            return (
                                                                <li className="ingred-list" key={index}>
                                                                    <div className="ingred-check">
                                                                        <input id={`ingred ${index}`} type="checkbox" name="addIngred" />
                                                                    </div>
                                                                    <div className="ingred-item">
                                                                        <label htmlFor={`ingred ${index}`}>{` ${item}`}</label>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="card-footer">
                                                    <a href="" className="btn btn-primary" data-index={index} onClick={this.addAll}>Add All Ingredients to Shopping List</a>
                                                </div>
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
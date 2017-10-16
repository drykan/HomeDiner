import React, { Component } from 'react';
import RecipeSearch from './../components/recipeSearch';


class Pantry extends Component {
    render() {



        return (
            <div>
                <RecipeSearch />
                <div id="recipe-wrapper">
                    This is the Pantry Page
                </div>
            </div>
        );
    }
}


export default Pantry;